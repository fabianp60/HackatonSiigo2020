using System;
using System.Linq;
using System.Threading.Tasks;

namespace FontF2HS2020.Data
{
    public class ProductsService
    {
        private static readonly string[] ProductNames = new[]
        {
            "Zapatos", "Ropa", "Celulares", "Computadores", "Medias", "Maletines"
        };

        public Task<string[]> GetProductNamesAsync(string searchText)
        {
            return Task.Run(() => { return ProductNames.Where(pn => pn.StartsWith(searchText)).ToArray(); });
        }

        public Task<string[]> GetProductsNamesAsync()
        {
            return Task.Run(() => { return ProductNames; });
        }
    }
}
