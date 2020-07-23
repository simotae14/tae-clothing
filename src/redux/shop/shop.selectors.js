import { createSelector } from 'reselect';

// INPUT SELECTOR
const selectShop = state => state.shop;

// OUTPUT SELECTOR
export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// COLLECTION SELECTOR
export const selectCollection = collectionUrlParam => createSelector(
  [selectShopCollections],
  collections => collections[collectionUrlParam]
);