import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact, CreateContactRequest } from '../../models/contact.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private apiUrl = `${environment.apiBaseUrl}/contacts`;

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/GetAll`);
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/GetById/${id}`);
  }

  createContact(contact: CreateContactRequest): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/Create`, contact);
  }

  updateContact(id: string, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/Update/${id}`, contact);
  }

  deleteContact(id: string): Observable<string> {
    return this.http
      .delete<string>(`${this.apiUrl}/Delete/${id}`);
  }
}
