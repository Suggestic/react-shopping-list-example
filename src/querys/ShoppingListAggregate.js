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
          servingEquivalent
          aggregateMeta {
            name
            aisle
            grams
            ids
            idsContribution {
              databaseId
              eqv
            }
            qty
            rawQty
          }
        }
      }
    }
  }
`;

export default SHOPPING_LIST_AGGREGATE;
