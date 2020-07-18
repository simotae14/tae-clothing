import { createSelector } from 'reselect';

// INPUT SELECTOR
const selectUser = state => state.user;

// OUTPUT SELECTOR
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);