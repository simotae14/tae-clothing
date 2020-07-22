import { createSelector } from 'reselect';

// INPUT SELECTOR
const selectDirectory = state => state.directory;

// OUTPUT SELECTOR
export const selectDirectorySections = createSelector(
  [selectDirectory],
  directory => directory.sections
);