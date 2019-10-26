
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Login from "../pages/Login";

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

it("renders header", () => {
  act(() => {
    render(<Provider store={store}><Login /></Provider>, container);
  });
  expect(container.querySelector("[test-header='header']").textContent).toBe('Login to search planets');

});
it("render username field", () => {
    act(() => {
      render(<Provider store={store}><Login /></Provider>, container);
    });
    expect(container.querySelector("[name='userName']").getAttribute('type')).toBe("text");
    expect(container.querySelector("[name='userName']").getAttribute('id')).toBe("userName");
  
  });
  it("render password field", () => {
    act(() => {
      render(<Provider store={store}><Login /></Provider>, container);
    });
    expect(container.querySelector("[name='password']").getAttribute('type')).toBe("password");
    expect(container.querySelector("[name='password']").getAttribute('id')).toBe("password");
  });
  it("render button", () => {
    act(() => {
      render(<Provider store={store}><Login /></Provider>, container);
    });
    expect(container.querySelector("[test-button='button']").textContent).toBe("LogIn");
  });
