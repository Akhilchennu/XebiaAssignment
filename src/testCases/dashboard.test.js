
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Dashboard from "../pages/dashboard";

const mockStore = configureMockStore();
const store = mockStore({loginSession: false,userName:''});

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("renders Logout button", () => {
  act(() => {
    render(<Provider store={store}><Dashboard /></Provider>, container);
  });
  expect(container.querySelector("[test-button='logout']").textContent).toBe('Logout');

});

it("renders search component", () => {
  act(() => {
    render(<Provider store={store}><Dashboard /></Provider>, container);
  });
  expect(container.querySelector("[name='searchInput']").getAttribute('id')).toBe("searchInput");
  expect(container.querySelector("[name='searchInput']").getAttribute('type')).toBe("text");
});

