import { render, screen } from "@testing-library/react";
import App from "./App";
import { test, expect } from "vitest";

test("Testing first react", () => {
  render(<App />);
  const linkComponent = screen.getByText(/Hello World/i);
  expect(linkComponent).toBeInTheDocument();
});
