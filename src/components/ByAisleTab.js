import React, { Fragment } from "react";

import { EuiText, EuiSpacer, EuiProgress } from "@elastic/eui";

import { useQuery, useMutation } from "@apollo/client";
import SHOPPING_LIST from "../querys/ShoppingList";
import SHOPPING_LIST_AGGREGATE from "../querys/ShoppingListAggregate";
import TOGGLE_SHOPPING_LIST_ITEM from "../mutations/toggleShoppingListItem";

const itemStyles = {
  item: {
    marginTop: 10,
  },
  isDone: {
    textDecoration: "line-through",
    color: "#86868b",
  },
};

function Aisle({ aisle, items }) {
  const [toggleShoppingList] = useMutation(TOGGLE_SHOPPING_LIST_ITEM);

  const listItems = items.map((item) => (
    <li
      key={item.node.databaseId}
      style={{
        ...itemStyles.item,
        ...(item.node.isDone ? itemStyles.isDone : {}),
      }}
      onClick={() =>
        toggleShoppingList({
          variables: { isAggregate: true, itemId: item.node.databaseId },
          refetchQueries: [
            {
              query: SHOPPING_LIST_AGGREGATE,
            },
            {
              query: SHOPPING_LIST,
            },
          ],
        })
      }
    >
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
