using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<ActionResult<IEnumerable<Category>>> GetAll();

        Task<ActionResult<Category>> GetById(int id);
    }
}
