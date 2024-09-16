using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using API.Data;

namespace API
{
     public static class PersistanceExtension
    {
        public static void AddPersistanceLayer(this IServiceCollection services)
        {
          
            services.AddDbContext<MyDbContext>(x => x.UseSqlServer("Server=.;Database=HomeWP;trusted_connection=true"));

        }
    }
}