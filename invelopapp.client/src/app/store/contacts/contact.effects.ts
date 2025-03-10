import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ContactActions from './contact.actions';
import {
  catchError,
  exhaustMap,
  map,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { ContactsService } from '../../../shared/services/contacts.service';
import { Contact } from '../../../models/contact.model';
import { ToastrService } from 'ngx-toastr';
import { getFormattedServerError } from '../../../shared/helpers/http-error-helper';

@Injectable()
export class ContactEffects {
  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private toastr: ToastrService
  ) {}

  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.loadContacts),
      switchMap(() =>
        this.contactsService.getAllContacts().pipe(
          map((contacts) => ContactActions.loadContactsSuccess({ contacts })),
          catchError((error) =>
            of(ContactActions.loadContactsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.createContact),
      switchMap(({ contact }) =>
        this.contactsService.createContact(contact).pipe(
          map((createdContact: Contact) => {
            this.toastr.success('Contact created successfully!', 'Success');
            return ContactActions.createContactSuccess({
              contact: createdContact,
            });
          }),
          catchError((error) => {
            this.toastr.error(`Failed to create contact. ${getFormattedServerError(error)}`, 'Error');
            return of(
              ContactActions.createContactFailure({ error: error.message })
            );
          })
        )
      )
    )
  );

  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.updateContact),
      switchMap(({ contact }) =>
        this.contactsService.updateContact(contact.id, contact).pipe(
          map((updatedContact) => {
            this.toastr.success('Contact updated successfully!', 'Success');
            return ContactActions.updateContactSuccess({
              contact: updatedContact,
            });
          }),
          catchError((error) => {
            this.toastr.error(`Failed to update contact. \n ${getFormattedServerError(error)}`, 'Error');
            return of(
              ContactActions.updateContactFailure({ error: error.message })
            );
          })
        )
      )
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.deleteContact),
      exhaustMap(({ id }) =>
        this.contactsService.deleteContact(id).pipe(
          map(() => {
            this.toastr.success('Contact deleted successfully!', 'Success');
            return ContactActions.deleteContactSuccess({ id });
          }),
          catchError((error) => {
            this.toastr.error(`Failed to delete contact! \n ${getFormattedServerError(error)}`, 'Error');
            return of(
              ContactActions.deleteContactFailure({ error: error.message })
            );
          })
        )
      )
    )
  );
}
