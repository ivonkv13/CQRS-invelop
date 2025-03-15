using InvelopApp.Server.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InvelopApp.Server.Infrastructure
{
    public class ContactEntityTypeConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.ToTable("Contacts");

            builder.HasKey(c => c.Id);

            builder
                .Property(c => c.Id)
                .IsRequired()
                .ValueGeneratedOnAdd();

            builder
                .Property(c => c.FirstName)
                .IsRequired();

            builder
                .Property(c => c.LastName)
                .IsRequired();

            builder
                .Property(c => c.DateOfBirth)
                .IsRequired();

            builder
                .Property(c => c.Address)
                .IsRequired();

            builder
                .Property(c => c.PhoneNumber)
                .IsRequired();

            builder
                .Property(c => c.IBAN)
                .IsRequired();


        }
    }
}
