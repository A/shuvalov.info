
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
