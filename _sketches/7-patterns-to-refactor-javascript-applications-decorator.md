---

layout: post
title: "Декораторы"

---


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

[7 Patterns To Refactor JavaScript Applications: Decorators](http://journal.crushlovely.com/post/92649246643/7-patterns-to-refactor-javascript-applications-decorator)
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
be explained. This week, we’ll be talking about Decorators.

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
6.  [Policy
    Objects](http://journal.crushlovely.com/post/91371788978/7-patterns-to-refactor-javascript-applications-policy)
7.  **Decorators**

### Decorators

When a process has side effects that need to be executed only in certain
situations, this functionality can be layered onto an existing operation
using Decorators. A Decorator takes an object and wraps auxiliary
functionality around it, letting you add on what you need when you need
it and keeping the core procedure untouched.

### Example

Let’s imagine a Service Object that generates report cards for each
student in a class. A teacher can generate these report cards at any
point, but there are some situations where those report cards should be
mailed to the students’ parent.

One way to address this would be to have two separate Service Objects,
`GenerateReportCards` and `GenerateReportCardsAndEmailParent`, but this
creates duplication and is hard to maintain when there are many cases
with many conditional steps.

Another way would be to put together callbacks, such as:

This isn’t bad, but it relies on the return value from the Service
Object to be usable for the subsequent process. Additionally, the same
process may need to happen in both procedures, such as generating the
HTML for the report card.

This problem calls for a Decorator, which targets a specific method and
layers on top of it, allowing us to tap into an existing operation and
add auxiliary functionality. So, for this example, our Service object
looks like this:

We could create a Decorator object that accepts an instance of the
Service Object as its argument and returns that Service Object with the
specified method wrapped with the added functionality.

One key goal of the Decorator pattern is that the returned object is the
*same object* as the input object, both in terms of identity and API,
but with an altered property. So the following should be true if the
object is decorated properly:

With this pattern in practice, we can layer on any number of Decorators
that decorate any number of methods on the original Service Object for
much win:

### Testing

When testing a Decorator, it is wise to test that the method is both
decorating the original object properly and that the auxiliary method or
methods are performing the right actions. A reasonably comprehensive
test suite for the `EmailReportCardToParent` Decorator above could look
like this:

* * * * *

This concludes the series on 7 Patterns for Refactoring JavaScript
Applications. I hope these concepts have provided you with a core
understanding of ways in which you can refactor your own applications.
Each pattern has different implementations, approaches, and degrees of
attraction to each engineer. However, these concepts have been
battle-tested and proven successful in our applications at [Crush &
Lovely](http://crushlovely.com), and we are always trying to think of
new and better objects to refactor our applications with.

What are some of your favorites of the patterns I’ve covered here? Are
there others that I didn’t mention that you’ve used? Also, if you like
these patterns and want to join a team of engineers that are constantly
pushing to write better, more stable, and more readable JavaScript
applications, check out our [open
positions](http://jobs.crushlovely.com)!

*Special thanks to [Justin Reidy](https://twitter.com/jmreidy) and
[Anisha Vasandani](https://twitter.com/hackerella) for editorial and
code review.*

[](https://www.tumblr.com/reblog/92649246643/0pXfoduQ)

[July 23,
2014](http://journal.crushlovely.com/post/92649246643/7-patterns-to-refactor-javascript-applications-decorator)

1.  [![](http://31.media.tumblr.com/avatar_9c40abbc98f6_64.png)](http://pixelhunter.me/ "Pixelhunter - Dmitri Voronianski's blog ")[voronianski](http://pixelhunter.me/ "Pixelhunter - Dmitri Voronianski's blog")
    likes this
2.  [![](http://37.media.tumblr.com/avatar_4cf866818ff2_64.png)](http://journal.crushlovely.com/ "Crush & Lovely")[crushlovely](http://journal.crushlovely.com/ "Crush & Lovely")
    posted this

Please enable JavaScript to view the [comments powered by
Disqus.](http://disqus.com/?ref_noscript)

![Quantcast](//pixel.quantserve.com/pixel/'p-19UtqE8ngoZbM'.gif)

![](http://www.tumblr.com/impixu?T=1407007305&J=eyJ0eXBlIjoidXJsIiwidXJsIjoiaHR0cDpcL1wvam91cm5hbC5jcnVzaGxvdmVseS5jb21cL3Bvc3RcLzkyNjQ5MjQ2NjQzXC83LXBhdHRlcm5zLXRvLXJlZmFjdG9yLWphdmFzY3JpcHQtYXBwbGljYXRpb25zLWRlY29yYXRvciIsInJlcXR5cGUiOjAsInJvdXRlIjoiXC9wb3N0XC86aWRcLzpzdW1tYXJ5Iiwibm9zY3JpcHQiOjF9&U=LFIFBBJPOL&K=227a2d9e2c8a7642cb3cb0d5aa156abca11b0361d520068f1e321f3a22dc9c96&R=http%3A%2F%2Fjournal.crushlovely.com%2Fpost%2F91371788978%2F7-patterns-to-refactor-javascript-applications-policy)

![](http://www.tumblr.com/impixu?T=1407007305&J=eyJ0eXBlIjoicG9zdCIsInVybCI6Imh0dHA6XC9cL2pvdXJuYWwuY3J1c2hsb3ZlbHkuY29tXC9wb3N0XC85MjY0OTI0NjY0M1wvNy1wYXR0ZXJucy10by1yZWZhY3Rvci1qYXZhc2NyaXB0LWFwcGxpY2F0aW9ucy1kZWNvcmF0b3IiLCJyZXF0eXBlIjowLCJyb3V0ZSI6IlwvcG9zdFwvOmlkXC86c3VtbWFyeSIsInBvc3RzIjpbeyJwb3N0aWQiOiI5MjY0OTI0NjY0MyIsImJsb2dpZCI6IjY4NTYzOCIsInNvdXJjZSI6MzN9XSwibm9zY3JpcHQiOjF9&U=JDJELEAGCG&K=3562f66b0404d14ee5fb826d794f2a8e4b053e4a97b0977d78d34d6f358c018b&R=http%3A%2F%2Fjournal.crushlovely.com%2Fpost%2F91371788978%2F7-patterns-to-refactor-javascript-applications-policy)
