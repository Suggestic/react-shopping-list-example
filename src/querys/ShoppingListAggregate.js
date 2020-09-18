import { gql } from "@apollo/client";

const SHOPPING_LIST_AGGREGATE = gql`
  query {
    shoppingListAggregate {
      edges {
        node {
          databaseId
          ingredient
          aisleName
          quantity
          unit
          grams
          isDone
          comment
        }
      }
    }
  }
`;

export default SHOPPING_LIST_AGGREGATE;
