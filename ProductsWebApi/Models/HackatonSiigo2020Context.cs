using HackatonSiigo.SharedEntities;
using Microsoft.EntityFrameworkCore;

namespace ProductsWebApi.Models
{
    public class HackatonSiigo2020Context : DbContext
    {
        public HackatonSiigo2020Context(DbContextOptions<HackatonSiigo2020Context> options) : base(options)
        {
        }

        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }

    }
}
