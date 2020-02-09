using HackatonSiigo.SharedEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontHS2020MVC.ViewModels
{
    public class ProductsSearchViewModel
    {
        public List<string> RecentlySearchedProductNames { get; set; }
        public List<Product> SuggestedProducts { get; set; }
        public int MaxSuggestedProducts { get; set; }
        public int MaxProductNamesInSearch { get; set; }
    }
}
