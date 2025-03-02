export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    address: string;
    phoneNumber: string;
    iban: string;
}

export interface CreateContactRequest {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    address: string;
    phoneNumber: string;
    iban: string;
}