import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { Application } from "../../src/client/Application";
import { Cart } from "../../src/client/pages/Cart";
import { Catalog } from "../../src/client/pages/Catalog";
import { Contacts } from "../../src/client/pages/Contacts";
import { Delivery } from "../../src/client/pages/Delivery";
import { Home } from "../../src/client/pages/Home";
import { Product } from "../../src/client/pages/Product";

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
