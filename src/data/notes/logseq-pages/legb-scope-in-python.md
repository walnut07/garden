---
public: "true"
slug: "legb-scope-in-python"
title: "LEGB Scope in Python"
---

Local
- Variables defined within a function are only accessible within that function.

Enclosing
- This applies to nested functions, where an inner function has access to the variables of its enclosing (outer) function.
- If a variable is referenced in an inner function and isn’t found locally, Python checks the enclosing scope of the function in which it’s nested.

Global
- Variables defined at the top level of a module or script are considered global and are accessible throughout the module.
- If a variable is referenced in a function and isn’t found in the local or enclosing scopes, Python checks the global scope.

Built-in
- This is the outermost scope and contains built-in Python functions and constants like len, int, print, etc.
- Python looks here last


```py
x = "global"

def outer_function():
    x = "enclosing"

    def inner_function():
        x = "local" # This is a local variable
        # This would look for `x` in the enclosing scope
        # nonlocal x
       
        print(x)  # Outputs "local"

    inner_function()
    print(x)  # Outputs "enclosing"

outer_function()
print(x)  # Outputs "global"
```