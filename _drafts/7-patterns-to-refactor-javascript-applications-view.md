---
apple-mobile-web-app-capable: yes
color:Accent color: '\#ffca66'
color:Sidebar color: '\#121212'
color:Text color: '\#777777'
description: '7 Patterns To Refactor JavaScript Applications: View Objects'
if:Light Quotes: 0
if:Show Archive: 1
if:Show RSS: 1
if:Show Sidebar Arrow: 1
select:Avatar: circled
title: |
    Crush & Lovely — 7 Patterns To Refactor JavaScript Applications: View
    Objects
tumblr-theme: 37734
twitter:app:id:googleplay: 'com.tumblr'
twitter:app:id:iphone: 305343404
twitter:app:name:googleplay: Tumblr
twitter:app:name:ipad: Tumblr
twitter:app:name:iphone: Tumblr
twitter:app:url:googleplay: 'tumblr://x-callback-url/blog?blogName=magnum-theme&referrer=twitter-cards'
twitter:app:url:ipad: 'tumblr://x-callback-url/blog?blogName=magnum-theme&referrer=twitter-cards'
twitter:app:url:iphone: 'tumblr://x-callback-url/blog?blogName=magnum-theme&referrer=twitter-cards'
twitter:card: summary
twitter:creator: benjaminnathan
twitter:description: |
    7 Patterns To Refactor JavaScript Applications: View Objects By Michael
    Phillips, Engineer On October 17, 2012, Bryan Helmkamp, founder of Code
    Climate, wrote a blog post outlining 7 patterns to...
twitter:site: tumblr
twitter:title: 'Crush & Lovely'
viewport: 'width=device-width, initial-scale=1, user-scalable=no'
...

[![](http://static.tumblr.com/yrs3ksq/V1vmww5qi/logo.png)](http://crushlovely.com)

-   [Our Story](http://crushlovely.com/our-story "our story")
-   [Journal](http://journal.crushlovely.com "Journal")
-   [Project
    Stories](http://crushlovely.com/project-stories "Project Stories")
-   [Contact Us](http://crushlovely.com//contact-us "contact us")
-   [Careers](http://jobs.crushlovely.com "careers")

[](https://twitter.com/crushlovely)

Follow us on twitter

Search

[](http://ambertheme.tumblr.com)

[7 Patterns To Refactor JavaScript Applications: View Objects](http://journal.crushlovely.com/post/90568548968/7-patterns-to-refactor-javascript-applications-view)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

By **[Michael Phillips](https://twitter.com/createbang)**, Engineer

On October 17, 2012, Bryan Helmkamp, founder of [Code
Climate](https://codeclimate.com/), wrote a [blog
post](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/)
outlining 7 patterns to refactor fat ActiveRecord models in Ruby on
Rails. Here at Crush & Lovely, this post is a core reference for all
Rails developers on how to separate concerns, write modular, concise and
expressive code, and make testing exceedingly simple.

This series of posts demonstrates these concepts in the JavaScript
environment; they are no less applicable to data models in JavaScript,
and are equally as valuable. Each week, one of the seven patterns will
be explained. This week, we’ll be talking about View Objects.

### Patterns

1.  [Value
    Objects](http://journal.crushlovely.com/post/88286828068/7-patterns-to-refactor-javascript-applications-value)
2.  [Service
    Objects](http://journal.crushlovely.com/post/88286835473/7-patterns-to-refactor-javascript-service-objects)
3.  [Form
    Objects](http://journal.crushlovely.com/post/89270334848/7-patterns-to-refactor-javascript-applications-form)
4.  [Query
    Objects](http://journal.crushlovely.com/post/89978453593/7-patterns-to-refactor-javascript-applications-query)
5.  **View Objects**
6.  [Policy
    Objects](http://journal.crushlovely.com/post/91371788978/7-patterns-to-refactor-javascript-applications-policy)
7.  [Decorators](http://journal.crushlovely.com/post/92649246643/7-patterns-to-refactor-javascript-applications-decorators)

### View Objects

When a model has associated logic or attributes that are used
exclusively for surfacing a representation of the model — as HTML in a
standard website or as JSON from an API endpoint — a best practice is to
avoid storing those calculations or values directly on the model.
Storing view-specific attributes on the model can create confusion about
what is “truth” (stored in the database) and what is purely
representational. View Objects act as a kind of adapter between the
truth and the representation of the truth.

For example, the truth of an imagined inventory item is that the
`price`attribute stored in the database is `599` cents, but the
representation for the product page may be a mutation of the truth, such
as `$5.99`. It would be inappropriate to store the representational data
as a secondary price attribute on the model. It would be even worse to
inject the formatting logic into the template.

What View Objects do is “dress up” the data, by way of transforming,
adding or removing data properties, returning a new object for use in
the presentation layer. This approach creates a nice home for our
presentation-specific logic and attributes, keeping it removed from the
model truth.

I also want to mention that there is some conflict about what to call
this pattern. Helmkamp addresses this in his post, and it’s a common
topic of discussion here at Crush & Lovely. The term “View Objects” is
*not* the preferred term amongst our engineers, primarily because this
name obfuscates the versatility of the pattern, since “view” is the most
common term for HTML. This pattern can be used for an API response, for
passing data into a third-party service, or for any other reason.
“Presenter” is the favored term at Crush, primarily because it aptly
describes the function of the pattern: the data is presented for use in
a response, regardless of what form the response comes in.

### Example

For example, at the end of the year, a teacher prints out report cards
for each student. Among other information, the report card shows the
student’s average grade, whether they are passing or not, and the phone
number of the student.

The script to generate the report cards finds each student and their
associated assignments for the year, producing a “truthful”
representation of the object like this:

The markup for the report card PDF, in keeping with the dogma of
“stupid” views, is ignorant of the formatting of the data:

Presenting the student object for use in the view becomes very easy when
we throw it into a View Object and in turn throw that View Object into
the HTML. Here’s an example of what the View Object could contain to
dress our student model up for use in the HTML:

And then all we need to do is present the student data and pass it into
the view for rendering:

It should be noted here that there are great opportunities here to
extract commonly used View Object methods, such as formatting a phone
number. You could pull these into a module of helpers that can be used
in the View Object, or you could look at composition opportunities,
breaking down your View Objects into more modular tools. The
opportunities for organization when using View Objects are open and
flexible, and each engineer should look at her or his own style and
application for best practices.

### Testing

Unit testing for these mutations is pleasantly straight-forward, since
all you’re doing is passing in one object or array and expecting
another. Thusly, you can just test for the right properties and values
after the data has been presented.

* * * * *

In the next post, we’ll take a look at Policy Objects, which provides a
great tool for encapsulating business logic.

*Special thanks to [Justin Reidy](https://twitter.com/jmreidy) and
[Anisha Vasandani](https://twitter.com/hackerella) for editorial and
code review.*

[](https://www.tumblr.com/reblog/90568548968/wbpaLzB5)

[July 2,
2014](http://journal.crushlovely.com/post/90568548968/7-patterns-to-refactor-javascript-applications-view)

Please enable JavaScript to view the [comments powered by
Disqus.](http://disqus.com/?ref_noscript)

![Quantcast](//pixel.quantserve.com/pixel/'p-19UtqE8ngoZbM'.gif)

![](http://www.tumblr.com/impixu?T=1407007236&J=eyJ0eXBlIjoidXJsIiwidXJsIjoiaHR0cDpcL1wvam91cm5hbC5jcnVzaGxvdmVseS5jb21cL3Bvc3RcLzkwNTY4NTQ4OTY4XC83LXBhdHRlcm5zLXRvLXJlZmFjdG9yLWphdmFzY3JpcHQtYXBwbGljYXRpb25zLXZpZXciLCJyZXF0eXBlIjowLCJyb3V0ZSI6IlwvcG9zdFwvOmlkXC86c3VtbWFyeSIsIm5vc2NyaXB0IjoxfQ==&U=KLHPHFDBHE&K=eaea5941db4d1e1f16d9b94e0a04433fbf842e98823b063a54edddae448e1dc9&R=http%3A%2F%2Fjournal.crushlovely.com%2Fpost%2F89978453593%2F7-patterns-to-refactor-javascript-applications-query)

![](http://www.tumblr.com/impixu?T=1407007236&J=eyJ0eXBlIjoicG9zdCIsInVybCI6Imh0dHA6XC9cL2pvdXJuYWwuY3J1c2hsb3ZlbHkuY29tXC9wb3N0XC85MDU2ODU0ODk2OFwvNy1wYXR0ZXJucy10by1yZWZhY3Rvci1qYXZhc2NyaXB0LWFwcGxpY2F0aW9ucy12aWV3IiwicmVxdHlwZSI6MCwicm91dGUiOiJcL3Bvc3RcLzppZFwvOnN1bW1hcnkiLCJwb3N0cyI6W3sicG9zdGlkIjoiOTA1Njg1NDg5NjgiLCJibG9naWQiOiI2ODU2MzgiLCJzb3VyY2UiOjMzfV0sIm5vc2NyaXB0IjoxfQ==&U=ELPBFMKIBL&K=5a1065c5c1d122599168304c0a338e2bd9cd03cb3de337f498e7e0912714326f&R=http%3A%2F%2Fjournal.crushlovely.com%2Fpost%2F89978453593%2F7-patterns-to-refactor-javascript-applications-query)
