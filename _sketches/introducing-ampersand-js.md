---

description: '&yet blog'
title: 'Introducing Ampersand.js'

---

[](http://andyet.com)

&yet
====

Menu

-   [Consulting](http://andyet.com/consulting)
-   [Training](http://andyet.com/training)
-   [About](http://andyet.com/about)
-   [Labs](http://labs.andyet.com)
-   [Community](http://community.andyet.com)
-   [Blog](http://blog.andyet.com)

Blog {.blogTitle}
====

Introducing Ampersand.js {.postTitle}
------------------------

Jun 25, 2014● posted by Henrik Joreteg

Introducing [Ampersand.js](http://ampersandjs.com/) a highly modular,
loosely coupled, non-frameworky framework for building advanced
JavaScript apps.

Why!?! {#why-}
------

We \<3 [Backbone.js](http://backbonejs.org/) at
[&yet](http://andyet.com). It’s brilliantly simple code and it solves
many common problems in developing clientside applications.

But we missed the focused simplicity of tiny modules in node-land. We
wanted something similar in style and philosophy, but that fully
embraced tiny modules, npm, and browserify.

So we made [Ampersand.js](http://ampersandjs.com/), a well-defined
approach to combining (get it?) a series of intentionally tiny, and
loosely coupled modules for building JS apps.

### Post-Backbone

Backbone has been praised for its flexibility and simplicity. The fact
that Backbone’s author [Jeremy Ashkenas](http://twitter.com/jashkenas)
and his fellow maintainers haven’t tried to solve *every* problem has
kept it usable for a broad range of application types. Its effectiveness
is evidenced by [its incredible
popularity](http://backbonejs.org/#examples).

[I](https://twitter.com/henrikjoreteg) built my first Backbone app when
it was still version 0.3.1, and our whole team has been an avid
users/supporters of the project for quite some time. I even got a chance
to speak at the first BackboneConf.

[Philip Roberts](https://twitter.com/philip_roberts), who has built a
big portion of Ampersand.js, got a lot of experience building an
incredibly complex Backbone app at his previous company
[Float](http://floatapp.com/). He certainly pushed Backbone to its
limits in building complex spreadsheet-esque accounting tools for the
web.

Not long after discovering Backbone at &yet, we got really into node.js,
which brought with it a module approach and what became an awesome way
of managing dependencies that we’ve have fallen deeply in like with:
[npm](https://npmjs.org).

Nothing has done more for our team’s ability to write clean,
maintainable clientside applications than having a really awesome
dependency management system and
[substack’s](http://twitter.com/substack)
[browserify](http://browserify.org/) that allows us to quickly
declare/install external dependencies and know that things will Just
Work™.

npm has also been the catalyst that enables what has been referred to as
the “tiny modules movement”, the basic philosophy of which is that no
matter how small or insignificant the problem, you shouldn’t have to
solve it more than once.

By giving a module narrow scope and functionality you can actually
maintain it without going insane. Also, knowing about and fixing gotchas
in a single location means that all modules depending on it also
benefit.

After getting addicted to this way of working, many developers,
ourselves included, have developed an allergic reaction to libraries and
plugins that *don’t* work that way. Unfortunately, despite its
lightweight, flexible approach, Backbone itself doesn’t follow that
pattern.

“What? I thought you said Backbone was flexible and modular?”

Yes, but only to a point.

“But, Backbone *is* on npm!”

Yes, but stay with me…

One of the problems we’ve had at [&yet](http://andyet.com) especially
when working on large Backbone applications is a sane way to document
the type of properties a model is supposed to contain.

Backbone models, by default, don’t enforce any structure. You don’t have
to declare anywhere what properties you’re going to store. As a result,
people inevitably start saving miscellaneous properties on models from
within a view somewhere, and there’s no good way for a new dev starting
in on the project to be able to read the models and see exactly what
state is being tracked.

To solve this problem and to enforce additional structure, I wrote a
replacement model called “HumanModel” that is consistent with the
philosophy explored in depth in the book [Human
JavaScript](http://humanjavascript.com). This model, which has now
morphed into
[ampersand-model](https://github.com/ampersandjs/ampersand-model),
forces you to declare the properties you’re going to store, and also
allows you to declare derived properties, etc.

Originally we used our replacement models within Backbone Collections,
but we started running into problems. Backbone generally assumes that
you’re storing Backbone.Model models in collections. So when adding an
instantiated model to a collection, Backbone would fail to realize that
it’s already a model. [My patch to
Backbone](https://github.com/jashkenas/backbone/pull/3052) was merged
and fixed this, but there have been other areas where we’ve wanted more
flexibility.

For example, at times we wanted RESTful collections where data is coming
from an API, but other times, we just wanted something *like* a Backbone
collection/model system for managing state in another module, that
perhaps had nothing to do with getting data from a REST API. In those
cases we didn’t want to make all of Backbone a dependency of our module,
just to get evented models.

Over time while building *a ton* of apps with it, for clients and for
ourselves, we’ve kept running into these same types of problems that we
attributed to the coupling/bundling of Backbone.

So we started ripping things apart into their own independently
published, managed, and versioned modules.

Thus, [Ampersand.js](http://ampersandjs.com/) was born.

Ampersand.js splits things apart as much as possible. For example,
[ampersand-collection](https://github.com/ampersandjs/ampersand-collection)
makes no assumptions about how you’re going to put data into it, what
types of objects you’re going to store, or what indices you’re going to
want to use to retrieve them. It follows the tiny module pattern.

But, what if you want that stuff?

Well, that’s easy, we just have another tiny module that layers in that
functionality.

There’s a RESTful
[ampersand-rest-collection](https://github.com/ampersandjs/ampersand-rest-collection)
we just pre-bundle and publish it as a module for convenience, [the code
that combines
them](https://github.com/AmpersandJS/ampersand-rest-collection/blob/master/ampersand-rest-collection.js)
is hilariously simple.

You see the exact same pattern in
[ampersand-state](https://github.com/ampersandjs/ampersand-state) and
[ampersand-model](https://github.com/ampersandjs/ampersand-model).
“State” is the base object that “model” is built on. But model goes the
additional step of including the RESTful methods.

### So what exactly is Ampersand.js? What makes it unique? {#so-what-exactly-is-ampersand-js-what-makes-it-unique-}

In starting to toy with the concept of building out these tools, we
wrote a few guiding principles, some of which we’ll no doubt get some
flack for. Here they are:

#### 1. Everything is a CommonJS module {#1-everything-is-a-commonjs-module}

No AMD, UMD, or bundling of any kind is included by default. The
clarity, simplicity, and flexibility of CommonJS just won. Clear
dependencies, no unnecessary wrapping/indenting, no extra cruft. Just a
clearly declared set of dependencies in package.json.

Any sort of bundling for any other module system is easy enough to do
with any number of tools like grunt or gulp.

#### 2. Everything is installed via npm {#2-everything-is-installed-via-npm}

This isn’t a diss toward the other package management approaches, it’s
just a choice to maximize simplicity. Especially given point \#1.

#### 3. Modern browsers by default {#3-modern-browsers-by-default}

We’re unapologetically supporting only IE9+. There are many features of
ES5 that enable dramatic simplifications of code that simply were not
present in IE before IE9. For reference, check out [kangax’s ES5
compatibility table](http://kangax.github.io/es5-compat-table/). Not
having to shim each and every feature and completely avoiding
non-shimmable ones saves you so many headaches that we decided to just
draw that line. Bring the haters :)

But again, remember this isn’t an all-or-nothing “framework”. In fact,
very arguably it’s not a framework at all. There are pieces here that
don’t require IE9 and others that could be converted to solve those
problems if they matter to you. It’s just a line we chose to draw in the
sand so we could focus our efforts on building for the web’s present and
future instead of its past.

#### 4. Strict semver all the things {#4-strict-semver-all-the-things}

If you’re unfamiliar with semver, [the semver
homepage](http://semver.org/) summarizes it in about three sentences. In
short, it’s a strict adherence to a versioning scheme for modules that,
if followed, allows you to trust minor and patch version updates to *not
break your code*. So, for a dependency you can specify a version like
this: “\^1.1.0” and know that your code will not break if the underlying
dependency is upgraded from 1.1.0 to 1.2.8 because the versioning scheme
prohibits breaking changes without bumping the major version number.

This flexibility is very important in clientside code because we don’t
want to send 5 different versions of the same dependency to the browser.
Loosely declaring dependencies of the building blocks and strictly
declaring them in your app’s main package.json can help you avoid a lot
of these problems. Combining the way npm manages dependencies with this
approach, we can get minimal duplication of shared dependencies.

#### 5. Tiny module all the things! {#5-tiny-module-all-the-things-}

The smaller the feature set of the low-level modules, the easier it is
to avoid breaking changes. Higher-level modules should still exist, but,
should primarily be pulling together small modules in a way that makes
them more usable. For example:
[ampersand-rest-collection](https://github.com/ampersandjs/ampersand-rest-collection),
[component’s “events” module](https://github.com/component/events), or
[component’s “classes” module](https://github.com/component/classes).

#### 6. Expose the simplest API possible. {#6-expose-the-simplest-api-possible-}

Simplicity is a core value. If you don’t actively fight for simplicity
in software, complexity will win, and it will suck. This means things
like pruning unneeded features and giving everything descriptive names
even if they’re longer. That’s what minification is for. We are not
compilers, so we should optimize for readability and use tools for
optimizations.

While this is going to be a bit controversial, for us the focus on
simplicity also means avoiding using promises. There are enough things
that are new and intimidating to those building clientside apps. Adding
promises makes for an unnecessarily tall cognitive leap.

Not that promises are bad, but the truth is there isn’t as much need for
complex flow-control for most clientside things.

And, if you want to use promises it’d be easy enough to write a version
of [ampersand-sync](https://github.com/AmpersandJS/ampersand-sync) or
[ampersand-router](http://ampersandjs.com/docs/#ampersand-router) that
used [bluebird](https://www.npmjs.org/package/bluebird) or another
promise library and slip that into your app.

That’s the whole point of the modularity concept and still: you only
include what you ultimately are using!

#### 7. Optimize for minimal DOM manipulation and performance. {#7-optimize-for-minimal-dom-manipulation-and-performance-}

It should be easy to create rich user experiences.

There’s a lot of buzz and talk around rendering performance for JS apps.
Mostly the answer to these types of performance issues is: “Don’t touch
the DOM any more than you have to.”

That’s one of the core premises of libraries like Facebook’s React: only
performing minimal changes and batching those changes into RAF loops.

\*\*note: You could very easily use React with Ampersand.js, btw.

In canonical Backbone apps you often re-render the contents of a view if
the related model or models change. But, if you’re trying to do things
like smooth dragging and dropping, you don’t want to re-render contents
of a view each time properties change. Or even if you’re using CSS3
transitions, re-rendering a section of the DOM and adding a class won’t
ever trigger the CSS3 transition, because it wasn’t actually
transitioned, it was just replaced with another piece of DOM that had
that class. So, pretty soon in those scenarios you find yourself writing
a bunch of “glue code” to bind things to the DOM and only perform
minimal edits.

The point is, there are valid uses of both approaches. So the goal with
[ampersand-view](http://ampersandjs.com/docs/#ampersand-view) is a
simple way to declare your bindings in your view code. Check out the
[declarative bindings
section](http://ampersandjs.com/docs/#ampersand-view-bindings) of the
docs.

You can also just mix and match. In certain cases it may be easier to
re-render everything, but declaring very specific binding behavior is
also simple without tying you to a template system. It gives you
ultimate control. Modularity FTW!

#### 8. Mobile is in the DNA {#8-mobile-is-in-the-dna}

Think small and light. Optimize and build tools for touch interfaces.
Help build the web as the go-to platform for mobile. (You can expect
more tools to be released here in the future toward this end.)

#### 9. Unapologetically designed for rich “app” experiences. {#9-unapologetically-designed-for-rich-app-experiences-}

These ain’t no websites, pal. If you’re building content sites or sites
you want thoroughly crawled this is not the tool for you.

This is for clientside JavaScript applications where the browser is
treated as a runtime, not as a document viewer. For more on that, you
can read about how we believe [the web has outgrown the
browser](https://blog.andyet.com/2014/01/17/web-has-outgrown-the-browser).

#### 10. Embrace offline-first mentality and ServiceWorker all the things as soon as we can. {#10-embrace-offline-first-mentality-and-serviceworker-all-the-things-as-soon-as-we-can-}

Yup. These are apps, they should compete with native apps. The thing
that’s missing for web to *truly* be a viable alternative to native apps
is good tools for building offline web apps. Again, for more on that
[read the post mentioned
above](https://blog.andyet.com/2014/01/17/web-has-outgrown-the-browser).

But the point is, in order for an app to work offline it needs to be a
true self-contained JavaScript app so that it can run entirely in the
client. Since that’s how Ampersand.js is aimed to work, it would be a
nice compliment to an offline-first backend like
[hood.ie](http://hood.ie/).

#### 11. Everything is MIT licensed {#11-everything-is-mit-licensed}

Software licensing can suck. Especially when trying to manage licenses
of dependencies for a large enterprise project. Picking MIT for all of
this stuff simplifies things as much as we can.

#### 12. Love the developer {#12-love-the-developer}

Don’t ignore developer workflow! We’ve got a few nice things you can see
in the [app the cli
builds](http://ampersandjs.com/learn/quick-start-guide) that let you
simply flip a “developmentMode” boolean to put your app into a
live-reloaded, unminified mode, or conversely into a production mode
(more below).

### The problems with tiny modules

It’s not a silver bullet. One of the biggest challenges for the “tiny
module approach” is knowing which tiny modules exist and which ones to
use. This can be quite daunting for someone who’s used to grabbing a few
jQuery plugins and is new to all of this.

Most of the tiny modules are, well… tiny. These are small pieces of
code, not heavily marketed because they’re not necessarily the pride and
joy of the developer. Many of them are rather boring and don’t do very
much, plus they’re infrequently updated and often they even look
unmaintained because frankly, they represent a solved problem that
doesn’t need to be re-solved!

Seriously, having published a ton of tiny modules, I sometimes forget
about my own modules!

*This can make it incredibly hard to get started and this is where
frameworks really shine.*

So, we’re doing a couple of things to solve that problem for ourselves
and others building Ampersand.js apps.

1.  **A better starting point:** [The ampersand
    cli](https://github.com/ampersandjs/ampersand) is a scaffolding
    tool. It helps you build out a fully working starter app including a
    hapi or express node server to serve your application. It includes
    patterns and approaches that we use at [&yet](http://andyet.com) for
    structuring and serving single page apps which we’ve defined in
    [Human JavaScript](http://humanjavascript.com).

2.  **The tools site:**
    [tools.ampersandjs.com](http://tools.ampersandjs.com). This is a
    site with quick-searchable, hand-picked tools for building
    Ampersand-style apps. A grab bag of “solved problems” for single
    page apps, if you will. In addition it updates its url as you search
    so it’s deep linkable. For example, if you’re looking to do WebRTC
    stuff:
    <http://ampersandjs.github.io/tools.ampersandjs.com/?q=webrtc>

3.  **A book describing the philosophy:** If you’re looking for deeper
    explanations of the philosophy and approaches used in the generated
    app, those are described in a lot more detail in my book [Human
    JavaScript](http://humanjavascript.com), which along with releasing
    the framework, we’ve now made available to [read online for
    free](http://read.humanjavascript.com/).

### Massive props to Jeremy Ashkenas and the rest of the Backbone.js authors {#massive-props-to-jeremy-ashkenas-and-the-rest-of-the-backbone-js-authors}

Many of the individual modules contain copy-and-pasted code from
Backbone.js.

We’re incredibly grateful for [Jeremy](https://twitter.com/jashkenas)’s
work and for the generous MIT licensing that made Ampersand.js possible.

### The future

There’s still a lot to do.

Now that we’ve removed our dependency on Backbone we’re free to edit
other things in “core” that we’ve had alternate ideas about.

With the flexibility that comes with the tiny modules approach, it’s
easier to do a lot more exploration without having to change core items.

A few examples:

-   [domthing](https://github.com/latentflip/domthing) - [Philip
    Roberts](https://twitter.com/philip_roberts) has built an incredibly
    awesome DOM-based templating language and a
    [mixin](https://github.com/AmpersandJS/ampersand-domthing-mixin) to
    work with Ampersand.js.

-   [bind-transforms](http://github.com/henrikjoreteg/bind-transforms) -
    A way to elegantly bind styles like CSS transforms to models. In
    combination with the cached, evented, derived properties of
    [ampersand-state](http://ampersandjs.com/docs#ampersand-state) let’s
    you build amazing things, like smooth drag-n-drop views.

-   [ampersand-forms](http://ampersandjs.com/learn/forms) - A set of
    tools for building rich, interactive forms.

We’d encourage you to get involved.

For simplicity all the “core” stuff is on Github as its own
organization: <https://github.com/ampersandjs>.

Send pull requests, file issues, and tell the core team that we’re crazy
on twitter: [@HenrikJoreteg](http://twitter.com/henrikjoreteg),
[@philip\_roberts](https://twitter.com/philip_roberts),
[@lynnandtonic](https://twitter.com/lynnandtonic),
[@lancestout](https://twitter.com/lancestout),
[@lukekarrys](http://twitter.com/lukekarrys), and
[@wraithgar](http://twitter.com/wraithgar).

For more cool stuff, follow the whole
[@andyet](http://twitter.com/andyet) team on twitter.

### Learning even more

To learn more about building advanced JavaScript applications that are
as maintainable as they are awesome learn directly from the folks behind
ampersand at our bound-to-be-memorable upcoming training adventure — [JS
for Teams: “It’s Aliiive!”](http://jsforteams.com/its-aliiiive/)

[Follow us on Twitter](http://twitter.com/andyet "@andyet")

Subscribe to RSS feed

[](http://humanjavascript.com/ "Human JavaScript")

Practical patterns for simple but powerful JavaScript apps.

[](https://talky.io "Talky.io")

Truly simple video chat and screen sharing for groups. No plugins. No
sign up. Anonymous. Peer-to-peer.

[](http://andbang.com "Andbang")

Shared tasks and chat. Same-page-ify your team.

### Archives

-   [2009](/2009)
-   [2010](/2010)
-   [2011](/2011)
-   [2012](/2012)
-   [2013](/2013)
-   [2014](/2014)

[About](http://andyet.com/about "About &yet")[Community](http://kindly.andyet.com "How &yet supports the community")[Blog](http://blog.andyet.com "&yet Blog")[@andyet](http://twitter.com/andyet "Follow &yet on Twitter")[![&yet](/img/ampersand.svg)](http://andyet.com "&yet")
