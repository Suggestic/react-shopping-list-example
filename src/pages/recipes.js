import React, { Fragment } from "react";

import {
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
} from "@elastic/eui";

import RecipeSearch from "../components/RecipeSearch";

function Recipes() {
  return (
    <Fragment>
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Add recipe to shopping list</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageContentHeader>
      <EuiPageContentBody>
        <RecipeSearch />
      </EuiPageContentBody>
    </Fragment>
  );
}

export default Recipes;
