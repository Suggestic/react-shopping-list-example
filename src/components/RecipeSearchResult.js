import React from "react";

import { EuiProgress, EuiBasicTable, EuiButtonIcon } from "@elastic/eui";

import { useQuery, useMutation } from "@apollo/client";

import RECIPE_SEARCH from "../querys/RecipeSearch";
import SHOPPING_LIST_AGGREGATE from "../querys/ShoppingListAggregate";
import ADD_TO_SHOPPING_LIST from "../mutations/addToShoppinList";

export default function Meals({ query }) {
  const { loading, error, data } = useQuery(RECIPE_SEARCH, {
    variables: { query: query, first: 10 },
  });
  const [addToShoppinList] = useMutation(ADD_TO_SHOPPING_LIST);

  if (loading)
    return (
      <div>
        <EuiProgress size="xs" color="accent" />
      </div>
    );

  if (error) return `Error! ${error}`;

  const columns = [
    {
      field: "node.name",
      name: "name",
    },
    {
      field: "node",
      name: null,
      render: (recipe) => {
        return (
          <EuiButtonIcon
            aria-label="Add"
            color="primary"
            iconType="listAdd"
            onClick={() =>
              addToShoppinList({
                variables: { recipeId: recipe.databaseId },
                refetchQueries: [
                  {
                    query: SHOPPING_LIST_AGGREGATE,
                  },
                ],
              })
            }
          ></EuiButtonIcon>
        );
      },
    },
  ];

  const getRowProps = (item) => {
    const { id } = item.node;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
    };
  };

  const getCellProps = (item, column) => {
    const { id } = item;
    const { field } = column;
    return {
      className: "customCellClass",
      "data-test-subj": `cell-${id}-${field}`,
      textOnly: true,
    };
  };

  return (
    <EuiBasicTable
      compressed={true}
      items={data.recipeSearch.edges}
      rowHeader="-"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
    />
  );
}
