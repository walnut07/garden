---
created: "<% now %>"
public: "true"
slug: "boxing-in-kotlin"
tags: [Kotlin]
title: "Boxing in Kotlin"
---

Boxing:  the process of converting a primitive numeric type into its corresponding wrapper class object


## When does Boxing occur?
- Generics
	- `List<Int>` will have its `Int` values boxed, because the underlying Java `List` cannot hold primitive types
- Nullable Types
	- If a variable declared is nullable, like `var num: Int?`, it must be an **object** to accommodate null
- Example:
	- ```kotlin
	  val numbers: List<Int> = listOf(1, 2, 3)
	  ```
