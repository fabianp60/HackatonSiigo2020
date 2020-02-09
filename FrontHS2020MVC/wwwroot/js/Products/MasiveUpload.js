function MasiveUploadProductsFrontControl() {
	this.InitControl();
	this.InitEventListeners();
}

MasiveUploadProductsFrontControl.prototype.InitControl = function () {
	this._inputFile = document.getElementById('products-file');
};

MasiveUploadProductsFrontControl.prototype.InitEventListeners = function () {
	this._inputFile.addEventListener('change', this.OnInputFileChangeEvent.bind(this), false);
};

MasiveUploadProductsFrontControl.prototype.OnInputFileChangeEvent = function (evt) {
    const archivo = evt.target.files[0];
    if (!archivo) {
        return;
    }
    const lector = new FileReader();
    lector.onload = function (e) {
        var contenido = e.target.result;
        //var lines = contenido.split("\n");
        var lines = contenido.split(/(?:\r\n|\r|\n)/g);
        document.getElementById('file-content').innerHTML = contenido.replace(/(?:\r\n|\r|\n)/g, '<br>');
        console.log(lines);
    };
    lector.readAsText(archivo);
};



const masiveUpload = new MasiveUploadProductsFrontControl();