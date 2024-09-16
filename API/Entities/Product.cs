using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Desc {get;set;}
        public decimal Price {get;set;}
        public int CategoryId {get;set;}
    }
}