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
    const file = evt.target.files[0];
    if (!file) {
        return;
    }
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
        let fileContent = e.target.result;
        var fileLines = fileContent.split(/(?:\r\n|\r|\n)/g);
        document.getElementById('file-content').innerHTML = fileContent.replace(/(?:\r\n|\r|\n)/g, '<br>');
        console.log(fileLines);
    };
    fileReader.readAsText(file);
};



const masiveUpload = new MasiveUploadProductsFrontControl();