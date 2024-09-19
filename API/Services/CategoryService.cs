using API.Data;
using API.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly MyDbContext _context;

        public CategoryService(MyDbContext context)
        {
            _context = context;
        }


        public async Task<ActionResult<IEnumerable<Category>>> GetAll()
        {
            return await _context.Categorys.ToListAsync();
        }

        public async Task<ActionResult<Category>> GetById(int id)
        {
            return await _context.Categorys.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
