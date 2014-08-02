---
apple-mobile-web-app-capable: yes
color:Accent color: '\#ffca66'
color:Sidebar color: '\#121212'
color:Text color: '\#777777'
description: '7 Patterns To Refactor JavaScript Applications: Policy Objects'
if:Light Quotes: 0
if:Show Archive: 1
if:Show RSS: 1
if:Show Sidebar Arrow: 1
select:Avatar: circled
title: |
    Crush & Lovely — 7 Patterns To Refactor JavaScript Applications: Policy
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
    7 Patterns To Refactor JavaScript Applications: Policy Objects By
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

[7 Patterns To Refactor JavaScript Applications: Policy Objects](http://journal.crushlovely.com/post/91371788978/7-patterns-to-refactor-javascript-applications-policy)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
be explained. This week, we’ll be talking about Policy Objects.

### Patterns

1.  [Value
    Objects](http://journal.crushlovely.com/post/88286828068/7-patterns-to-refactor-javascript-applications-value)
2.  [Service
    Objects](http://journal.crushlovely.com/post/88286835473/7-patterns-to-refactor-javascript-service-objects)
3.  [Form
    Objects](http://journal.crushlovely.com/post/89270334848/7-patterns-to-refactor-javascript-applications-form)
4.  [Query
    Objects](http://journal.crushlovely.com/post/89978453593/7-patterns-to-refactor-javascript-applications-query)
5.  [View
    Objects](http://journal.crushlovely.com/post/90568548968/7-patterns-to-refactor-javascript-applications-view)
6.  **Policy Objects**
7.  [Decorators](http://journal.crushlovely.com/post/92649246643/7-patterns-to-refactor-javascript-applications-decorators)

### Policy Objects

When a piece of business logic associated with a model becomes
sufficiently complex or is not a part of the core model logic, it is a
candidate for extraction into a Policy Object. These objects encapsulate
operations that interpret models and exclusively return boolean values,
describing whether the policy passes or doesn’t pass the object.

For example, if a worker process sends an email to a group of users, a
Policy Object can be used to determine which users should be emailed. A
Policy Object would return true if the user has an email address, that
email address has been verified, and they have not unsubscribed from
correspondence.

Helmkamp describes the potential overlap in concept between a Policy
Object and a Query Object or a Service Object. He writes, *"Policy
Objects are similar to Service Objects, but I use the term ‘Service
Object’ for write operations and ‘Policy Object’ for reads. They are
also similar to Query Objects, but Query Objects focus on executing SQL
to return a result set, whereas Policy Objects operate on domain models
already loaded into memory."*

### Example

Let’s imagine a collection of students that comprise the entire freshman
student body. We want to filter out all students that are eligible to
register for sports, which we define with these rules:

1.  Not suspended
2.  Not expelled
3.  Are passing all classes

Eligibility for sports enrollment isn’t a core concept of the `Student`
model and the logic is complex, so we can extract it into a Policy
Object like this:

You can also see the composition opportunities for Policy Objects in the
`#isPassing` method, which uses another Policy Object to return whether
or not the student is passing. Now policies that are part of our
business logic are extracted from the model itself and put into
unit-testable, easy to understand, and composable components.

### Testing

Unit testing a Policy Object couldn’t be simpler — one should build an
object that should either pass or fail and ensure that the Policy Object
returns the right boolean value.

* * * * *

In the next and final post of this series, we’ll take a look at
Decorators, which are great for composing complex and varying processes.

*Special thanks to [Justin Reidy](https://twitter.com/jmreidy) and
[Anisha Vasandani](https://twitter.com/hackerella) for editorial and
code review.*

[](https://www.tumblr.com/reblog/91371788978/MfGWBYVU)

[July 10,
2014](http://journal.crushlovely.com/post/91371788978/7-patterns-to-refactor-javascript-applications-policy)

1.  [![](http://38.media.tumblr.com/avatar_76d458baee2c_64.png)](http://corndogg2000.tumblr.com/ "corndogg2000 ")[corndogg2000](http://corndogg2000.tumblr.com/ "corndogg2000")
    likes this
2.  [![](http://38.media.tumblr.com/avatar_9c5bf3bef59b_64.png)](http://fuckyeahjavascript.tumblr.com/ "Fuck Yeah JavaScript! ")[fuckyeahjavascript](http://fuckyeahjavascript.tumblr.com/ "Fuck Yeah JavaScript!")
    likes this
3.  [![](http://38.media.tumblr.com/avatar_9c5bf3bef59b_64.png)](http://fuckyeahjavascript.tumblr.com/ "Fuck Yeah JavaScript!")[fuckyeahjavascript](http://fuckyeahjavascript.tumblr.com/ "Fuck Yeah JavaScript!")
    reblogged this from
    [crushlovely](http://journal.crushlovely.com/ "Crush & Lovely")
4.  [![](http://37.media.tumblr.com/avatar_4cf866818ff2_64.png)](http://journal.crushlovely.com/ "Crush & Lovely")[crushlovely](http://journal.crushlovely.com/ "Crush & Lovely")
    posted this

Please enable JavaScript to view the [comments powered by
Disqus.](http://disqus.com/?ref_noscript)

![Quantcast](//pixel.quantserve.com/pixel/'p-19UtqE8ngoZbM'.gif)

![](http://www.tumblr.com/impixu?T=1407007264&J=eyJ0eXBlIjoidXJsIiwidXJsIjoiaHR0cDpcL1wvam91cm5hbC5jcnVzaGxvdmVseS5jb21cL3Bvc3RcLzkxMzcxNzg4OTc4XC83LXBhdHRlcm5zLXRvLXJlZmFjdG9yLWphdmFzY3JpcHQtYXBwbGljYXRpb25zLXBvbGljeSIsInJlcXR5cGUiOjAsInJvdXRlIjoiXC9wb3N0XC86aWRcLzpzdW1tYXJ5Iiwibm9zY3JpcHQiOjF9&U=HIMKEIMAGN&K=4fedfd659d6d864569a1d2ea6e2f7c493f7e9532c10cd625f130e30811dea6ae&R=http%3A%2F%2Fjournal.crushlovely.com%2Fpost%2F90568548968%2F7-patterns-to-refactor-javascript-applications-view)

![](http://www.tumblr.com/impixu?T=1407007264&J=eyJ0eXBlIjoicG9zdCIsInVybCI6Imh0dHA6XC9cL2pvdXJuYWwuY3J1c2hsb3ZlbHkuY29tXC9wb3N0XC85MTM3MTc4ODk3OFwvNy1wYXR0ZXJucy10by1yZWZhY3Rvci1qYXZhc2NyaXB0LWFwcGxpY2F0aW9ucy1wb2xpY3kiLCJyZXF0eXBlIjowLCJyb3V0ZSI6IlwvcG9zdFwvOmlkXC86c3VtbWFyeSIsInBvc3RzIjpbeyJwb3N0aWQiOiI5MTM3MTc4ODk3OCIsImJsb2dpZCI6IjY4NTYzOCIsInNvdXJjZSI6MzN9XSwibm9zY3JpcHQiOjF9&U=PGDPCDOGND&K=26918ef1f4ea9b9a576e646467798a21c4cb0905c2043e1c10083437180d32dd&R=http%3A%2F%2Fjournal.crushlovely.com%2Fpost%2F90568548968%2F7-patterns-to-refactor-javascript-applications-view)
