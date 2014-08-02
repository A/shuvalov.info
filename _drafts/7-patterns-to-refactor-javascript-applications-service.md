---
apple-mobile-web-app-capable: yes
color:Accent color: '\#ffca66'
color:Sidebar color: '\#121212'
color:Text color: '\#777777'
description: '7 Patterns to Refactor JavaScript Applications: Service Objects'
if:Light Quotes: 0
if:Show Archive: 1
if:Show RSS: 1
if:Show Sidebar Arrow: 1
select:Avatar: circled
title: |
    Crush & Lovely — 7 Patterns to Refactor JavaScript Applications: Service
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
    7 Patterns to Refactor JavaScript Applications: Service Objects By
    Michael Phillips, Engineer On October 17, 2012, Bryan Helmkamp, founder
    of Code Climate, wrote a blog post outlining 7 patterns to...
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

[7 Patterns to Refactor JavaScript Applications: Service Objects](http://journal.crushlovely.com/post/88286835473/7-patterns-to-refactor-javascript-applications-service)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
be explained. This week, we’ll be talking about Service Objects.

### Patterns

1.  [Value
    Objects](http://journal.crushlovely.com/post/88286828068/7-patterns-to-refactor-javascript-value-objects)
2.  **Service Objects**
3.  [Form
    Objects](http://journal.crushlovely.com/post/89270334848/7-patterns-to-refactor-javascript-applications-form)
4.  [Query
    Objects](http://journal.crushlovely.com/post/89978453593/7-patterns-to-refactor-javascript-applications-query)
5.  [View
    Objects](http://journal.crushlovely.com/post/90568548968/7-patterns-to-refactor-javascript-applications-view)
6.  [Policy
    Objects](http://journal.crushlovely.com/post/91371788978/7-patterns-to-refactor-javascript-applications-policy)
7.  [Decorators](http://journal.crushlovely.com/post/92649246643/7-patterns-to-refactor-javascript-applications-decorators)

### Service Objects

Service Objects are objects that perform a discrete operation or action.
When a process becomes complex, hard to test, or touches more than one
type of model, a Service Object can come in handy for cleaning up your
code base.

The goal of a Service Object is to isolate an operation, and should aim
to follow these principles:

-   **Strict with input and output**. Service Objects should be designed
    to handle a very specific process so we can forego the [Robustness
    Principle](http://en.wikipedia.org/wiki/Robustness_principle) in
    favor of creating a tool for a very discrete purpose.
-   **Documented thoroughly**. This module will be extracted out of the
    place it’s being executed, therefore it’s even more imperative that
    the object’s intent and use be well-explained.
-   **Terminates after operation is complete**. This pattern should not
    be conflated with a worker process, which could set an interval,
    listen for web socket messages continuously, or some other operation
    to which there is no immediate end. Service Objects should be
    invoked, perform their immediate operations (whether synchronous or
    asynchronous), and terminate.

### Example

A program written for a teacher to grade their students has an
end-of-year process which determines whether or not the student passed.
The process takes all assignments to be evaluated, finds the average of
the percentage grades, and then assigns the grade to the student.

By extracting this logic into a single module, we provide a centralized
location for any future hooks in this action. For example, if an email
needs to be sent to the parent if the student is not passing, we can
easily add this to the object’s workflow by either adding another method
or, even better, use another Service Object.

### Testing

Even if the action grows in complexity, the test suite can still stay
focused on this single operation, preventing large test files and
cumbersome environment preparation.

Service Objects can be an extremely valuable tool in cleaning up and
refactoring your code. Isolating actions keeps logic clean, orderly,
easy to test, and ultimately leads to a more maintainable code base.

* * * * *

In the next post, we’ll take a look at Form Objects, which can make form
validation and persistence easy and context-specific.

*Special thanks to [Justin Reidy](https://twitter.com/jmreidy) and
[Anisha Vasandani](https://twitter.com/hackerella) for editorial and
code review.*

[](https://www.tumblr.com/reblog/88286835473/BrzovVEX)

[June 9,
2014](http://journal.crushlovely.com/post/88286835473/7-patterns-to-refactor-javascript-applications-service)

1.  [![](http://33.media.tumblr.com/avatar_ccefe5fd11ed_64.png)](http://insaneisnotfree.tumblr.com/ "Oscuridad ")[insaneisnotfree](http://insaneisnotfree.tumblr.com/ "Oscuridad")
    likes this
2.  [![](http://37.media.tumblr.com/avatar_4cf866818ff2_64.png)](http://journal.crushlovely.com/ "Crush & Lovely")[crushlovely](http://journal.crushlovely.com/ "Crush & Lovely")
    posted this

Please enable JavaScript to view the [comments powered by
Disqus.](http://disqus.com/?ref_noscript)

![Quantcast](//pixel.quantserve.com/pixel/'p-19UtqE8ngoZbM'.gif)

![](http://www.tumblr.com/impixu?T=1407006863&J=eyJ0eXBlIjoidXJsIiwidXJsIjoiaHR0cDpcL1wvam91cm5hbC5jcnVzaGxvdmVseS5jb21cL3Bvc3RcLzg4Mjg2ODM1NDczXC83LXBhdHRlcm5zLXRvLXJlZmFjdG9yLWphdmFzY3JpcHQtYXBwbGljYXRpb25zLXNlcnZpY2UiLCJyZXF0eXBlIjowLCJyb3V0ZSI6IlwvcG9zdFwvOmlkXC86c3VtbWFyeSIsIm5vc2NyaXB0IjoxfQ==&U=CEBDDHDAOH&K=d5e1b11d1911639823c2f62668310394b4ab14a2b39d17baf4f245c392cb4700&R=http%3A%2F%2Fjournal.crushlovely.com%2F)

![](http://www.tumblr.com/impixu?T=1407006863&J=eyJ0eXBlIjoicG9zdCIsInVybCI6Imh0dHA6XC9cL2pvdXJuYWwuY3J1c2hsb3ZlbHkuY29tXC9wb3N0XC84ODI4NjgzNTQ3M1wvNy1wYXR0ZXJucy10by1yZWZhY3Rvci1qYXZhc2NyaXB0LWFwcGxpY2F0aW9ucy1zZXJ2aWNlIiwicmVxdHlwZSI6MCwicm91dGUiOiJcL3Bvc3RcLzppZFwvOnN1bW1hcnkiLCJwb3N0cyI6W3sicG9zdGlkIjoiODgyODY4MzU0NzMiLCJibG9naWQiOiI2ODU2MzgiLCJzb3VyY2UiOjMzfV0sIm5vc2NyaXB0IjoxfQ==&U=HGLKNBGHDP&K=bb0fa6a202054b636c53d8307a4bf5b367b9962d5d7cc4da43a5d847a656ba27&R=http%3A%2F%2Fjournal.crushlovely.com%2F)
