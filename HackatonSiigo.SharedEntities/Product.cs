using System;

namespace HackatonSiigo.SharedEntities
{
    public class Product
    {
        public int Id { get; set; }
        public int Tenant_id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Decimal List_price { get; set; }
    }
}
