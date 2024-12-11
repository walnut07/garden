---
public: "true"
slug: "lazy-initialization"
title: "Lazy initialization"
---

Lazy Initialization is a performance optimization where you defer (potentially expensive) object creation until just before you actually need it.

One good example is to not create a database connection up front, but only just before you need to get data from the database.

The key reason for doing this is that (often) you can avoid creating the object completely if you never need it.
- [Stack overflow](https://stackoverflow.com/questions/978759/what-is-lazy-initialization-and-why-is-it-useful)
