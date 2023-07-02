import { MemoryRouter } from "react-router-dom";

import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { Application } from "../../src/client/Application";

interface renderWithRouterProps {
  initialRoute?: string;
  store?: any;
}

const renderWithRouter = ({
  initialRoute = "/",
  store = createStore(() => ({
    products: {},
    cart: {},
    details: {},
  })),
}: renderWithRouterProps) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Application />
      </MemoryRouter>
    </Provider>
  );
};

export default renderWithRouter;
