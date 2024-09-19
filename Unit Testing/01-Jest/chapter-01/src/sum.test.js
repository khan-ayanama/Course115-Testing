const mockCallback = jest.fn((x) => 4 + x);

test("forEach mock function", () => {
  expect(mockCallback(5)).toBe(9);
  expect(mockCallback).toHaveBeenCalledWith(5);
});
