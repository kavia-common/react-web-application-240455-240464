import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders shop brand", () => {
  render(<App />);
  const brand = screen.getByText(/OceanCart/i);
  expect(brand).toBeInTheDocument();
});
