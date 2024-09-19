using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Models;
using API.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICategoryService _categoryService;
        public ProductController(MyDbContext context, IMapper mapper, ICategoryService categoryService)
        {
            _context = context;
            _mapper = mapper;
            _categoryService = categoryService;
        }


        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAllProducts()
        {
            var products = await _context.Products.ToListAsync();

            var mapped = _mapper.Map<List<ProductDto>>(products);
            foreach (var item in mapped)
            {
                item.CategoryDesc = _categoryService.GetById(item.CategoryId).Result.Value.Desc;
            }

            return Ok(mapped);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> AddProduct(Product product)
        {
            var ent = _context.Products.FirstOrDefaultAsync(p => p.Desc == product.Desc).Result;
            if (ent is not null)
                return Ok("Product Exists");

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult> RemoveProduct(int id)
        {
            var ent = _context.Products.FirstOrDefaultAsync(p => p.Id == id).Result;
            if (ent is null)
                return Ok("Product not found");

            _context.Products.Remove(ent);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> FilterProducts(FilterProductModel filter)
        {
            var products = await _context.Products.ToListAsync();
            products = filter.Category.HasValue 
                ? products.Where(x => x.CategoryId == filter.Category.Value).ToList() 
                : products.ToList();

            products = filter.FromPrice.HasValue
                ? products.Where(x => x.Price >= filter.FromPrice.Value).ToList()
                : products.ToList();

            products = filter.ToPrice.HasValue
                ? products.Where(x => x.Price <= filter.ToPrice.Value).ToList()
                : products.ToList();

            var mapped = _mapper.Map<List<ProductDto>>(products);
            foreach (var item in mapped)
            {
                item.CategoryDesc = _categoryService.GetById(item.CategoryId).Result.Value.Desc;
            }

            return Ok(mapped);
        }
    }
}