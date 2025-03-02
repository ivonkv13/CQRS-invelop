import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ContactState } from './contact.reducer';

const selectContactState = createFeatureSelector<ContactState>('contacts');

const selectAllContacts = createSelector(
  selectContactState,
  (state) => state.contacts
);

//#region Loading selectrs
const selectAddContactLoading = createSelector(
  selectContactState,
  (state) => state.addLoading
);
const selectUpdateContactLoading = createSelector(
  selectContactState,
  (state) => state.updateLoading
);
const selectDeleteContactLoading = createSelector(
  selectContactState,
  (state) => state.deleteLoading
);
//#endregion

//#region Error selectrs
const selectAddContactError = createSelector(
  selectContactState,
  (state) => state.addError
);
const selectUpdateContactError = createSelector(
  selectContactState,
  (state) => state.updateError
);
const selectDeleteContactError = createSelector(
  selectContactState,
  (state) => state.deleteError
);
//#endregion

export {
  selectContactState,
  selectAllContacts,
  selectAddContactLoading,
  selectUpdateContactLoading,
  selectDeleteContactLoading,
  selectAddContactError,
  selectUpdateContactError,
  selectDeleteContactError,
};
