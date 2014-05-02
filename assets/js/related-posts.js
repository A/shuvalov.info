---
layout: nil
---

'use strict'


// Constructor
var RelatedPosts = function (keywords) {
  this.keywords = keywords.split(' ');
  this.indexRelatedPosts();
  return this._posts
    .sort(function(a, b){
      return a.relationIndex-b.relationIndex;
    })
    .slice(-5)
    .reverse();
};


RelatedPosts.prototype.indexRelatedPosts = function() {
  return this._posts.map(function (post) {
    for (var i in this.keywords) {
      ~post.keywords.indexOf(this.keywords[i]) && post.relationIndex++;
    }
  }.bind(this));

};


// Generate posts map `"title": "key word"` by jekyll liquid markup
RelatedPosts.prototype._posts = [
  {% for post in site.posts %}
  {
    'url': '{{ post.url }}',
    'title': '{{ post.title | replace:'"','' }}',
    'description': '{{ post.description }}',
    'keywords': '{{ post.keywords | join ' ' | replace:'"','' }}',
    'relationIndex': 0
  },
  {% endfor %}
];