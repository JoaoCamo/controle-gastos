using backend_web_api.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_web_api.Data
{
    public class AppDatabaseContext(DbContextOptions<AppDatabaseContext> options) : DbContext(options)
    {
        public DbSet<Person> PersonDbSet { get; set; }
        public DbSet<Category> CategoryDbSet { get; set; }
        public DbSet<Transaction> TransactionDbSet { get; set; }
    }
}