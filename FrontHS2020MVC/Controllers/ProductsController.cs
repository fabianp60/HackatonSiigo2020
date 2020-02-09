using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrontHS2020MVC.Models;
using FrontHS2020MVC.Utils;
using FrontHS2020MVC.ViewModels;
using HackatonSiigo.SharedEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FrontHS2020MVC.Controllers
{
    [Authorize]
    public class ProductsController : Controller
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly AppSettings _appSettings;
        private readonly string SessionKeyProductSearchData;


        public ProductsController(ILogger<ProductsController> logger, IOptions<AppSettings> appSettings)
        {
            _logger = logger;
            _appSettings = appSettings.Value;
            SessionKeyProductSearchData = "_productSearchData";
        }
        // GET: Products
        public ActionResult Search()
        {
            // TODO: Se podria hacer un ranking de los productos más visitados que cruzan con el nombre de producto más buscado por el usuario
            // usar cache para data del usuario
            // usar cache para la data para todos los usuarios
            ProductsSearchViewModel viewModel = HttpContext.Session.Get<ProductsSearchViewModel>(SessionKeyProductSearchData);
            if (viewModel == null)
            {
                // Inicializar los datos
                viewModel = new ProductsSearchViewModel
                {
                    MaxProductNamesInSearch = 5,
                    MaxSuggestedProducts = 4,
                    RecentlySearchedProductNames = new List<string>() { "Tenis", "Smartphones" },
                    SuggestedProducts = new List<Product>() {
                        new Product() { Id = 1, Tenant_id = 1, Name = "Tenis", Description = "Tenis para deporte", List_price = 235000.25M },
                        new Product() { Id = 4, Tenant_id = 1, Name = "Camisetas", Description = "Camisetas para cualquier deporte", List_price = 35000.25M },
                        new Product() { Id = 7, Tenant_id = 3, Name = "Celulares", Description = "Celular gama media", List_price = 850000.35M },
                        new Product() { Id = 5, Tenant_id = 2, Name = "Camisetas", Description = "Camisetas para runnig", List_price = 45000.50M }
                    }
                };
                HttpContext.Session.Set<ProductsSearchViewModel>(SessionKeyProductSearchData, viewModel);
            }

            return View(viewModel);
        }

        // GET: Products/Details/5
        public ActionResult MasiveUpload()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult<object>> AsyncPostProduct(Product product)
        {
            WebApiClient apiClient = new WebApiClient();
            string requestUri = _appSettings.WebApiBase + _appSettings.ProductsEndPoint;
            // TODO: Cliente para el web api
            return await apiClient.MakeAsyncPost(requestUri, product);
        }

        // GET: Products/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Products/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Products/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Products/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Products/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Products/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}