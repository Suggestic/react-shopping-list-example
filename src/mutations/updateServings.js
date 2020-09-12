import { gql } from "@apollo/client";

const UPDATE_SERVINGS = gql`
mutation updateServings($recipeId: String!, $numberOfServings: Int!) {
    updateShoppingListRecipeServings(
      recipeId: $recipeId
      numberOfServings: $numberOfServings) {
      success
    }
  }
`;

export default UPDATE_SERVINGS;
