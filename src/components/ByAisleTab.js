import React, { Fragment } from "react";

import { EuiText, EuiSpacer, EuiProgress } from "@elastic/eui";

import { useQuery } from "@apollo/client";
import SHOPPING_LIST_AGGREGATE from "../querys/ShoppingListAggregate";

function Aisle({ aisle, items }) {
  const listItems = items.map((item) => (
    <li key={item.node.databaseId} style={{ marginTop: 10 }}>
      <b>{item.node.ingredient}</b> - {item.node.quantity} {item.node.unit} (
      {item.node.grams.toFixed(1)}) gr
    </li>
  ));
  return (
    <Fragment>
      <EuiSpacer size="m" />
      <EuiText>
        <b>{aisle}</b>
      </EuiText>
      <EuiSpacer size="xs" />
      <ul>{listItems}</ul>
      <EuiSpacer size="m" />
    </Fragment>
  );
}

export default () => {
  const { loading, error, data } = useQuery(SHOPPING_LIST_AGGREGATE);

  if (loading)
    return (
      <div>
        <EuiProgress size="xs" color="accent" />
      </div>
    );

  if (error) return `Error! ${error}`;

  const items = data.shoppingListAggregate.edges;

  let itemsByAisle = items.reduce((r, a) => {
    r[a.node.aisleName] = [...(r[a.node.aisleName] || []), a];
    return r;
  }, {});

  var aisleGroups = Object.keys(itemsByAisle).map(function (key) {
    return (
      <Aisle aisle={key} items={itemsByAisle[key]} key={`aisle-key-${key}`} />
    );
  });

  console.log(aisleGroups);

  return <Fragment>{aisleGroups}</Fragment>;
};
