using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly MyDbContext _context;
       

        public ProductController(MyDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task AddProduct(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task RemoveProduct(int id)
        {
            var ent = _context.Products.FirstOrDefaultAsync(p => p.Id == id).Result;
            _context.Products.Remove(ent);
            await _context.SaveChangesAsync();
        }
    }
}