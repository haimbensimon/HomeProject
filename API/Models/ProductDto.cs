﻿namespace API.Models
{
    public class ProductDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Desc { get; set; }
        public decimal Price { get; set; }
        public string CategoryDesc { get; set; }
    }
}
