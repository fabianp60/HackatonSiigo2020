using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FrontHS2020MVC.Utils
{
    public class WebApiClient
    {
        // TODO: Agregar autenticación
        //
        // Se construye este wrapper para realizar los procesos de autenticación del servicio para todas las 
        // conexiones a las web api externas
        #region Propiedades

        HttpClient httpClient = new HttpClient();

        #endregion

        #region Metodos

        public async Task<HttpResponseMessage> MakeAsyncPost(string requestUri, object content)
        {
            var postContent = new StringContent(JsonSerializer.Serialize(content), Encoding.UTF8, "application/json");
            return await httpClient.PostAsync(requestUri, postContent);
        }

        #endregion
    }
}
