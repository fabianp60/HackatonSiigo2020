namespace ProductsWebApi.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public int Tenant_id { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
    }
}
