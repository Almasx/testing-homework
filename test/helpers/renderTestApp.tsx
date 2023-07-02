import { MemoryRouter } from "react-router-dom";
import { CartApi, ExampleApi } from "../../src/client/api";

import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { Application } from "../../src/client/Application";
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
