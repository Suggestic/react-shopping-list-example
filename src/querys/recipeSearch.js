import { gql } from "@apollo/client";

const RECIPE_SEARCH = gql`
  query recipeSearch($query: String, $first: Int) {
    recipeSearch(query: $query, first: $first) {
      edges {
        node {
          id
          databaseId
          name
        }
      }
    }
  }
`;

export default RECIPE_SEARCH;
