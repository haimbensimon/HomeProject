using Microsoft.EntityFrameworkCore;
using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class MyDbContext:IdentityDbContext<AppUser,AppRole,int,
        IdentityUserClaim<int>,AppUserRole,IdentityUserLogin<int>,
         IdentityRoleClaim<int>,IdentityUserToken<int>>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categorys { get; set; }
        
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
            base.OnModelCreating(modelBuilder);
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
                ent.HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
               
            });
            modelBuilder.Entity<AppRole>(ent =>
            {
                ent.HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
            
            });


        }
    }
}