using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontHS2020MVC.Models
{
    public class AppSettings
    {
        public string WebApiBase { get; set; }
        public string TenantsEndPoint { get; set; }
        public string ProductsEndPoint { get; set; }
        public string CustomersEndPoint { get; set; }
    }
}
