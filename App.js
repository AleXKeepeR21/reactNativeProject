import React from "react";
import {} from "react-native";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import Main from "./Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
