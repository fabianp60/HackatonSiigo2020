function SearchProductsFrontControl() {
	this.InitLocalDB();
	this.InitControl();
	this.GetInitialData();
	this.InitDynamicControls();
	this.InitEventListeners();
}

SearchProductsFrontControl.prototype.GetInitialData = function () {
	// conectar el servicio para las sugerencias iniciales
	this._suggestions = this.GetSuggestionsFromAPI();
};

SearchProductsFrontControl.prototype.InitControl = function () {
	this._inputSearch = document.getElementById('searchText');
	this._maxSuggestedItems = parseInt(this._inputSearch.dataset.maxSuggestedItems);
	this._searchButton = document.getElementById("search-products-button");
	this._tbodyForResults = document.getElementById("search-prods-result");
};

SearchProductsFrontControl.prototype.InitDynamicControls = function () {
	this._tagifySearchControl = new Tagify(this._inputSearch, {
		whitelist: this._suggestions,
		dropdown: {
			enabled: 0,
			maxItems: this._maxSuggestedItems,
			closeOnSelect: false
		},
		enforceWhitelist: true
	});
};

SearchProductsFrontControl.prototype.InitEventListeners = function () {
	this._searchButton.addEventListener('click', this.OnSearchEvent.bind(this));
};

SearchProductsFrontControl.prototype.GetSuggestionsFromAPI = function () {
	return this._localDB.fullSuggestions.slice(0, this._maxSuggestedItems);
};

SearchProductsFrontControl.prototype.OnSearchEvent = function () {
	let filteredProducts = null;
	if (this._inputSearch.value.length > 0) {
		let valuesToSearch = JSON.parse(this._inputSearch.value).map((x) => { return x.value; });

		filteredProducts = this._localDB.fullProducts.filter(function (prod) {
			return valuesToSearch.includes(prod.name);
		}.bind(this));
	}

	this._tbodyForResults.innerHTML = "";
	if (filteredProducts != null) {
		filteredProducts.forEach(function (prod) {
			this._tbodyForResults.innerHTML += this.GetTableRowTemplate(prod);
		}.bind(this));
	}
};

SearchProductsFrontControl.prototype.GetTableRowTemplate = function (rowData) {
	return `<tr>
				<td>${rowData.tenant_id}</td>
				<td>${rowData.name}</td>
				<td>${rowData.description}</td>
				<td>${rowData.list_price}</td>
			</tr>`;
};

SearchProductsFrontControl.prototype.GetProductsByName = function () {
	return this._fullSuggestions.slice(0, this._maxSuggestedItems);
};

SearchProductsFrontControl.prototype.InitLocalDB = function () {
	this._localDB = {
		fullSuggestions: ["Tenis", "Camisetas", "Celulares", "Computadores", "Medias", "Maletines", "Computadores", "Alimentos"],
		fullProducts: [
			{ id: 1, tenant_id: "Nike", name: "Tenis", description: "Tenis para deporte", list_price: 235000.25 },
			{ id: 2, tenant_id: "Adidas", name: "Tenis", description: "Tenis para runnig", list_price: 215000.50 },
			{ id: 3, tenant_id: "Puma", name: "Tenis", description: "Tenis para deporte", list_price: 235000.25 },
			{ id: 4, tenant_id: "Nike", name: "Camisetas", description: "Camisetas para cualquier deporte", list_price: 35000.25 },
			{ id: 5, tenant_id: "Adidas", name: "Camisetas", description: "Camisetas para runnig", list_price: 45000.50 },
			{ id: 6, tenant_id: "Puma", name: "Camisetas", description: "Camisetas para senderismo, running", list_price: 25000.35 },
			{ id: 7, tenant_id: "Xiaomi", name: "Celulares", description: "Celular gama media", list_price: 850000.35 },
			{ id: 8, tenant_id: "Huawei", name: "Celulares", description: "Celular gama media", list_price: 950000.45 },
			{ id: 9, tenant_id: "Apple", name: "Celulares", description: "Celular gama media", list_price: 1250000.55 },
			{ id: 10, tenant_id: "Samsung", name: "Celulares", description: "Celular gama media", list_price: 1150000.75 }
		]
	};
};

const searchProducts = new SearchProductsFrontControl();
