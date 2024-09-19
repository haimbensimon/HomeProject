using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Data
{
    public class SeedAdmin
    {
        public static async Task Seed(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync(x => x.UserName == "admin")) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name ="Member"},
                new AppRole{Name ="Admin"},
            };

            foreach (var role in roles)
                await roleManager.CreateAsync(role);

            var admin = new AppUser{UserName = "admin"};

            await userManager.CreateAsync(admin, "ShenHam$04");
            await userManager.AddToRoleAsync(admin, "Admin");

        }
    }
}
