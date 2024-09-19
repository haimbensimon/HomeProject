using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using API.Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
       
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
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