---
created: "[[Dec 10th, 2024]]"
public: "true"
slug: "null-safety-in-kotlin"
tags: Kotlin
title: "Null Safety in Kotlin"
---

## Non-nullable vs Nullable

In Kotlin, all basic types are **non-nullable** by default.

This means they **cannot** hold null values.

However, they can do that **when they are explicitly made nullable** with the **?** operator.


```kotlin
val name: String = "Alice" // Non-nullable
name = null // Compile-time error: Null cannot be a value of a non-null type String

val name: String? = "Alice" // Nullable String
name = null // Ok!
```


## How to handle nullable

**Safe Call `?.`**
- This allows safe access to properties or methods of nullable values.
- With this, the result is also null
- ```kotlin
  val name: String? = null
  println(name?.length) // Output: null
  ```

**Elvis Operator `?:`**
- Provide a default value when a safe call evaluates to null
- ```kotlin
  val name: String? = null
  println(name?.length ?: 0) // Output: 0
  ```

**Non-Null Assertion**
- Assert that a nullable type is non-null.
- Throws a `KotlinNullPointerException` if it's not.
- ```kotlin
  val name: String? = null
  println(name!!.length) // Throws KotlinNullPointerException
  ```