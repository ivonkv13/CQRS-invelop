import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from '../../../models/contact.model';
import { TableColumn } from '../../../models/table-column.model';
import { AddContactComponent } from './dialogs/add-contact/add-contact.component';
import { UpdateContactComponent } from './dialogs/update-contact/update-contact.component';
import { ContactFacade } from '../../../shared/facades/contact.facade';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  contacts$: Observable<Contact[]>;

  unsubscribe$: Subject<void> = new Subject<void>();

  columns: TableColumn<Contact>[] = [
    { header: 'First Name', field: 'firstName' },
    { header: 'Last Name', field: 'lastName' },
    { header: 'Date of Birth', field: 'dateOfBirth' },
    { header: 'Address', field: 'address' },
    { header: 'Phone Number', field: 'phoneNumber' },
    { header: 'IBAN', field: 'iban' },
  ];

  rowsPerPageOptions: number[] = [5, 10, 20];

  @ViewChild('addContactDialog')
  addContactDialogComponent!: AddContactComponent;

  @ViewChild('updateContactDialog')
  updateContactDialogComponent!: UpdateContactComponent;

  selectedContact: Contact | null = null;

  constructor(private contactFacade: ContactFacade) {
    this.contacts$ = this.contactFacade.contacts$;
  }

  ngOnInit() {
    this.contactFacade.loadContacts();
  }

  deleteContact(contact: Contact): void {
    if (contact?.id) {
      this.contactFacade.deleteContact(contact.id);
    }
  }

  openAddContactDialog(): void {
    this.addContactDialogComponent?.showDialog();
  }

  openUpdateContactDialog(contact: Contact): void {
    this.selectedContact = contact;
    this.updateContactDialogComponent?.showDialog();
  }
}
