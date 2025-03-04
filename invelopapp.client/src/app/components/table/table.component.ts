import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { Contact } from '../../../models/contact.model';
import { Store } from '@ngrx/store';
import {
  deleteContact,
  loadContacts,
} from '../../store/contacts/contact.actions';
import { ContactState } from '../../store/contacts/contact.reducer';
import { selectAllContacts } from '../../store/contacts/contact.selectors';
import { TableColumn } from '../../../models/table-column.model';
import { AddContactComponent } from './dialogs/add-contact/add-contact.component';
import { UpdateContactComponent } from './dialogs/update-contact/update-contact.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];

  unsubscribe$: Subject<void> = new Subject<void>();

  columns: TableColumn[] = [
    { header: 'First Name', field: 'firstName' },
    { header: 'Last Name', field: 'lastName' },
    { header: 'Date of birth', field: 'dateOfBirth' },
    { header: 'Address', field: 'address' },
    { header: 'Phone number', field: 'phoneNumber' },
    { header: 'IBAN', field: 'iban' },
  ];

  rowsPerPageOptions: number[] = [5, 10, 20];

  @ViewChild('addContactDialog')
  addContactDialogComponent!: AddContactComponent;

  @ViewChild('updateContactDialog')
  updateContactDialogComponent!: UpdateContactComponent;

  selectedContact: Contact | null = null;
  selectedContactForDelete: Contact | null = null;

  constructor(private store: Store<ContactState>) {}

  ngOnInit() {
    this.loadContacts();
    this.subscribeToContacts();
  }

  loadContacts() {
    this.store.dispatch(loadContacts());
  }

  //Listne for store updates
  subscribeToContacts() {
    this.store
      .select(selectAllContacts)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: Contact[]) => {
          this.contacts = data ?? [];
        },
        (error) => {
          console.error('Error fetching contacts:', error);
        }
      );
  }

  deleteContact(contact: Contact) {
    if (!contact || !contact.id) {
      return;
    }
  
    this.store.dispatch(deleteContact({ id: contact.id }));
  }

  openAddContactDialog() {
    if (!this.addContactDialogComponent) {
      return;
    }

    this.addContactDialogComponent.showDialog();
  }

  openUpdateContactDialog(contact: Contact) {
    this.selectedContact = contact || {
      id: '',
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
      address: '',
      phoneNumber: '',
      iban: '',
    };

    if (!this.updateContactDialogComponent) {
      return;
    }

    this.updateContactDialogComponent.showDialog();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
