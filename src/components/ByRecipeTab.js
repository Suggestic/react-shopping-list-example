import React, { Fragment, useState } from "react";

import { EuiText, EuiSpacer, EuiProgress, EuiToolTip } from "@elastic/eui";

import { useQuery } from "@apollo/client";
import SHOPPING_LIST from "../querys/ShoppingList";

import UpdateServingButtons from "./UpdateServingButtons";

const itemStyles = {
  item: {
    marginTop: 13,
  },
  isDone: {
    textDecoration: "line-through",
    color: "#86868b",
  },
};

function Recipe({ title, items, recipeServings, recipeId, userServings }) {
  const [servings, setServings] = useState(userServings);

  const listItems = items.map((item) => {
    let quantity = item.node.floatQuantity;

    // If user updated original recipe servings
    if (servings !== recipeServings) {
      quantity = (servings * quantity) / recipeServings;
    }

    return (
      <li
        key={item.node.databaseId}
        style={{
          ...itemStyles.item,
          ...(item.node.isDone ? itemStyles.isDone : {}),
        }}
      >
        <EuiToolTip position="right" content={item.node.ingredientLine}>
          <Fragment>
            <b>{item.node.ingredient}</b> {quantity.toFixed(1)} {item.node.unit}
          </Fragment>
        </EuiToolTip>
      </li>
    );
  });

  return (
    <Fragment>
      <EuiSpacer size="m" />
      <EuiText>
        <b>{title}</b>
      </EuiText>

      <UpdateServingButtons
        initialServing={servings}
        defaultServings={servings === recipeServings}
        recipeId={recipeId}
        setServings={setServings}
      />

      <EuiSpacer size="m" />
      <ul>{listItems}</ul>
      <EuiSpacer size="xs" />
    </Fragment>
  );
}

export default () => {
  const { loading, error, data } = useQuery(SHOPPING_LIST, {
    fetchPolicy: "network-only",
  });

  if (loading)
    return (
      <div>
        <EuiProgress size="xs" color="accent" />
      </div>
    );

  if (error) return `Error! ${error}`;

  const items = data.shoppingList.edges;

  let itemsByRecipe = items.reduce((r, a) => {
    r[a.node.recipeId] = [...(r[a.node.recipeId] || []), a];
    return r;
  }, {});

  var recipes = Object.keys(itemsByRecipe).map(function (key) {
    let recipeNode = itemsByRecipe[key][0].node;
    return (
      <Recipe
        title={recipeNode.recipeName}
        recipeServings={recipeNode.recipeServings}
        userServings={recipeNode.numberOfServings}
        recipeId={recipeNode.recipeId}
        items={itemsByRecipe[key]}
        key={`aisle-key-${key}`}
      />
    );
  });

  return <Fragment>{recipes}</Fragment>;
};
