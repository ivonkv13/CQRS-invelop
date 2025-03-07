import { createReducer, on } from '@ngrx/store';
import * as ContactActions from './contact.actions';
import { Contact } from '../../../models/contact.model';

export interface ContactState {
  contacts: Contact[];
  addLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  addError: string | null;
  updateError: string | null;
  deleteError: string | null;
}

const initialState: ContactState = {
  contacts: [],
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  addError: null,
  updateError: null,
  deleteError: null,
};

export const contactReducer = createReducer(
  initialState,

  // Load Contact
  on(ContactActions.loadContacts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ContactActions.loadContactsSuccess, (state, { contacts }) => ({
    ...state,
    contacts,
    loading: false,
    error: null,
  })),
  on(ContactActions.loadContactsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Contact
  on(ContactActions.createContact, (state) => ({
    ...state,
    loading: true,
  })),
  on(ContactActions.createContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
    loading: false,
    error: null,
  })),
  on(ContactActions.createContactFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Contact
  on(ContactActions.updateContact, (state) => ({
    ...state,
    loading: true,
  })),
  on(ContactActions.updateContactSuccess, (state, { contact }) => {
    return {
      ...state,
      contacts: state.contacts.map((c) =>
        c.id === contact.id ? { ...c, ...contact } : c
      ),
      loading: false,
    };
  }),
  on(ContactActions.updateContactFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Contact
  on(ContactActions.deleteContact, (state, { id }) => ({
    ...state,
    loading: true,
  })),
  on(ContactActions.deleteContactSuccess, (state, { id }) => {
    return {
      ...state,
      contacts: state.contacts.filter((c) => c.id !== id),
      loading: false,
      error: null,
    };
  }),
  on(ContactActions.deleteContactFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
