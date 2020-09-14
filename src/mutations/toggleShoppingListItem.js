import { gql } from "@apollo/client";

const TOGGLE_SHOPPING_LIST_ITEM = gql`
  mutation toggleShoppingListItem($isAggregate: Boolean!, $itemId: String!) {
    toggleShoppingListItem(isAggregate: $isAggregate, itemId: $itemId) {
      success
    }
  }
`;

export default TOGGLE_SHOPPING_LIST_ITEM;
