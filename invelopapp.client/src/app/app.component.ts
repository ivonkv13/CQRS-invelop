import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Observable, of } from 'rxjs';
import { ContactsService } from '../shared/services/contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'invelopapp.client';
}
