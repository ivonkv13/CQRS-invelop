import { Injectable } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { Contact, CreateContactRequest } from '../../models/contact.model';
import { Store } from '@ngrx/store';
import { ContactState } from '../../app/store/contacts/contact.reducer';
import { selectAllContacts } from '../../app/store/contacts/contact.selectors';
import {
  createContact,
  deleteContact,
  loadContacts,
  updateContact,
} from '../../app/store/contacts/contact.actions';

@Injectable({
  providedIn: 'root',
})
export class ContactFacade {
  contacts$: Observable<Contact[]> = this.store.select(selectAllContacts).pipe(
    map(contacts => contacts ?? []), 
    startWith([])
  );

  constructor(private store: Store<ContactState>) {}

  loadContacts(): void {
    this.store.dispatch(loadContacts());
  }

  addContact(contact: CreateContactRequest): void {
    this.store.dispatch(createContact({ contact }));
  }

  updateContact(contact: Contact): void {
    this.store.dispatch(updateContact({ id: contact.id, contact }));
  }

  deleteContact(id: string): void {
    this.store.dispatch(deleteContact({ id }));
  }
}
