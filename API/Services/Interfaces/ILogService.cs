using API.Entities;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.Interfaces
{
    public interface ILogService
    {
        Task<AppUser> Register(RegisterModel model);

        Task<bool> UserExists(string userName);
    }
}
