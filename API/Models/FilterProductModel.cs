using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class FilterProductModel
    {
        public int? Category { get; set; }
        public int? FromPrice { get; set; }
        public int? ToPrice { get; set; }
    }
}
