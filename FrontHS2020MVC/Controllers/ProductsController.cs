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


        public ProductsController(ILogger<ProductsController> logger, IOptions<AppSettings> appSettings)
        {
            _logger = logger;
            _appSettings = appSettings.Value;
        }
        // GET: Products
        public ActionResult Search()
        {
            ProductsSearchViewModel viewModel = new ProductsSearchViewModel
            {
                MaxProductNamesInSearch = 5,
                MaxSuggestedProducts = 4,
                RecentlySearchedProductNames = new List<string>(),
                SuggestedProducts = new List<Product>()
            };
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