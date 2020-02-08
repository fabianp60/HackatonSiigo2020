function SearchProductsFrontControl() {
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
	this._searchButton = document.getElementById("search-products-button");
	this._maxSuggestedItems = parseInt(this._inputSearch.dataset.maxSuggestedItems);
};

SearchProductsFrontControl.prototype.InitDynamicControls = function () {
	this._tagifySearchControl = new Tagify(this._inputSearch, {
		whitelist: this._suggestions,
		dropdown: {
			/*classname: "color-blue",*/
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
	let fullprods = ["Zapatos", "Camisetas", "Celulares", "Computadores", "Medias", "Maletines", "Computadores", "Alimentos"];
	return fullprods.slice(0, this._maxSuggestedItems);
};

SearchProductsFrontControl.prototype.OnSearchEvent = function () {
	alert("Cargar la tabla con los productos del filtro: " + this._inputSearch.value);
}

const searchProducts = new SearchProductsFrontControl();
