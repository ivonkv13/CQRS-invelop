import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ContactState } from '../../../../store/contacts/contact.reducer';
import {
  Contact,
  CreateContactRequest,
} from '../../../../../models/contact.model';
import { createContact } from '../../../../store/contacts/contact.actions';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  visible: boolean = false;
  contactForm: FormGroup;
  yesterday: Date = new Date;

  constructor(private fb: FormBuilder, private store: Store<ContactState>) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)],
      ],
      iban: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.yesterday = new Date();
  }

  showDialog() {
    this.contactForm.reset();
    this.visible = true;
  }

  closeDialog() {
    this.contactForm.reset();
    this.visible = false;
  }

  saveContact() {
    if (this.contactForm.valid) {
      let contact: CreateContactRequest = {
        ...this.contactForm.value,
        dateOfBirth: new Date(this.contactForm.value.dateOfBirth),
      };

      this.addContact(contact);
      this.visible = false;
    }
  }

  addContact(contact: CreateContactRequest) {
    this.store.dispatch(createContact({ contact }));
  }
}
