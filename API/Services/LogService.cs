using API.Entities;
using API.Models;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Services
{
    public class LogService : ILogService
    {
       
        private readonly UserManager<AppUser> _userManager;
        
        public LogService(UserManager<AppUser> userManager)
        {
            _userManager = userManager; 
        }
        public async Task<AppUser> Register(RegisterModel model)
        {
           
            var user = new AppUser
            {
                UserName = model.UserName.ToLower(),
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            
            if (!result.Succeeded) return null;
           
            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return null;

            return user;
        }

        public async Task<bool> UserExists(string userName)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == userName.ToLower());
        }
    }
}
