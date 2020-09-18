import { gql } from "@apollo/client";

const SHOPPING_LIST = gql`
  query {
    shoppingList {
      edges {
        node {
          ingredient
          quantity
          unit
          isDone
          ingredientLine
          recipeName
          aisleName
          databaseId
          recipeId
          numberOfServings
          comment
          recipeServings
          floatQuantity
        }
      }
    }
  }
`;

export default SHOPPING_LIST;
