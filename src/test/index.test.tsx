import React from "react";
import { render } from "@testing-library/react";
import Button from "../helper/Button";
import Card from "../helper/Card";
import Error from "../helper/Error";

describe("Button test", () => {
  test("Button renders without errors when text is Select", () => {
    render(<Button disabled={false} text="Select" />);
  });
  test("Button renders without errors when text is Remove", () => {
    render(<Button disabled={false} text="Remove" />);
  });
});

describe("Card test", () => {
  const event = {
    event_category: "Swimming",
    event_name: "Butterfly 100M",
    start_time: "string",
    end_time: "string",
    id: 1,
    selectedEvents: [],
    events: []
  };

  test("Card renders without errors when notSelected is true", () => {
    render(<Card event={event} notSelected={true} onClickBtn={() => {}} />);
  });
  test("Card renders without when notSelected is false", () => {
    render(<Card event={event} notSelected={false} onClickBtn={() => {}} />);
  });
});

describe("Error test", () => {
  test("Error renders", () => {
    render(<Error />);
  });
});
