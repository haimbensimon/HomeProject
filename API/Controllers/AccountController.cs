using API.Data;
using API.Entities;
using API.Models;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly ILogService _logService;
        private readonly ITokenService _tokenService;

        public AccountController(MyDbContext context, ILogService logService, ITokenService tokenService)
        {
            _context = context;
            _logService = logService;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<UserDto>> Register(RegisterModel registerModel)
        {
            if (await _logService.UserExists(registerModel.UserName)) return BadRequest("UserName is taken");

            var user = await _logService.Register(registerModel);

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<UserDto>> Login(LoginModel loginModel)
        {
            var user = await _context.AppUsers.SingleOrDefaultAsync(x => x.UserName == loginModel.UserName.ToLower());

            if (user == null) return Unauthorized("Invalid user");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginModel.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

    }
}
