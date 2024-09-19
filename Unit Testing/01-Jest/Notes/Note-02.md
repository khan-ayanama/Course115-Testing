# Testing Asynchrounous

Sure! Let's break it down with simpler examples:

## 1. **Promises**

When you have a function that returns a promise, you can write a test that waits for that promise to resolve before checking the result.

**Example:**

Let's say you have a function `getData` that returns a promise which resolves to the string "chocolate".

```javascript
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("chocolate");
    }, 100);
  });
}

test("the data is chocolate", () => {
  return getData().then((data) => {
    expect(data).toBe("chocolate");
  });
});
```

- **Explanation:** The test waits for the promise returned by `getData()` to resolve. Once resolved, it checks if the result is "chocolate".

### 2. **Async/Await**

`async` and `await` make working with promises easier and more readable.

**Example:**

You can rewrite the above test using `async` and `await`:

```javascript
test("the data is chocolate", async () => {
  const data = await getData();
  expect(data).toBe("chocolate");
});
```

- **Explanation:** Here, the test waits for `getData()` to finish, and then checks if the result is "chocolate".

### 3. **.resolves / .rejects**

These are special matchers that let you work with promises directly in your `expect` statements.

**Example:**

```javascript
test("the data is chocolate", () => {
  return expect(getData()).resolves.toBe("chocolate");
});
```

- **Explanation:** This does the same thing as the previous examples, but in one line! Jest will wait for `getData()` to resolve and then check if the result is "chocolate".

### 4. **Callbacks**

If you have a function that uses a callback instead of a promise, you can use Jest's `done` callback to tell Jest when the test is finished.

**Example:**

Let's say `fetchData` takes a callback that it calls with some data:

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback(null, "ice cream");
  }, 100);
}

test("the data is ice cream", (done) => {
  function callback(error, data) {
    expect(data).toBe("ice cream");
    done(); // Tell Jest the test is complete
  }

  fetchData(callback);
});
```

- **Explanation:** Here, the test doesn't finish until `done()` is called, which happens after `fetchData` calls the `callback`.

### 5. **Handling Errors**

If you expect a promise to be rejected or a callback to report an error, you can handle it with `.catch`, `.rejects`, or using try/catch with `async/await`.

**Example with Async/Await:**

```javascript
async function fetchDataWithError() {
  throw new Error("something went wrong");
}

test("fetch fails with an error", async () => {
  await expect(fetchDataWithError()).rejects.toThrow("something went wrong");
});
```

- **Explanation:** This test waits for the promise to be rejected and checks if the error message is "something went wrong".

### Key Points

- **Return a Promise:** Always return or await the promise in your tests so Jest knows when the test is done.
- **Use `done` for Callbacks:** When testing callbacks, use the `done` parameter to tell Jest when the test is finished.
- **Mix and Match:** You can mix these styles depending on what makes your tests more readable and maintainable.

## Repeatitive Test

Let's break down these Jest concepts with simpler examples to help you understand how to set up and tear down work in your tests.

### Repeating Setup: `beforeEach` and `afterEach`

**Scenario:** Imagine you have a simple in-memory list of cities that you want to test. Before each test, you want to make sure the list is initialized, and after each test, you want to clear the list.

Here's how you'd use `beforeEach` and `afterEach`:

```javascript
let cities = [];

function initializeCityDatabase() {
  cities = ["Vienna", "San Juan"];
}

function clearCityDatabase() {
  cities = [];
}

function isCity(name) {
  return cities.includes(name);
}

beforeEach(() => {
  initializeCityDatabase(); // Set up the city list before each test
});

afterEach(() => {
  clearCityDatabase(); // Clear the city list after each test
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});
```

**Explanation:**

- **beforeEach:** Initializes the city list before each test, ensuring the same starting point.
- **afterEach:** Clears the city list after each test, so no leftover data interferes with the next test.

### One-Time Setup: `beforeAll` and `afterAll`

**Scenario:** Suppose initializing the city database takes a long time, and you only want to do it once before all tests run, rather than before each individual test.

Here's how you'd use `beforeAll` and `afterAll`:

```javascript
let cities = [];

function initializeCityDatabase() {
  return new Promise((resolve) => {
    setTimeout(() => {
      cities = ["Vienna", "San Juan"];
      resolve();
    }, 1000); // Simulate a long initialization process
  });
}

function clearCityDatabase() {
  return new Promise((resolve) => {
    setTimeout(() => {
      cities = [];
      resolve();
    }, 1000); // Simulate a long clearing process
  });
}

beforeAll(() => {
  return initializeCityDatabase(); // Initialize once before all tests
});

afterAll(() => {
  return clearCityDatabase(); // Clear once after all tests
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});
```

**Explanation:**

- **beforeAll:** Runs once before any test starts, making it efficient for long setup processes.
- **afterAll:** Runs once after all tests have completed, cleaning up resources.

### Scoping: Nested `describe` Blocks

**Scenario:** Let's say you also want to test a food database, and the setup for it should only run for specific tests, not for every test in the file.

Here's how you'd use scoped `beforeEach`:

```javascript
let cities = [];
let foods = [];

function initializeCityDatabase() {
  cities = ["Vienna", "San Juan"];
}

function initializeFoodDatabase() {
  foods = ["Wiener Schnitzel", "Mofongo"];
}

beforeEach(() => {
  initializeCityDatabase(); // This runs for all tests
});

describe("City Tests", () => {
  test("city database has Vienna", () => {
    expect(isCity("Vienna")).toBeTruthy();
  });

  test("city database has San Juan", () => {
    expect(isCity("San Juan")).toBeTruthy();
  });
});

describe("Food Tests", () => {
  beforeEach(() => {
    initializeFoodDatabase(); // This runs only for tests in this describe block
  });

  test("Vienna has Wiener Schnitzel", () => {
    expect(isValidCityFoodPair("Vienna", "Wiener Schnitzel")).toBe(true);
  });

  test("San Juan has Mofongo", () => {
    expect(isValidCityFoodPair("San Juan", "Mofongo")).toBe(true);
  });
});
```

**Explanation:**

- **describe:** Organizes related tests together.
- **beforeEach (inside describe):** Runs only for tests within that `describe` block, allowing specific setup.

### Order of Execution

**Scenario:** Understanding how hooks (`beforeAll`, `beforeEach`, `afterEach`, `afterAll`) run can be important, especially when you have nested describe blocks.

```javascript
beforeAll(() => console.log("1 - beforeAll"));
afterAll(() => console.log("1 - afterAll"));
beforeEach(() => console.log("1 - beforeEach"));
afterEach(() => console.log("1 - afterEach"));

test("test 1", () => console.log("1 - test"));

describe("Scoped / Nested block", () => {
  beforeAll(() => console.log("2 - beforeAll"));
  afterAll(() => console.log("2 - afterAll"));
  beforeEach(() => console.log("2 - beforeEach"));
  afterEach(() => console.log("2 - afterEach"));

  test("test 2", () => console.log("2 - test"));
});
```

**Output:**

```plaintext
1 - beforeAll
1 - beforeEach
1 - test
1 - afterEach
2 - beforeAll
1 - beforeEach
2 - beforeEach
2 - test
2 - afterEach
1 - afterEach
2 - afterAll
1 - afterAll
```

**Explanation:**

- Jest runs all describe blocks first (before running any test code).
- It executes `beforeAll` and `afterAll` once per scope (global or within a describe block).
- `beforeEach` and `afterEach` run before and after each test, even within nested describe blocks.

### General Advice

If a test is failing, you can isolate it using `test.only`, which runs just that one test:

```javascript
test.only("this will be the only test that runs", () => {
  expect(true).toBe(false);
});

test("this test will not run", () => {
  expect("A").toBe("A");
});
```

This helps you debug issues without interference from other tests.
