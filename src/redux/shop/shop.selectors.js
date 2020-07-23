import { createSelector } from 'reselect';

// INPUT SELECTOR
const selectShop = state => state.shop;

// OUTPUT SELECTOR
export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);


export const selectCollectionForPreview = createSelector(
  [selectShopCollections],
  collections => Object.keys(collections).map(key => collections[key])
)

// COLLECTION SELECTOR
export const selectCollection = collectionUrlParam => createSelector(
  [selectShopCollections],
  collections => collections[collectionUrlParam]
);

