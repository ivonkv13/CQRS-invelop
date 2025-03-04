import { ErrorResponse, ValidationError } from "../../models/error-response";

export function getFormattedServerError(error: ErrorResponse): string {
    switch (error.status) {
      case 400:
        const errorsArray = error.error?.Errors as Array<ValidationError>;

        const errorMessages = errorsArray.map(
          (err) => err.message || JSON.stringify(err)
        );
        const formattedErrors = errorMessages.join('\n ');
        return formattedErrors;

      case 500: 
        return "There was an error with your request";

      default:
        return "There was an error with your request";
    }
  }