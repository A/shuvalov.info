---
apple-mobile-web-app-capable: yes
color:Accent color: '\#ffca66'
color:Sidebar color: '\#121212'
color:Text color: '\#777777'
description: '7 Patterns to Refactor JavaScript Applications: Query Objects'
if:Light Quotes: 0
if:Show Archive: 1
if:Show RSS: 1
if:Show Sidebar Arrow: 1
select:Avatar: circled
title: |
    Crush & Lovely — 7 Patterns to Refactor JavaScript Applications: Query
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
    7 Patterns to Refactor JavaScript Applications: Query Objects By Michael
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

[7 Patterns to Refactor JavaScript Applications: Query Objects](http://journal.crushlovely.com/post/89978453593/7-patterns-to-refactor-javascript-applications-query)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
be explained. This week, we’ll be talking about Query Objects.

### Patterns

1.  [Value
    Objects](http://journal.crushlovely.com/post/88286828068/7-patterns-to-refactor-javascript-applications-value)
2.  [Service
    Objects](http://journal.crushlovely.com/post/88286835473/7-patterns-to-refactor-javascript-service-objects)
3.  [Form
    Objects](http://journal.crushlovely.com/post/89270334848/7-patterns-to-refactor-javascript-applications-form)
4.  **Query Objects**
5.  [View
    Objects](http://journal.crushlovely.com/post/90568548968/7-patterns-to-refactor-javascript-applications-view)
6.  [Policy
    Objects](http://journal.crushlovely.com/post/91371788978/7-patterns-to-refactor-javascript-applications-policy)
7.  [Decorators](http://journal.crushlovely.com/post/92649246643/7-patterns-to-refactor-javascript-applications-decorators)

### Query Objects

Database queries, even simple ones, can be both repetitive and hard to
read and comprehend. With more complex queries, especially ones that
embed data from multiple collections or tables, this process can get
messy to write and even messier to maintain.

Query objects provide a nice tool for extracting query logic and
associated operations into a contained module, pulling the logic out
into a more maintainable and readable structure, while also providing a
very readable API where the query object is used.

### Example

Let’s imagine an API endpoint that returns a JSON representation of all
students that are currently passing. Without using Query Objects, we
might have a function in an API controller method or a Service Object
that could look like this (note the user of
`DetermineStudentPassingStatus`, the example from the [Service
Objects](http://journal.crushlovely.com/post/88286835473/7-patterns-to-refactor-javascript-service-objects)
post):

Not only are we entering into some deep layers of callback hell, we’ve
also written some code that is very difficult to read. We can create a
much more expressive module if we use a Query Object.

Encapsulating all associated operations for this query feels more
organized and gives you an expressive API to integrate into your
application. For example, in an Express controller method:

The data being returned to this API call will be raw, unformatted data
directly from the data store, which is almost never what you want. For
this example, the Query Object can be paired well with a View Object
(covered next in this series), which provides a place for data
transformations to prepare the data for presentation.

Another thing worth mentioning is that this pattern opens up some very
interesting opportunities for composition. For example, there may be
many places where you want to find all assignments for a given set of
students, so we could extract that process into a separate Query Object
and use it in the `#fetchAssignmentsForCurrentStudents` method.

### Testing

Constructing Query Objects outside of the context in which they are used
makes testing supremely simple. If you’re using a testing database, it’s
all a matter of populating the necessary data to provide meaningful
query results, running the Query Object, and then making sure the
results are accurate.

* * * * *

In the next post, we’ll take a look at View Objects, which are great
tools for isolating view-specific model transformations.

*Special thanks to [Justin Reidy](https://twitter.com/jmreidy) and
[Anisha Vasandani](https://twitter.com/hackerella) for editorial and
code review.*

[](https://www.tumblr.com/reblog/89978453593/DQsWhZri)

[June 26,
2014](http://journal.crushlovely.com/post/89978453593/7-patterns-to-refactor-javascript-applications-query)

Please enable JavaScript to view the [comments powered by
Disqus.](http://disqus.com/?ref_noscript)

![Quantcast](//pixel.quantserve.com/pixel/'p-19UtqE8ngoZbM'.gif)

![](http://www.tumblr.com/impixu?T=1407007193&J=eyJ0eXBlIjoidXJsIiwidXJsIjoiaHR0cDpcL1wvam91cm5hbC5jcnVzaGxvdmVseS5jb21cL3Bvc3RcLzg5OTc4NDUzNTkzXC83LXBhdHRlcm5zLXRvLXJlZmFjdG9yLWphdmFzY3JpcHQtYXBwbGljYXRpb25zLXF1ZXJ5IiwicmVxdHlwZSI6MCwicm91dGUiOiJcL3Bvc3RcLzppZFwvOnN1bW1hcnkiLCJub3NjcmlwdCI6MX0=&U=AJCDIONLKA&K=a038b7ddec81507bcdd250b3ebe9cfeaf298bc72f98310ae1889d55f5bd79c1c&R=http%3A%2F%2Fjournal.crushlovely.com%2Fpost%2F89270334848%2F7-patterns-to-refactor-javascript-applications-form)

![](http://www.tumblr.com/impixu?T=1407007193&J=eyJ0eXBlIjoicG9zdCIsInVybCI6Imh0dHA6XC9cL2pvdXJuYWwuY3J1c2hsb3ZlbHkuY29tXC9wb3N0XC84OTk3ODQ1MzU5M1wvNy1wYXR0ZXJucy10by1yZWZhY3Rvci1qYXZhc2NyaXB0LWFwcGxpY2F0aW9ucy1xdWVyeSIsInJlcXR5cGUiOjAsInJvdXRlIjoiXC9wb3N0XC86aWRcLzpzdW1tYXJ5IiwicG9zdHMiOlt7InBvc3RpZCI6Ijg5OTc4NDUzNTkzIiwiYmxvZ2lkIjoiNjg1NjM4Iiwic291cmNlIjozM31dLCJub3NjcmlwdCI6MX0=&U=KHKDDGJCKA&K=321d2cacebe728f50251de82ab7cc905d152d7ad73f42fcf622d756ff491c3d7&R=http%3A%2F%2Fjournal.crushlovely.com%2Fpost%2F89270334848%2F7-patterns-to-refactor-javascript-applications-form)
