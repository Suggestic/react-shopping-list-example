import { gql } from "@apollo/client";

const CLEAR_SHOPPING_LIST = gql`
mutation {
    clearShoppingList {
      success
    }
  }
`;

export default CLEAR_SHOPPING_LIST;
