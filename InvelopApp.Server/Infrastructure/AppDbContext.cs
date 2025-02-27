using InvelopApp.Server.Domain;
using Microsoft.EntityFrameworkCore;

namespace InvelopApp.Server.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }

    }
}