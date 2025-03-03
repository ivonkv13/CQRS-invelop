import { HttpErrorResponse } from "@angular/common/http";

export interface ErrorResponse extends HttpErrorResponse {
    success: boolean;
    message: string;
    errors: ValidationError | [];
    details: string;
}

export interface ValidationError {
    field: string;
    message: string;
}