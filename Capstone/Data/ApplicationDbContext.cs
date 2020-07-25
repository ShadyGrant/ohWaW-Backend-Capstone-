using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capstone.Models;
using Microsoft.EntityFrameworkCore;

namespace Capstone.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Rating> Rating { get; set; }


    }
}
