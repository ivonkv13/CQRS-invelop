import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../../../../models/contact.model';
import { Store } from '@ngrx/store';
import { ContactState } from '../../../../store/contacts/contact.reducer';
import { updateContact } from '../../../../store/contacts/contact.actions';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.css',
})
export class UpdateContactComponent implements OnChanges {
  @Input() contact: Contact | null = null;

  visible: boolean = false;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<ContactState>) {
    this.contactForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [
        this.contact?.dateOfBirth.getUTCFullYear,
        Validators.required,
      ],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      iban: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact'] && this.contact) {
      this.contactForm.patchValue({
        ...this.contact,
        dateOfBirth: this.formatDate(this.contact.dateOfBirth) // ✅ Convert to YYYY-MM-DD format
      });
      this.showDialog();
    }
  }

  updateContact(contact: Contact) {
    this.store.dispatch(updateContact({ id: contact.id, contact }));
  }

  showDialog() {
    this.visible = true;
  }

  saveContact() {
    if (this.contactForm.valid) {
      this.updateContact(this.contactForm.value);
      this.visible = false;
    } else {
      return; 
    }
  }

  closeDialog() {
    this.visible = false;
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
  
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // ✅ Converts to YYYY-MM-DD
  }
}
