import React, { Fragment, useState } from "react";

import { EuiText, EuiSpacer, EuiProgress } from "@elastic/eui";

import { useQuery } from "@apollo/client";
import SHOPPING_LIST from "../querys/ShoppingList";

import UpdateServingButtons from "./UpdateServingButtons";

const itemStyles = {
  item: {
    marginTop: 10,
  },
  isDone: {
    textDecoration: "line-through",
    color: "#86868b",
  },
};

function Recipe({ title, items, recipeServings, recipeId, userServings }) {
  let _servings =
    userServings !== recipeServings ? userServings : recipeServings;
  const [servings, setServings] = useState(_servings);

  const listItems = items.map((item) => {
    let quantity = recipeServings;

    // If user updated original recipe servings
    if (userServings !== recipeServings) {
      quantity = (servings * item.node.quantity) / recipeServings;
    }

    return (
      <li
        key={item.node.databaseId}
        style={{
          ...itemStyles.item,
          ...(item.node.isDone ? itemStyles.isDone : {}),
        }}
      >
        <b>{item.node.ingredientLine}</b> ({quantity.toFixed(1)}{" "}
        {item.node.ingredient} {item.node.unit})
      </li>
    );
  });

  return (
    <Fragment>
      <EuiSpacer size="m" />
      <EuiText>
        <b>{title}</b> {servings}
      </EuiText>

      <UpdateServingButtons
        initialServing={servings}
        recipeId={recipeId}
        setServings={setServings}
      />

      <EuiSpacer size="xs" />
      <ul>{listItems}</ul>
      <EuiSpacer size="xs" />
    </Fragment>
  );
}

export default () => {
  const { loading, error, data } = useQuery(SHOPPING_LIST);

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
