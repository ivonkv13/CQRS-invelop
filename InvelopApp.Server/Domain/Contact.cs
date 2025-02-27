using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InvelopApp.Server.Domain
{
    public class Contact
    {
        /*
        first name
        surname
        D.O.B
        address
        phone number
        IBAN    
        */

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        
        [Required(AllowEmptyStrings = false)]
        public required string FirstName { get; set; }
        
        [Required(AllowEmptyStrings = false)]
        public required string LastName{ get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string IBAN { get; set; }
    }
}
