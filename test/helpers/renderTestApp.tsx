import { render } from "@testing-library/react";
import { basename } from "path";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Application } from "../../src/client/Application";
import { Cart } from "../../src/client/pages/Cart";
import { Catalog } from "../../src/client/pages/Catalog";
import { Contacts } from "../../src/client/pages/Contacts";
import { Delivery } from "../../src/client/pages/Delivery";
import { Home } from "../../src/client/pages/Home";
import { Product } from "../../src/client/pages/Product";
import { initStore } from "../../src/client/store";

interface renderTestAppProps {
  initialRoute?: string;
}

const renderTestApp = ({ initialRoute = "/" }: renderTestAppProps) => {
  const basename = "/hw/store";

  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Application />
      </MemoryRouter>
    </Provider>
  );
};

export default renderTestApp;
