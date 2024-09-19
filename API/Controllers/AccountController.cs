using API.Entities;
using API.Models;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        
        private readonly ILogService _logService;
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
       

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ILogService logService,
            ITokenService tokenService)
        {
          
            _logService = logService;
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;  
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<UserDto>> Register(RegisterModel registerModel)
        {
            if (await _logService.UserExists(registerModel.UserName)) return BadRequest("UserName is taken");

            var user = await _logService.Register(registerModel);

            if (user is null) return BadRequest("Register Invalid");

            return new UserDto
            {
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<UserDto>> Login(LoginModel loginModel)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == loginModel.UserName.ToLower());

            if (user == null) return Unauthorized("Invalid user");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginModel.Password, false); 
           
            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };
        }

    }
}
