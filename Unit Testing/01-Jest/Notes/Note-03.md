# Mock Functions

In **Jest**, a mock function (or mock, spy, or fake function) is used to simulate the behavior of real functions in tests. It allows you to "mock" a function's implementation, track its calls, and verify interactions, without actually invoking the real logic or side effects (like making an API request or database operation).

Mock functions are useful in unit testing when you want to:

1. Isolate the behavior of the component or function you're testing.
2. Control the return values of the functions.
3. Track how the mock function is being called during the test.

## Key Features of Mock Functions

- **Call Tracking**: Jest keeps track of how many times the mock function was called, with what arguments, and what values were returned.
- **Custom Implementation**: You can provide a custom implementation for the mock function (e.g., returning a specific value or throwing an error).
- **Return Values**: You can define what value the mock should return when called, either statically or dynamically.

### Creating Mock Functions

#### 1. Using `jest.fn()`

`jest.fn()` creates a new mock function that you can assign to variables, and then track how many times it’s been called, what arguments it received, and what it returned.

```js
const mockFunction = jest.fn();

// Call the mock function
mockFunction("Hello");

// Assertions
expect(mockFunction).toHaveBeenCalled(); // Check if it was called
expect(mockFunction).toHaveBeenCalledWith("Hello"); // Check if it was called with the argument 'Hello'
expect(mockFunction).toHaveBeenCalledTimes(1); // Check if it was called exactly once
```

#### 2. Mocking Return Values

You can use `.mockReturnValue()` or `.mockImplementation()` to specify what the mock should return or how it should behave when called.

```js
const mockFunction = jest.fn().mockReturnValue("mocked value");

expect(mockFunction()).toBe("mocked value"); // The function returns the mocked value
```

With a custom implementation:

```js
const mockFunction = jest.fn((a, b) => a + b); // Simple sum

expect(mockFunction(2, 3)).toBe(5); // Returns 5
```

#### 3. Mocking Asynchronous Functions

When dealing with promises, you can mock the resolved or rejected values using `.mockResolvedValue()` or `.mockRejectedValue()`.

```js
const mockAsyncFunction = jest.fn().mockResolvedValue("data");

// Simulating an async function call
await expect(mockAsyncFunction()).resolves.toBe("data");
```

#### 4. Spying on Real Functions

You can use `jest.spyOn()` to track calls to existing methods while optionally allowing the real implementation to run.

```js
const math = {
  add: (a, b) => a + b,
};

const addSpy = jest.spyOn(math, "add");

// Call the original function
math.add(2, 3);

expect(addSpy).toHaveBeenCalled(); // Track the call
expect(addSpy).toHaveBeenCalledWith(2, 3); // Check the arguments
```

### Example Use Case

Here’s an example of mocking a function inside a module:

```js
// api.js
export const fetchData = () => {
  return fetch("/data").then((response) => response.json());
};

// Component.js
import { fetchData } from "./api";

export const loadData = async () => {
  const data = await fetchData();
  return data;
};

// Component.test.js
import { loadData } from "./Component";
import { fetchData } from "./api";

jest.mock("./api"); // Mock the whole module

test("loads data correctly", async () => {
  fetchData.mockResolvedValue({ name: "John" }); // Mock implementation

  const data = await loadData();

  expect(data).toEqual({ name: "John" });
  expect(fetchData).toHaveBeenCalledTimes(1); // Ensure the mocked fetchData was called once
});
```

### Why Use Mock Functions?

- **Isolation**: They isolate the unit of code being tested from dependencies like external services, APIs, or database operations.
- **Control**: You can specify the behavior of dependencies and how they respond to different inputs.
- **Performance**: Mocking avoids unnecessary delays (e.g., API requests) that could slow down your tests.
- **Tracking**: They help in verifying how many times and in what way a function was used during the test.

Mock functions in Jest are powerful tools to ensure your tests are both efficient and accurate, allowing you to test the specific behavior of your code without executing external or side-effect-driven logic.

## spyOn

In **Jest**, `jest.spyOn()` is used to "spy" on a method of an object. It tracks how the method is called (how many times, with which arguments, and what it returns) and optionally allows you to replace the method's behavior with a custom implementation, while still keeping the original method intact.

Spying is especially useful when you want to monitor a function without fully mocking it, i.e., you want the original implementation to run but still keep track of calls and arguments.

### Key Features of `jest.spyOn()`

1. **Tracking calls**: You can monitor how many times a method was called and with what arguments.
2. **Replacing behavior**: You can replace the original method with a mock implementation (like `jest.fn()`).
3. **Restoring the original implementation**: After a test, you can restore the original method using `mockRestore()` to ensure it doesn't affect other tests.

### Basic Syntax

```js
jest.spyOn(object, "methodName");
```

- `object`: The object that contains the method you want to spy on.
- `methodName`: The name of the method you want to spy on.

### Example: Spying on a Method Without Replacing It

Here’s how you can use `jest.spyOn()` to track calls to a method:

```js
const calculator = {
  add: (a, b) => a + b,
};

test("should spy on add method", () => {
  const addSpy = jest.spyOn(calculator, "add"); // Spy on the `add` method

  const result = calculator.add(2, 3);

  expect(addSpy).toHaveBeenCalled(); // Verify the method was called
  expect(addSpy).toHaveBeenCalledWith(2, 3); // Verify it was called with specific arguments
  expect(result).toBe(5); // The original method runs, so the result is correct

  addSpy.mockRestore(); // Restore the original `add` method (not necessary here but good practice)
});
```

In this example:

- We spy on the `add` method of the `calculator` object.
- The original method runs, and the call is tracked.
- After the test, we restore the original method to ensure the spy doesn’t interfere with other tests.

### Example: Spying and Replacing a Method

You can also replace the original method with a custom implementation:

```js
const user = {
  getName: () => "John",
};

test("should replace getName method", () => {
  const getNameSpy = jest
    .spyOn(user, "getName")
    .mockImplementation(() => "Jane");

  const name = user.getName();

  expect(getNameSpy).toHaveBeenCalled(); // Track the call
  expect(name).toBe("Jane"); // The method now returns 'Jane'

  getNameSpy.mockRestore(); // Restore the original `getName` method
});
```

In this case:

- The `getName` method was replaced with a mock implementation that returns `'Jane'`.
- After the test, we restore the original behavior.

### Restoring the Original Implementation

Using `mockRestore()` is crucial when using `jest.spyOn()` because it restores the original method to prevent interference with other tests.

If you don’t restore the original method after a test, future tests that rely on the method might behave unexpectedly, as the spy (with its mock implementation) could still be active.

### Example: Spying on Built-in Methods

You can also spy on built-in methods, such as `console.log`, to ensure they are called during a function's execution:

```js
test("should log a message", () => {
  const logSpy = jest.spyOn(console, "log");

  console.log("Hello");

  expect(logSpy).toHaveBeenCalledWith("Hello"); // Ensure console.log was called with 'Hello'

  logSpy.mockRestore(); // Restore the original console.log
});
```

### Common Use Cases

1. **Testing callbacks**: Ensure a callback or event handler was called the right number of times and with the correct arguments.
2. **Monitoring side effects**: Track when and how often side effects like logging, API calls, or DOM updates occur.
3. **Conditionally replacing methods**: Replace a method only during a specific test scenario (e.g., when a third-party function is expensive or unreliable).
4. **Testing class methods**: Spy on methods inside a class to verify how they behave in response to various inputs.

### Conclusion

`jest.spyOn()` is a powerful tool when you want to observe how a method behaves in terms of calls, arguments, and results, while optionally replacing its implementation. It allows you to write precise, controlled tests while still giving you flexibility over whether the original function runs or not.
