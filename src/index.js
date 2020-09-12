import React from "react";
import ReactDOM from "react-dom";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import {
  ApolloProvider,
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://production.suggestic.com/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add authorization Bearer token or other headers here
  operation.setContext({
    headers: {
      authorization:
        "Bearer TOKEN_HERE",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
