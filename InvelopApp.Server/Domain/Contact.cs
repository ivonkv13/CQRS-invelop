using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace InvelopApp.Server.Domain
{
    public class Contact
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; private set; }

        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public DateTime DateOfBirth { get; private set; }
        public string Address { get; private set; }
        public string PhoneNumber { get; private set; }
        public string IBAN { get; private set; }

        /// <summary>
        /// Required by EF Core when retireving the entity
        /// </summary>
        private Contact() { }

        private Contact(string firstName, string lastName, DateTime dateOfBirth, string address, string phoneNumber, string iban)
        {
            Id = Guid.NewGuid();
            SetFirstName(firstName);
            SetLastName(lastName);
            SetDateOfBirth(dateOfBirth);
            SetAddress(address);
            SetPhoneNumber(phoneNumber);
            SetIBAN(iban);
        }

        public static Contact Create(string firstName, string lastName, DateTime dateOfBirth, string address, string phoneNumber, string iban)
        {
            return new Contact(firstName, lastName, dateOfBirth, address, phoneNumber, iban);
        }

        public void SetFirstName(string firstName)
        {
            if (string.IsNullOrWhiteSpace(firstName))
                throw new ArgumentException("First name is required.");
            FirstName = firstName;
        }

        public void SetLastName(string lastName)
        {
            if (string.IsNullOrWhiteSpace(lastName))
                throw new ArgumentException("Last name is required.");
            LastName = lastName;
        }

        public void SetDateOfBirth(DateTime dateOfBirth)
        {
            if (dateOfBirth >= DateTime.UtcNow)
                throw new ArgumentException("Date of birth must be in the past.");
            DateOfBirth = dateOfBirth;
        }

        public void SetAddress(string address)
        {
            if (string.IsNullOrWhiteSpace(address))
                throw new ArgumentException("Address is required.");
            Address = address;
        }

        public void SetPhoneNumber(string phone)
        {
            if (string.IsNullOrWhiteSpace(phone) || !Regex.IsMatch(phone, @"^\+?[1-9]\d{1,14}$"))
                throw new ArgumentException("Invalid phone number format.");
            PhoneNumber = phone;
        }

        public void SetIBAN(string iban)
        {
            if (string.IsNullOrWhiteSpace(iban) || !Regex.IsMatch(iban, @"^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$"))
                throw new ArgumentException("Invalid IBAN format.");
            IBAN = iban;
        }
    }
}
