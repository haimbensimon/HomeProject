using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using API.Data;
using Microsoft.Extensions.Configuration;
using API.Services.Interfaces;
using API.Services;
using API.Mapping;
using AutoMapper;

namespace API.Extensions
{
    public static class ApplicationExtension
    {
        public static IServiceCollection AddApplicationLayer(this IServiceCollection services, IConfiguration config)
        {

            //services.AddDbContext<MyDbContext>(x => x.UseSqlServer("Server=.;Database=HomeWP;trusted_connection=true"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<MyDbContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("Shop"));
            });

            return services;
        }
    }
}
