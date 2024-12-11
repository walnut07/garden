---
date: "Dec 10th, 2024"
public: "true"
slug: "base-64-encode"
tags: [[]]
title: "Base 64 encode"
---

It works as follows:
- Convert each character to a ASCII numbner
	- e.g., `Cat` -> `67 97 116`
- Convert the ASCII number to binary
	- `01000011 01100001 01110100`
- Group the binary data to 6-bit chunks
	- `010000 110110 000101 110100`
- Map each 6-bit chunk to a Base64 alphabet, which consists of 64 characters (A–Z, a–z, 0–9, +, /).
	- `010000` = 16 → `Q`
	- `110110` = 54 → `2`
	- `000101` = 5 → `F`
	- `110100` = 52 → `0`

