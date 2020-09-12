import React, { useState } from "react";

import { EuiFlexGroup, EuiFlexItem, EuiButtonIcon } from "@elastic/eui";
import { useMutation } from "@apollo/client";

import UPDATE_SERVINGS from "../mutations/updateServings";

export default function RecipeSearch({
  initialServing,
  recipeId,
  setServings,
}) {
  const [numberOfServings, updateNumberOfServings] = useState(initialServing);
  const [updateServings, { loading, error }] = useMutation(UPDATE_SERVINGS);

  const increment = () => {
    let newServing = numberOfServings + 1;
    updateNumberOfServings(newServing);
    updateServings({
      variables: { recipeId: recipeId, numberOfServings: newServing },
    });
    setServings(newServing);
  };

  const decrease = () => {
    let newServing = numberOfServings - 1;
    updateNumberOfServings(newServing);
    updateServings({
      variables: { recipeId: recipeId, numberOfServings: newServing },
    });
    setServings(newServing);
  };

  if (error) return `Error! ${error}`;

  return (
    <EuiFlexGroup gutterSize="s" alignItems="center" wrap>
      <EuiFlexItem grow={false}>{numberOfServings} Servings</EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          isLoading={loading}
          size="s"
          iconType="minusInCircle"
          onClick={() => {
            decrease();
          }}
        />
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          isLoading={loading}
          size="s"
          iconType="plusInCircle"
          onClick={() => {
            increment();
          }}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
