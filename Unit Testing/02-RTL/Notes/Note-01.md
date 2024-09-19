# React Testing Library

To ensure software works, we test the application.
We check if our software works as expected.

## Manual Testing

An individual will open the website, interact with the website and ensure everything works as intended.

If a new feature is realeased, you repeat the same steps.

You may have to test not only the new features but also the existing features.

`Drawback:`

- Time consuming.
- Complex repetitive tasks has a risk of human error.
- You may not get a chance to test all the features you should.

## Automated Testing

Automated tests are programs that automate the task of testing your software.
Write code to test the software code.
Additional effort required when you develop a feature.

`Advantages:`

- Not time consuming.
- Reliable, consistent and not error prone.
- Easy to indentify and fix features that break tests.
- Easy to identify and fix features that breaks tests.
- Give confidence when shipping software

## Jest vs RTL

### Jest

Jest is js testing framework.
Jest is a test runenr that finds tests, runs and test, and determines whether tests passed or failed and reports it back in a human readable manner.

### RTL

- Javascript testing utility that provides virtual DOM for testing React components.
- React Testing library provides a virtual DOM which we can use to interact with and verify the behaviour of react component.
- Testing library is infact a family of packages which helps test UI components.
- The core library is called DOM Testing library and RTL is simply a warpper around the core library to test React applicatiosn in an easier way.

## Types of Testing

### Unit Testing

- Tests individual component.
- Dependencies are mocked.

### Integration testing

Focus on testing a combination of units and ensuring they work together.

## Anatomy of test

`test(name,fn,timeout)`:

- The first argument is the test name.
- Second argumetn is function that contain the expectation to test.
- Third argument is timeout which is an optional argument for specifiying how long to wait before aborting the test, default time is 5 seconds.

## Test Driven Development(TDD)

Write your test before code.

1. Create tests that verify the functionality of a specific feature.
2. Write software code that will run the test successfully when re-executed.
3. Refactor the code for optimization the tests continue to pass.

`NOTE:` Also called red-green testing.

## filtering test

You can use CLI or `test.only` or `test.skip`.

## Grouping Tests

`describe(name,fn)`

- The first argument is the group name
- The second argument is a function that contains the expectations to test.

```js
// Login.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login Component", () => {
  test("renders username and password inputs", () => {
    render(<Login />);

    // Check if input fields and button are in the document
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("shows error message when form is submitted empty", () => {
    render(<Login />);

    // Simulate form submission
    fireEvent.click(screen.getByText("Login"));

    // Check if error message is displayed
    expect(
      screen.getByText("Please provide both username and password")
    ).toBeInTheDocument();
  });

  test("does not show error message when username and password are provided", () => {
    render(<Login />);

    // Simulate typing into input fields
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "secret" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Login"));

    // Check that error message is not present
    expect(
      screen.queryByText("Please provide both username and password")
    ).not.toBeInTheDocument();
  });
});
```

## Code Coverage

To set up **code coverage** in your **React app** using **Vitest** and **React Testing Library (RTL)**, you'll need to integrate Vitest’s built-in code coverage functionality. This can be easily configured using **C8**, which is bundled with Vitest for coverage reports.

Here’s a step-by-step guide to setting up code coverage for your React app:

### 1. **Install Vitest and RTL**

If you haven't already installed Vitest and React Testing Library, you can do so with:

```bash
npm install vitest @testing-library/react @testing-library/jest-dom --save-dev
```

Additionally, you can install the `@testing-library/user-event` for simulating user interactions if needed:

```bash
npm install @testing-library/user-event --save-dev
```

### 2. **Set Up Vitest in Your React Project**

Ensure that you have a **`vite.config.js`** file in the root of your project. This is where you’ll configure Vitest for testing.

Here’s a basic Vite configuration for React:

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables Jest-like global variables
    environment: "jsdom", // Emulates the DOM for React Testing Library
    setupFiles: "./setupTests.js", // Where you can configure global test setup
    coverage: {
      provider: "c8", // Built-in code coverage provider
      reporter: ["text", "json", "html"], // Generates various reports
    },
    exclude: [...configDefaults.exclude], // Ensures default exclusions are respected
  },
});
```

### 3. **Create a `setupTests.js` File**

The `setupTests.js` file is where you set up global configurations for React Testing Library. For example, you can import **`jest-dom`** to get additional matchers like `toBeInTheDocument`:

```js
// setupTests.js
import "@testing-library/jest-dom";
```

### 4. **Write Tests with React Testing Library**

Here’s a simple test for a `Counter` component:

```jsx
// src/Counter.jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Write a test for the `Counter` component

```js
// src/Counter.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("renders Counter component and increments count", () => {
  render(<Counter />);

  // Verify the initial counter value
  expect(screen.getByText(/counter:/i)).toHaveTextContent("Counter: 0");

  // Simulate a button click
  fireEvent.click(screen.getByText(/increment/i));

  // Verify the updated counter value
  expect(screen.getByText(/counter:/i)).toHaveTextContent("Counter: 1");
});
```

### 5. **Run Tests and Generate Coverage**

To run your tests and generate a coverage report, use the following command:

```bash
npx vitest run --coverage
```

This will run all the tests and generate a code coverage report based on the code paths exercised by your tests.

### 6. **View Coverage Reports**

The code coverage report will include various formats:

- **Text**: Printed directly in the terminal.
- **HTML**: An interactive report you can open in a browser.

The HTML report is generated in the `coverage` folder. You can open the report by navigating to `coverage/index.html`.

### 7. **Code Coverage Metrics**

In the coverage report, you'll see metrics like:

- **Statements**: Percentage of executed statements in the code.
- **Branches**: Coverage of conditionals like `if`/`else`.
- **Functions**: Coverage of functions being executed.
- **Lines**: Percentage of lines covered by the tests.

### 8. **Excluding Files from Coverage**

If you want to exclude certain files or folders (like `node_modules`, `index.js`, or utility files), you can add the `exclude` option to the coverage config:

```js
coverage: {
  provider: 'c8',
  reporter: ['text', 'json', 'html'],
  exclude: ['src/setupTests.js', 'src/main.jsx', 'node_modules/**'],
}
```

### 9. **Code Coverage Thresholds**

You can enforce minimum coverage thresholds for statements, branches, lines, and functions. Add the `check` configuration to specify thresholds:

```js
coverage: {
  provider: 'c8',
  reporter: ['text', 'json', 'html'],
  check: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
}
```

This will cause the test run to fail if the coverage falls below the specified thresholds.

---

### **Summary**

- **Vitest** provides built-in support for code coverage using **C8**.
- **React Testing Library** integrates smoothly with Vitest, allowing you to test React components and generate coverage reports.
- Configure **`vite.config.js`** to set up the coverage provider, generate reports, and exclude certain files if necessary.
- Use the **`--coverage`** flag when running Vitest to generate the coverage report.

Now, your React app with Vitest and RTL is fully set up to provide code coverage reports!

## Assertions

In **Vitest**, assertions are used to verify the outcome of tests. Vitest provides a set of built-in assertion methods (inspired by Jest and Node.js’ `assert` module) that are used to check if a given condition or result is true. These assertions are typically made using the `expect` function, which can be extended with various matchers to test the values.

Here’s how you can work with assertions in Vitest:

### 1. **Basic Assertions Using `expect`**

Vitest follows the same pattern as Jest when it comes to assertions. The `expect` function is used with matchers like `toBe`, `toEqual`, `toBeTruthy`, etc.

#### Example of basic assertion

```js
import { describe, test, expect } from "vitest";

describe("Basic Assertions", () => {
  test("should add numbers correctly", () => {
    const result = 2 + 2;
    expect(result).toBe(4); // Passes because 2 + 2 equals 4
  });

  test("object equality", () => {
    const data = { name: "John" };
    expect(data).toEqual({ name: "John" }); // Checks deep equality of objects
  });
});
```

### 2. **Common Assertions (Matchers)**

- `toBe(value)`: For strict equality (`===`).
- `toEqual(value)`: For deep equality (used for objects and arrays).
- `toBeNull()`: Checks if the value is `null`.
- `toBeUndefined()`: Checks if the value is `undefined`.
- `toBeTruthy()`: Checks if the value is truthy.
- `toBeFalsy()`: Checks if the value is falsy.
- `toContain(item)`: Checks if an array or string contains the specified item.
- `toHaveLength(number)`: Checks if an array or string has the specified length.
- `toThrow()`: Checks if a function throws an error.
- `toBeGreaterThan(number)`: Asserts that a value is greater than the given number.

#### Example of common assertion

```js
import { describe, test, expect } from "vitest";

describe("Matchers in Vitest", () => {
  test("truthy and falsy values", () => {
    expect(true).toBeTruthy(); // Passes because true is truthy
    expect(false).toBeFalsy(); // Passes because false is falsy
  });

  test("array contains", () => {
    const shoppingList = ["milk", "eggs", "bread"];
    expect(shoppingList).toContain("milk"); // Passes because 'milk' is in the array
  });

  test("object has a property", () => {
    const user = { name: "John", age: 30 };
    expect(user).toHaveProperty("name", "John"); // Checks if the object has the 'name' property with value 'John'
  });

  test("exception throwing", () => {
    const throwError = () => {
      throw new Error("Something went wrong");
    };
    expect(throwError).toThrow(); // Passes because throwError throws an error
  });
});
```

### 3. **Async Assertions**

In Vitest, you can also assert the result of asynchronous functions. Vitest supports `async/await` and `Promises`.

#### Example with Promises

```js
import { test, expect } from "vitest";

test("resolves with the correct value", async () => {
  const fetchData = () => Promise.resolve("Data received");
  await expect(fetchData()).resolves.toBe("Data received");
});

test("rejects with an error", async () => {
  const fetchError = () => Promise.reject("Error occurred");
  await expect(fetchError()).rejects.toBe("Error occurred");
});
```

### 4. **Advanced Assertions**

Vitest also supports more complex and advanced assertions, such as checking specific properties, matching patterns with regex, and so on.

- **toMatch**: Used to match a string or regular expression.

  ```js
  expect("Hello World").toMatch(/world/i); // Case-insensitive match for 'world'
  ```

- **toBeInstanceOf**: Checks if an object is an instance of a class or constructor function.

  ```js
  class User {}
  expect(new User()).toBeInstanceOf(User);
  ```

- **toHaveBeenCalled**: Asserts that a mock function has been called (often used with spies or mocks).

  ```js
  const mockFn = vi.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalled();
  ```

### 5. **Custom Matchers**

Vitest also allows you to extend the assertion library by adding custom matchers. You can write your own matchers using `expect.extend`.

#### Example of custom matchers

```js
import { expect } from "vitest";

expect.extend({
  toBeEven(received) {
    const pass = received % 2 === 0;
    if (pass) {
      return {
        message: () => `expected ${received} not to be even`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be even`,
        pass: false,
      };
    }
  },
});

test("custom matcher: toBeEven", () => {
  expect(2).toBeEven(); // Passes because 2 is even
  expect(3).not.toBeEven(); // Passes because 3 is not even
});
```

### **Summary of Assertions in Vitest**

- `expect` is the central function in Vitest assertions, just like in Jest.
- Common matchers include `toBe`, `toEqual`, `toBeTruthy`, `toContain`, `toHaveLength`, etc.
- Async code can be tested using `await` and `resolves` or `rejects` matchers.
- Vitest also supports custom matchers for more advanced assertions.

Now you can effectively use assertions to verify behavior and logic in your Vitest tests for your React application.
