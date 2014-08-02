---
apple-mobile-web-app-capable: yes
color:Accent color: '\#ffca66'
color:Sidebar color: '\#121212'
color:Text color: '\#777777'
description: '7 Patterns to Refactor JavaScript Applications: Form Objects'
if:Light Quotes: 0
if:Show Archive: 1
if:Show RSS: 1
if:Show Sidebar Arrow: 1
select:Avatar: circled
title: |
    Crush & Lovely — 7 Patterns to Refactor JavaScript Applications: Form
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
    7 Patterns to Refactor JavaScript Applications: Form Objects By Michael
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

[7 Patterns to Refactor JavaScript Applications: Form Objects](http://journal.crushlovely.com/post/89270334848/7-patterns-to-refactor-javascript-applications-form)
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
be explained. This week, we’ll be talking about Form Objects.

### Patterns

1.  [Value
    Objects](http://journal.crushlovely.com/post/88286828068/7-patterns-to-refactor-javascript-applications-value)
2.  [Service
    Objects](http://journal.crushlovely.com/post/88286835473/7-patterns-to-refactor-javascript-applications-service)
3.  **Form Objects**
4.  [Query
    Objects](http://journal.crushlovely.com/post/89978453593/7-patterns-to-refactor-javascript-applications-query)
5.  [View
    Objects](http://journal.crushlovely.com/post/90568548968/7-patterns-to-refactor-javascript-applications-view)
6.  [Policy
    Objects](http://journal.crushlovely.com/post/91371788978/7-patterns-to-refactor-javascript-applications-policy)
7.  [Decorators](http://journal.crushlovely.com/post/92649246643/7-patterns-to-refactor-javascript-applications-decorators)

### Form Objects

Forms often have complex logic applied to them. In general, the logic
breaks down into the following categories: validation, persistence or
other operations, and feedback

A Form Object can encapsulate all associated logic into a single object,
keeping it focused, isolated, and easy to test. You may have a sign up
form that creates an account, so an associated Form Object could handle
the following logic:

1.  Make sure all fields that are required are present
2.  Make sure all values are valid
3.  Persist the data to the database
4.  Provide success or error feedback to the user

Placing model validations on the Form Object instead of on a centralized
model is perhaps counter-intuitive, since you may have to repeat these
validations across multiple Form Objects that affect the same model. One
question to ask is: where do you want the guards placed in the
life-cycle of a form submission? Personally, I favor keeping validations
closer to the form than the database, so we can provide quicker
feedback. It also feels more semantic that the validations should be
just on the other side of the submit click instead of deep in a model
definition. This also gives you fine-tuned control over the validations
in their specific context and not guard against all scenarios on the
model.

In fact, if we think about it on a higher level, we are in a way
off-loading the concept of a “Model” to the Form Objects and treating
our “Model” objects like Data Access Objects, or DAOs. If this is to be
true, there has to be a bond of trust between the Model and the Form
Object that what is being sent to the model is pure. From an application
architecture standpoint, this can be a really nice design pattern.

Let’s take a look at two examples, one demonstrating a full Form Object
that covers all form operations and one that is a Validation Object that
can be sequenced with other components.

### Example

Let’s imagine a teacher is registering new students for the school year.
The application can hand the form data off to the Form Object for
handling all aspects of its processing flow:

This form gives us a short, expressive API for executing this form in
our main application components, like in a controller or a client-side
view:

One of the awesome things about Form Objects in the JavaScript
environment is their potential for reuse. We may want to validate the
form on the client-side before it is ever sent up to the server for
processing, but we wouldn’t want to only validate on the client since a
user can manipulate those validations, so we also want to have it guard
on the server. We may also want to guard against an API call, too.

If we think creatively about the composition of Form Objects, we can
create a consistent API on all sides of the application. For example, if
instead of a Form Object that encompasses all aspects of form
processing, we create a Validation Object that only guards form values,
we can use it to compose consistent, expressive and context-specific
process flows:

This approach is nice because we can start to favor flexible composition
over large, monolithic objects.

You see how we defined the Validator Object once and can use it in each
entry point to the database, guarding it consistently across all fronts.
This approach can help keep things DRY and organized, but if you find it
easier to see everything in one (potentially large) Form Object instead
of having the process divided up between specialized components, that’s
completely valid, too. It’s all about what type of composition feels
best to you and your team.

### Testing

No matter how you compose your Form Objects, testing is made simpler by
extracting it out of the application stack. All you have to do is
compose an object composed of the form data you want to test, and send
it through. It’s a good practice to make sure you test the error
handling, too, to make sure that all applicable errors are sent back to
the application for messaging to the user.

* * * * *

In the next post, we’ll take a look at Query Objects, giving us a really
expressive and clean way of either retrieving records from the database
or filtering down a collection.

*Special thanks to [Justin Reidy](https://twitter.com/jmreidy) and
[Anisha Vasandani](https://twitter.com/hackerella) for editorial and
code review.*

[](https://www.tumblr.com/reblog/89270334848/EV6HD8O5)

[June 19,
2014](http://journal.crushlovely.com/post/89270334848/7-patterns-to-refactor-javascript-applications-form)

Please enable JavaScript to view the [comments powered by
Disqus.](http://disqus.com/?ref_noscript)

![Quantcast](//pixel.quantserve.com/pixel/'p-19UtqE8ngoZbM'.gif)

![](http://www.tumblr.com/impixu?T=1407007190&J=eyJ0eXBlIjoidXJsIiwidXJsIjoiaHR0cDpcL1wvam91cm5hbC5jcnVzaGxvdmVseS5jb21cL3Bvc3RcLzg5MjcwMzM0ODQ4XC83LXBhdHRlcm5zLXRvLXJlZmFjdG9yLWphdmFzY3JpcHQtYXBwbGljYXRpb25zLWZvcm0iLCJyZXF0eXBlIjowLCJyb3V0ZSI6IlwvcG9zdFwvOmlkXC86c3VtbWFyeSIsIm5vc2NyaXB0IjoxfQ==&U=POPJFKOGBE&K=cb86245afd2360a08bc7c64efb2e04b499db03c8d50cbb1cf1cef3015c83235e&R=)

![](http://www.tumblr.com/impixu?T=1407007190&J=eyJ0eXBlIjoicG9zdCIsInVybCI6Imh0dHA6XC9cL2pvdXJuYWwuY3J1c2hsb3ZlbHkuY29tXC9wb3N0XC84OTI3MDMzNDg0OFwvNy1wYXR0ZXJucy10by1yZWZhY3Rvci1qYXZhc2NyaXB0LWFwcGxpY2F0aW9ucy1mb3JtIiwicmVxdHlwZSI6MCwicm91dGUiOiJcL3Bvc3RcLzppZFwvOnN1bW1hcnkiLCJwb3N0cyI6W3sicG9zdGlkIjoiODkyNzAzMzQ4NDgiLCJibG9naWQiOiI2ODU2MzgiLCJzb3VyY2UiOjMzfV0sIm5vc2NyaXB0IjoxfQ==&U=PEBJLLBAKM&K=e917d5e9727cafc76c96891ea05cbb4e37004a88c74a18942f53bb9193a94d58&R=)
