using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProductsWebApi.Models;

namespace ProductsWebApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ILogger<ProductsController> _logger;
        private ConcurrentBag<Product> products = new ConcurrentBag<Product>();

        public ProductsController(ILogger<ProductsController> logger)
        {
            _logger = logger;
        }

        // GET: api/Products
        [HttpGet]
        public List<Product> Get()
        {
            return products.ToList();
        }

        // GET: api/Products/5
        [HttpGet("{id}", Name = "Get")]
        public Product Get(int id)
        {
            return products.Where(p => p.Id == id).FirstOrDefault();
        }

        // POST: api/Products
        [HttpPost]
        public void Post([FromBody] Product value)
        {
            products.Add(value);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Product value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
