import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ContactActions from './contact.actions';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { ContactsService } from '../../../shared/services/contacts.service';
import { Contact, CreateContactRequest } from '../../../models/contact.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse, ValidationError } from '../../../models/error-response';

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
            this.toastr.error(`Failed to create contact. ${this.getFormattedServerError(error)}`, 'Error');
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

            this.toastr.error(`Failed to update contact. \n ${this.getFormattedServerError(error)}`, 'Error');
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
            this.toastr.error(`Failed to delete contact! \n ${this.getFormattedServerError(error)}`, 'Error');
            return of(
              ContactActions.deleteContactFailure({ error: error.message })
            );
          })
        )
      )
    )
  );

  getFormattedServerError(error: ErrorResponse): string {
    switch (error.status) {
      case 400:
        const errorsArray = error.error?.Errors as Array<ValidationError>;

        const errorMessages = errorsArray.map(
          (err) => err.message || JSON.stringify(err)
        );
        const formattedErrors = errorMessages.join('\n ');
        return formattedErrors;

      case 500: 
        return "There was an error with your request";

      default:
        return "There was an error with your request";
    }
  }
}
