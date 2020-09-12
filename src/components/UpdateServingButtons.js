import React, { useState, useEffect } from "react";

import { EuiFlexGroup, EuiFlexItem, EuiButton } from "@elastic/eui";
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
    updateNumberOfServings(numberOfServings + 1);
    updateServings({
      variables: { recipeId: recipeId, numberOfServings: numberOfServings },
    });
  };

  const decrease = () => {
    updateNumberOfServings(numberOfServings - 1);
    updateServings({
      variables: { recipeId: recipeId, numberOfServings: numberOfServings },
    });
  };

  useEffect(() => {
    setServings(numberOfServings);
  }, [numberOfServings, setServings]);

  return (
    <EuiFlexGroup gutterSize="s" alignItems="center" wrap>
      <EuiFlexItem grow={false}>
        <EuiButton
          isLoading={loading}
          size="s"
          onClick={() => {
            decrease();
          }}
        >
          -
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          isLoading={loading}
          size="s"
          onClick={() => {
            increment();
          }}
        >
          +
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
