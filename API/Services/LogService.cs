using API.Data;
using API.Entities;
using API.Models;
using API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class LogService : ILogService
    {
        private readonly MyDbContext _context;

        public LogService(MyDbContext context)
        {
            _context = context;
        }
        public async Task<AppUser> Register(RegisterModel model)
        {
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = model.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(model.Password)),
                PasswordSalt = hmac.Key
            };

            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> UserExists(string userName)
        {
            return await _context.AppUsers.AnyAsync(x => x.UserName == userName.ToLower());
        }
    }
}
