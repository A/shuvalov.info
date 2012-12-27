/* HYPHENS.JS
Hyph
On-line hyphenation for your site.
by Cyril Nikolaev
VERSION 0.99

(c) 2006 Cyril Nikolaev
Updates on http://snusmumrik.org.ru/hyph
Contact me at cyril7@gmail.com
*/
Hyphenator = {
	
skipTags: ['code', 'samp', 'kbd', 'var', 'abbr', 'acronym',
	'sub', 'sup', 'pre', 'button', 'option', 'label'],

init: function() {
	this.isDOM = Boolean(document.getElementById)
	this.isOpera7 = Boolean(window.opera && this.isDOM && document.readyState)
	this.isIE5 = Boolean(this.isDOM && document.all && document.all.item && !window.opera)
	this.isMozilla = Boolean(this.isDOM && document.getBoxObjectFor)
	this.isSafari = Boolean(document.childNodes && !document.all && !navigator.taintEnabled)
	this.canHyphenate = this.isOpera7 || this.isIE5 || this.isMozilla || this.isSafari

	if (!this.canHyphenate)
		return;

	var _onload = function(e) { Hyphenator.onLoad(e) }
	if (window.addEventListener)
		window.addEventListener('load', _onload, false)
	else if (window.attachEvent)
		window.attachEvent('onload', _onload)

	String.prototype.isLetter = function() {
		return (this >= 'a' && this <= 'z') || (this >= '\u0410' && this <= '\u044f') ||
			(this >= 'A' && this <= 'Z') || (this >= '\u00c0' && this <= '\u02a8') ||
			(this >= '0' && this <= '9') || (this >= '\u0386' && this <= '\u04ff');
	}
	String.prototype.isVowel = function() {
		return this.length > 0 && 'AEIOUYaeiouyАОУЮИЫЕЭЯЁаоуюиыеэяёЄІЇЎєіїў'.indexOf(this) !== -1
	}
},

addSlab: function(slabText, before, rparent, pos)
{
	var myInsertBefore = function(node, rparent, before) {
		if (before) rparent.insertBefore(node, before)
		else rparent.appendChild(node)
	}
	
	if (!this.newNode) this.newNode = document.createElement('span')
	var newNode;
	
	if (this.isOpera7 || this.isSafari) {
 		newNode = this.newNode.cloneNode(false)
 		switch(pos) {
 		case 0: newNode.className = 'hpo'; break
		case 2: newNode.className = 'hso'; break
		default: newNode.className = 'hso hpo' }

		newNode.appendChild(document.createTextNode(slabText))
		myInsertBefore(newNode, rparent, before)

		if (pos < 2) {
			newNode = this.newNode.cloneNode(false)
			newNode.className = 'hbo'
			myInsertBefore(newNode, rparent, before)
		}
	} else if (this.isIE5) {
 		newNode = this.newNode.cloneNode(false)
		switch(pos) {
 		case 0: newNode.className = 'hpi'; break
		case 2: newNode.className = 'hsi'; break
		default: newNode.className = 'hpi hsi' }

		newNode.appendChild(document.createTextNode(slabText))
		myInsertBefore(newNode, rparent, before)

		if (pos < 2) {
			newNode = this.newNode.cloneNode(false)
			newNode.className = 'hii'
			myInsertBefore(newNode, rparent, before)

			newNode = document.createElement('wbr')
			myInsertBefore(newNode, rparent, before)
		}
	} else if (this.isMozilla) {
		if (pos == 0)
			myInsertBefore(document.createTextNode(slabText), rparent, before)
		else {
			newNode = this.newNode.cloneNode(false)
			newNode.className = 'hhf'
			rparent.insertBefore(newNode, before)

			newNode = this.newNode.cloneNode(false)
			newNode.className = 'hsf'
			newNode.appendChild(document.createTextNode(slabText))
			myInsertBefore(newNode, rparent, before)
		}
	}
},

divideTextInt: function(text)
{
	var m_frags = [], m_modes = [], len = text.length
	for(var i = 0; i < len; i++) {
		var c = text.charAt(i)
		if (!c.isVowel()) {
			frag = ''
			var mode = (i==0) ? 2 : 1
			while(i < len && !c.isVowel()) {
				frag += c
				if (!c.isLetter()) mode = 2
				c = text.charAt(++i)
			}
			if (i == text.length) mode = 2
			if (frag.length == 1 && text.charAt(i-2).isVowel() && (i == 2 || !text.charAt(i-3).isLetter())) // don't break one letter
				mode = 2
			m_frags.push(frag)
			m_modes.push(mode)
			i--
		} else {
			mode = 0
			if (text.charAt(i-1).isVowel() && (i == 2 || !text.charAt(i-2).isLetter())) mode = 2 // don't break one letter
			if (text.charAt(i-1).isVowel() && (i == text.length - 1 || !text.charAt(i+1).isLetter())) mode = 2
			m_frags.push(c)
			m_modes.push(mode)
		}
	}
	return { frags: m_frags, modes: m_modes }
},

divideText: function(text)
{
	var parts = []
	var r = this.divideTextInt(text)
	
	var frags = r.frags, modes = r.modes
	var part = ''
	for(var i = 0; i < frags.length; i++) {
		if (modes[i] == 1) {
			var frag = frags[i];
			var d = Math.floor(frag.length / 2)
			part += frag.substr(0, d)
			parts.push(part)
			part = frag.substr(d)
		} else if (modes[i - 1] == 0 && modes[i] == 0) {
			parts.push(part)
			part = frags[i]
		} else {
			part += frags[i]
		}
	}
	parts.push(part)
	return parts
},

hyphenateInt: function(node)
{
	var p = this.divideText(node.data)
	
	if (p.length == 1) return
	for(var i in p) {
		var part = p[i]
		this.addSlab(part, node, node.parentNode, (i == 0)?0:(i == p.length - 1)?2:1)
	}
	node.parentNode.removeChild(node)
},

isAllowedNode: function(node){
	for(var tag in this.skipTags) {
		if (this.skipTags[tag].toLowerCase() == node.tagName.toLowerCase())
			return false;
	}
	return true;
},

hyphenateRecursive: function(e)
{
	if (!this.isAllowedNode(e)) return;
	
	var sib = e.childNodes
	for(var i = 0, nodes = new Array; i < sib.length; i++) nodes[i] = sib.item(i)

	for(var node in nodes) {
		node = nodes[node]
		if (node.nodeType == 1)
				this.hyphenateRecursive(node)
		if (node.nodeType == 3)
			this.hyphenateInt(node)
	}
},

startHyphenate: function(e)
{
	this.hyphenateRecursive(e)
},

hyphenateNode: function(rnode)
{
	if (!this.canHyphenate) return
	if (this.loadState == 0) this.hyphenateQueue.push( { node: rnode } )
	else this.startHyphenate(rnode)
},

hyphenateNodeList: function(rlist)
{
	if (!this.canHyphenate) return
	if (this.loadState == 0)
		for(var i in rlist) this.hyphenateQueue.push( { node: rlist[i] } )
	else
		for(var i in rlist) this.startHyphenate(rlist[i])
},

hyphenate: function(selector)
{
	if (!document.getElementsBySelector) return
	if (!this.canHyphenate) return
	if (this.loadState == 0) this.hyphenateQueue.push( { sel: selector } )
	else this.startHyphenate(document.getElementsBySelector(selector))
},

onLoad: function(e)
{
	this.loadState = 1
	for(var el in this.hyphenateQueue) {
		el = this.hyphenateQueue[el]
		if (el.node) this.hyphenateNode(el.node)
		else if (el.sel) this.hyphenateNodeList(document.getElementsBySelector(el.sel))
	}
		
	// Opera hack - update page to make all hyphens visible
	// Opera 9 (not Opera 8): if (window.setDocument) window.setDocument(document);
	var tmp = document.bgColor; document.bgColor = '#ffe'; document.bgColor = tmp;
},

hyphenateQueue: [],

loadState: 0

}

Hyphenator.init();


/* getElementsBySelector by Cyril Nikolaev
Version 0.91
Supports type, universal, class, id selectors and selector grouping
Sample: #content p *.class strong.verystrong, span.sample
Updates on http://snusmumrik.org.ru, contact cyril7@gmail.com
Bug: '* tagName' generates duplicates
*/

document.getElementsBySelector = function(selector)
{
	if (!document.getElementsByTagName || !document.getElementById) return []
	
	var NodeListToArray = function(list) { var a = []
		for(var i = 0; i < list.length; i++) a.push(list.item(i))
		return a }

	var match = /^([\w\-\*]*)(?:(\W)([\w\-]+))?$/
	var sels = selector.split(','), nodes = []
	for(var sel in sels) {
		var steps = sels[sel].split(' '), ctx = [document]
		for (var step in steps) {
			var p = match.exec(steps[step])
			if ((p[1] == '' && p[3] == null) || p === null) continue
			
			var tag = (p[1]==='')?'*':p[1]
			var newctx = []
			for(var i in ctx) newctx = newctx.concat(NodeListToArray(ctx[i].getElementsByTagName(tag)))
			
			ctx = new Array()
			switch(p[2]) {
			case '#':
				var elid = document.getElementById(p[3])
				if (elid != null) ctx = [elid]
				else ctx = []
				break
			case '.':
				for(var node in newctx)
					if (newctx[node].className == p[3]) ctx.push(newctx[node])
				break
			default: ctx = newctx
			}
		}
		nodes = nodes.concat(ctx)
	}
	return nodes
}