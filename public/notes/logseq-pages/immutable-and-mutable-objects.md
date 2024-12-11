---
date: "Nov 19th, 2024"
public: "true"
slug: "immutable-and-mutable-objects"
tags: [Kotlin]
title: "Immutable and Mutable Objects"
---

## Immutable Objects in Python

integers, strings, tuples

They can't be modified = their state cannot change once created

They can be hashed
- they can be used as keys in dictionaries, elements in sets


### Passing an immutable type to a function

**a copy of the reference** to the object is passed to the function.

```python
def modify(x):
    x += 1  # This creates a new integer object, not modifying the original one
    print("Inside function:", x) # 6

num = 5
modify(num)
print("Outside function:", num) # 5; the original object remains unchanged
```


## Mutable Objects in Python

lists, dictionaries, sets

They can be modified after it was created

They can't be hashed unless it's a user defines a __hash__():
- ```py
  class HashableList(list):
      def __hash__(self):
          return id(self)
  
  x = HashableList([1,2,3])
  y = HashableList([1,2,3])
  ```
- Why are they **not hashable** by default?
	- To keep hash consistency. Mutable objects, such as lists or dictionaries, can have their contents altered. If a mutable object’s contents change, its hash value would also change.
	  logseq.order-list-type:: number

### Passing a mutable type to a function
- Python passes a reference to the object (the memory address) to a function.
- Changes made to the object in the function will affect the original object outside the function
- ```py
  def modify(lst):
      lst.append(4)  # Modifies the original list
      print("Inside function:", lst) # [1, 2, 3, 4]
  
  my_list = [1, 2, 3]
  modify(my_list)
  print("Outside function:", my_list) # [1, 2, 3, 4]
  ```

