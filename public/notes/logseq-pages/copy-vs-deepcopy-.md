---
public: "true"
slug: "copy-vs-deepcopy-"
title: "copy() vs deepcopy()"
---

## Shallow Copy

A shallow copy of an object creates a new object, but does not create copies of nested (or "contained") objects within it.

Instead, it copies references to these nested objects.

Changes in the nested object will affect the original object

```py
import copy

# Original list with nested lists
original = [[1, 2, 3], [4, 5, 6]]

# Shallow copy
shallow_copied = copy.copy(original)

# Modify a nested item in the shallow copy
shallow_copied[0][0] = 'UPDATED'

print("Original:", original)       # Original: [['UPDATED', 2, 3], [4, 5, 6]]
print("Shallow copy:", shallow_copied)  # Shallow copy: [['UPDATED', 2, 3], [4, 5, 6]]

```


## Deep Copy

A deep copy of an object creates a new object, as well as new copies of all nested objects contained within it

The new object and the original are completely independent.

```py
import copy

# Original list with nested lists
original = [[1, 2, 3], [4, 5, 6]]

# Deep copy
deep_copied = copy.deepcopy(original)

# Modify a nested item in the deep copy
deep_copied[0][0] = 'UPDATED'

print("Original:", original)      # Original: [[1, 2, 3], [4, 5, 6]]
print("Deep copy:", deep_copied)  # Deep copy: [['UPDATED', 2, 3], [4, 5, 6]]

```
