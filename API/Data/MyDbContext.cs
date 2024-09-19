using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Data
{
    public class MyDbContext:DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categorys { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }

        public MyDbContext()
        {
            
        }
        public MyDbContext(DbContextOptions<MyDbContext> options):base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Shop");
             
            }
        }

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(ent =>
            {
                ent.ToTable("Products");
                ent.HasKey(p => p.Id);
                ent.Property(p => p.Id).ValueGeneratedOnAdd();
                ent.Property(p => p.Id).HasColumnName("ID");
                ent.Property(p => p.Desc).HasColumnName("DESC");
                ent.Property(p => p.Price).HasColumnName("PRICE");
                ent.Property(p => p.CategoryId).HasColumnName("CATEGORY_ID");
            });

             modelBuilder.Entity<Category>(ent =>
            {
                ent.ToTable("Categories");
                ent.HasKey(p => p.Id);
                ent.Property(p => p.Id).ValueGeneratedNever();
                ent.Property(p => p.Id).HasColumnName("ID");
                ent.Property(p => p.Desc).HasColumnName("DESC");
            });

            modelBuilder.Entity<AppUser>(ent =>
            {
                ent.ToTable("AppUsers");
                ent.HasKey(p => p.Id);
                ent.Property(p => p.Id).ValueGeneratedOnAdd();
                ent.Property(p => p.Id).HasColumnName("ID");
                ent.Property(p => p.UserName).HasColumnName("USER_NAME");
                ent.Property(p => p.PasswordHash).HasColumnName("PASSWORD_HASH");
                ent.Property(p => p.PasswordSalt).HasColumnName("PASSWORD_SALT");
            });



        }
    }
}