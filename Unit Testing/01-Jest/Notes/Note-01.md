# Jest

## Installation

```bash
    npm install --save-dev jest
```

## Using matchers

Jest uses "matchers" to let you test values in different ways. This document will introduce some commonly used matchers.

`toBe`: Checks exact equality

```js
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});
```

`toEqual`: checks value equality

```js
test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
```

`Opposite of equality`

```js
test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

Sure! Let's break down the Jest matchers mentioned, using simple examples to make it clear how they work and when to use them.

### Key Concepts

- **Truthiness**: In JavaScript, some values are considered "truthy," meaning they evaluate to `true` in a Boolean context, while others are "falsy," meaning they evaluate to `false`.

- **Falsy values**: `false`, `0`, `''` (empty string), `null`, `undefined`, `NaN`.
- **Truthy values**: Almost everything else, including strings with content, non-zero numbers, objects, arrays, etc.

### Matchers

1. **`toBeNull`**: This matcher checks if a value is exactly `null`.

   ```javascript
   test("null example", () => {
     const value = null;
     expect(value).toBeNull(); // Passes, because value is exactly null
   });
   ```

2. **`toBeUndefined`**: This matcher checks if a value is exactly `undefined`.

   ```javascript
   test("undefined example", () => {
     let value; // value is undefined
     expect(value).toBeUndefined(); // Passes, because value is exactly undefined
   });
   ```

3. **`toBeDefined`**: This is the opposite of `toBeUndefined`. It checks that a value is not `undefined`.

   ```javascript
   test("defined example", () => {
     const value = "Hello";
     expect(value).toBeDefined(); // Passes, because value is defined (not undefined)
   });
   ```

4. **`toBeTruthy`**: This matcher checks if a value is truthy (evaluates to `true` in an `if` statement).

   ```javascript
   test("truthy example", () => {
     const value = "Hello"; // A non-empty string is truthy
     expect(value).toBeTruthy(); // Passes, because value is truthy
   });
   ```

5. **`toBeFalsy`**: This matcher checks if a value is falsy (evaluates to `false` in an `if` statement).

   ```javascript
   test("falsy example", () => {
     const value = 0; // 0 is a falsy value
     expect(value).toBeFalsy(); // Passes, because value is falsy
   });
   ```

### Examples

#### Example 1: Testing `null`

```javascript
test("null example", () => {
  const n = null;
  expect(n).toBeNull(); // Passes: n is exactly null
  expect(n).toBeDefined(); // Passes: n is defined (not undefined)
  expect(n).not.toBeUndefined(); // Passes: n is not undefined
  expect(n).not.toBeTruthy(); // Passes: n is not truthy (null is falsy)
  expect(n).toBeFalsy(); // Passes: n is falsy
});
```

- `null` is exactly `null`.
- It's also considered falsy.
- It's defined, so it's not `undefined`.

#### Example 2: Testing `0`

```javascript
test("zero example", () => {
  const z = 0;
  expect(z).not.toBeNull(); // Passes: 0 is not null
  expect(z).toBeDefined(); // Passes: 0 is defined (not undefined)
  expect(z).not.toBeUndefined(); // Passes: 0 is not undefined
  expect(z).not.toBeTruthy(); // Passes: 0 is not truthy (0 is falsy)
  expect(z).toBeFalsy(); // Passes: 0 is falsy
});
```

- `0` is not `null`, but it is considered falsy.
- It's also defined, so it passes the `toBeDefined` check.

### Summary

- **Use `toBeNull`** when you expect the value to be exactly `null`.
- **Use `toBeUndefined`** when you expect the value to be exactly `undefined`.
- **Use `toBeDefined`** when you want to ensure the value is not `undefined`.
- **Use `toBeTruthy`** when the value should evaluate to `true` (e.g., non-empty strings, numbers other than 0).
- **Use `toBeFalsy`** when the value should evaluate to `false` (e.g., `0`, `null`, `undefined`).

Choose the matcher that best fits what you're trying to test to make your tests more precise and readable.

## Numbers

Most ways of comparing numbers have matcher equivalents.

```js
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

For floating point equality, use toBeCloseTo instead of toEqual, because you don't want a test to depend on a tiny rounding error.

```js
test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

## String

These examples demonstrate how to use the `toMatch` matcher in Jest to check if a string matches a given regular expression (regex).

### What is `toMatch`?

The `toMatch` matcher is used to verify that a string either matches or does not match a specified regular expression. Regular expressions are patterns used to match character combinations in strings.

### Example 1: No "I" in "team"

```javascript
test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});
```

**Explanation:**

- **Goal:** This test checks that the string `"team"` does not contain the letter "I".
- **Regex:** `/I/` is a regular expression that looks for the letter "I" in the string.
- **Assertion:** `expect('team').not.toMatch(/I/);` checks that the string `"team"` does not match the regular expression `/I/`.
- **Outcome:** The test passes because `"team"` does not contain the letter "I".

### Example 2: "stop" in "Christoph"

```javascript
test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});
```

**Explanation:**

- **Goal:** This test checks that the string `"Christoph"` contains the substring `"stop"`.
- **Regex:** `/stop/` is a regular expression that looks for the substring `"stop"` in the string.
- **Assertion:** `expect('Christoph').toMatch(/stop/);` checks that the string `"Christoph"` matches the regular expression `/stop/`.
- **Outcome:** The test passes because the string `"Christoph"` contains the substring `"stop"`.

### String Summary

- **`toMatch(regex)`**: Checks if a string matches the given regular expression.
- **`.not.toMatch(regex)`**: Checks if a string does not match the given regular expression.

These matchers are particularly useful for checking if certain patterns, words, or characters are present or absent in a string.

## Arrays and iterables

In this example, you're testing whether a specific item exists within an array or iterable using Jest's `toContain` matcher.

### What is `toContain`?

The `toContain` matcher is used to check if an array or any iterable (like a `Set`) contains a specific item.

### Example: Checking for "milk" in a shopping list

```javascript
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});
```

### Explanation

1. **Array Example:**

   ```javascript
   expect(shoppingList).toContain("milk");
   ```

   - **Goal:** This line checks if the `shoppingList` array contains the item `"milk"`.
   - **Assertion:** `expect(shoppingList).toContain('milk');` verifies that `"milk"` is present in the `shoppingList` array.
   - **Outcome:** The test passes because `"milk"` is indeed one of the items in the array.

2. **Set Example:**

   ```javascript
   expect(new Set(shoppingList)).toContain("milk");
   ```

   - **Goal:** This line checks if a `Set` created from the `shoppingList` array contains the item `"milk"`.
   - **Set:** A `Set` is a special type of iterable that stores unique values. Converting an array to a `Set` ensures all elements are unique (though in this case, the array already contains unique items).
   - **Assertion:** `expect(new Set(shoppingList)).toContain('milk');` checks that the `Set` contains `"milk"`.
   - **Outcome:** The test passes because the `Set` created from `shoppingList` includes `"milk"`.

### Arrays & Iterables Summary

- **`toContain(item)`**: Checks if an array or iterable contains the specified `item`.
- This is useful when you want to verify that a list or collection includes a particular element, as shown with the `"milk"` item in the `shoppingList`.

## Exceptions

When testing in JavaScript, you may want to verify that a function throws an error under certain conditions. Jest's `toThrow` matcher allows you to do this easily.

### Example: Testing a function that throws an error

Consider the following function:

```javascript
function compileAndroidCode() {
  throw new Error("you are using the wrong JDK!");
}
```

This function always throws an error with the message `"you are using the wrong JDK!"`.

### Using `toThrow` in tests

Here's how you can test that this function behaves as expected:

```javascript
test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // Or you can match an exact error message using a regexp like below
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});
```

### Explanation of Exceptions

1. **Basic Usage:**

   ```javascript
   expect(() => compileAndroidCode()).toThrow();
   ```

   - **Goal:** This checks if `compileAndroidCode` throws any error.
   - **Outcome:** The test passes because the function throws an error.

2. **Checking Error Type:**

   ```javascript
   expect(() => compileAndroidCode()).toThrow(Error);
   ```

   - **Goal:** This checks if the error thrown is of type `Error`.
   - **Outcome:** The test passes because the function throws an `Error`.

3. **Matching Error Message (String):**

   ```javascript
   expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
   ```

   - **Goal:** This checks if the error message contains the string `"you are using the wrong JDK"`.
   - **Outcome:** The test passes because the error message matches the string.

4. **Matching Error Message (RegExp):**

   ```javascript
   expect(() => compileAndroidCode()).toThrow(/JDK/);
   ```

   - **Goal:** This checks if the error message contains the substring `"JDK"` (using a regular expression).
   - **Outcome:** The test passes because `"JDK"` is part of the error message.

5. **Exact Error Message Match (RegExp):**

   ```javascript
   expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
   ```

   - **Goal:** This checks if the error message exactly matches `"you are using the wrong JDK"` without the exclamation mark.
   - **Outcome:** The test fails because the actual message includes an exclamation mark.

   ```javascript
   expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
   ```

   - **Goal:** This checks if the error message exactly matches `"you are using the wrong JDK!"` with the exclamation mark.
   - **Outcome:** The test passes because the message matches exactly.

### Important Tip

The function that throws an error must be wrapped in another function when passed to `expect`. For example:

```javascript
expect(compileAndroidCode).toThrow(); // This is incorrect and will fail
```

Instead, you should do:

```javascript
expect(() => compileAndroidCode()).toThrow(); // This is correct
```

The wrapping function (`() => compileAndroidCode()`) ensures that the `toThrow` matcher properly detects the error when `compileAndroidCode` is executed.
