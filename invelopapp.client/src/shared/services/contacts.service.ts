import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Contact, CreateContactRequest } from '../../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private apiUrl = 'https://localhost:7143/api/contacts';

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
      .delete<{ id: string }>(`${this.apiUrl}/Delete/${id}`)
      .pipe(map((response) => response.id));
  }
}
