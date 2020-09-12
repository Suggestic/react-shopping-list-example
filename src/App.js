import React, { Fragment } from "react";

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiHeader,
  EuiHeaderLinks,
} from "@elastic/eui";

import { Router } from "@reach/router";
import { Link } from "@reach/router";

import Recipes from "./pages/recipes";
import ShoppingList from "./pages/shoppingList";

function App() {
  return (
    <Fragment>
      <EuiHeader>
        <EuiHeaderLinks>
          <Link to="/" className="euiHeaderLink">
            Recipes
          </Link>
          <Link to="shopping-list" className="euiHeaderLink">
            Shopping List
          </Link>
        </EuiHeaderLinks>
      </EuiHeader>

      <EuiPage>
        <EuiPageBody>
          <EuiPageContent>
            <Router>
              <Recipes path="/" />
              <ShoppingList path="shopping-list" />
            </Router>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </Fragment>
  );
}

export default App;
