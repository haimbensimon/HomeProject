using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using API.Data;
using Microsoft.Extensions.Configuration;
using API.Services.Interfaces;
using API.Services;

namespace API
{
     public static class PersistanceExtension
    {
        public static IServiceCollection AddPersistanceLayer(this IServiceCollection services,IConfiguration config)
        {
          
            //services.AddDbContext<MyDbContext>(x => x.UseSqlServer("Server=.;Database=HomeWP;trusted_connection=true"));
            services.AddScoped<ITokenService, TokenService>();

            services.AddDbContext<MyDbContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("Shop"));
            });

            return services;
        }
    }
}