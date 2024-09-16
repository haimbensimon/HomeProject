using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using API.Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly ICategoryService _service;

        public CategoryController(MyDbContext context, ICategoryService service)
        {
            _context = context;
            _service = service;
        }


        [HttpGet]
        [Route("[action]")]
        public async  Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _service.GetAll();
          
        }
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult<Category>> GetCategorieByID(int id)
        {
            return await _service.GetById(id);
        }
    }
}