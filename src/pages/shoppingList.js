import React, { Fragment } from "react";

import {
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from "@elastic/eui";

import { useMutation } from "@apollo/client";

import ShoppingListTabs from "../components/ShoppingListTabs";

import CLEAR_SHOPPING_LIST from "../mutations/clearShoppingList";
import SHOPPING_LIST from "../querys/ShoppingList";
import SHOPPING_LIST_AGGREGATE from "../querys/ShoppingListAggregate";

function ShoppingList() {
  const [clearShoppingList] = useMutation(CLEAR_SHOPPING_LIST);

  return (
    <Fragment>
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Shopping List</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageContentHeader>
      <EuiPageContentBody>
        <ShoppingListTabs />
        <EuiSpacer size="m" />
        <EuiFlexGroup gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton
              onClick={() =>
                clearShoppingList({
                  refetchQueries: [
                    {
                      query: SHOPPING_LIST,
                    },
                    {
                      query: SHOPPING_LIST_AGGREGATE,
                    },
                  ],
                })
              }
            >
              Clear Entire Shopping List
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContentBody>
    </Fragment>
  );
}

export default ShoppingList;
