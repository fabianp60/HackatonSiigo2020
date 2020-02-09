function MasiveUploadProductsFrontControl() {
    this.InitControl();
    this.InitEventListeners();
}

MasiveUploadProductsFrontControl.prototype.InitControl = function () {
    this._inputFile = document.getElementById('products-file');
    this._fileResults = document.getElementById('file-content');
    this._postAction = '/Products/AsyncPostProduct';
};

MasiveUploadProductsFrontControl.prototype.InitEventListeners = function () {
    this._inputFile.addEventListener('change', this.OnInputFileChangeEvent.bind(this), false);
};

MasiveUploadProductsFrontControl.prototype.OnInputFileChangeEvent = function (evt) {
    const file = evt.target.files[0];
    if (!file) {
        return;
    }
    this._fileResults.innerHTML = "Cargando el archivo...";
    this._currentFile = file;
    const fileReader = new FileReader();
    fileReader.onload = this.OnFileLoaded.bind(this);
    fileReader.onerror = this.OnFileError.bind(this);
    fileReader.readAsText(file);
};

MasiveUploadProductsFrontControl.prototype.OnFileLoaded = function (evt) {
    let fileContent = evt.target.result;
    let fileLines = fileContent.split(/(?:\r\n|\r|\n)/g);
    fileLines = fileLines.map((line) => line.split('\t'));
    // FileIsValid Muestra las lineas con error
    if (this.FileIsValid(fileLines)) {
        this.RenderTable(fileLines);
        this.BeginAsyncUpload(fileLines);
    }
};

MasiveUploadProductsFrontControl.prototype.BeginAsyncUpload = async function (fileLines) {
    for (let i = 0; i < fileLines.length; i++) {
        let data = {
            "tenant_id": fileLines[i][0],
            "name": fileLines[i][1],
            "description": fileLines[i][2],
            "list_price": fileLines[i][3].replace(".", ",")
        };
        $.ajax({
            type: "POST",
            ContentType: "application/json",
            url: this._postAction,
            data: data,
            context: { "thisControl": this, "index": i },
            dataType: "json"
        }).done(function (data) {
            let td = this.thisControl._fileResults.querySelector(`td[data-api-result-id="${this.index}"]`);
            td.innerHTML = `<span class="badge badge-success">Guardado</span>`;
        }).fail(function (errObj) {
            let errMsg = "";
            if (errObj.responseText.includes('No se puede establecer una conexión')) {
                errMsg = "No se puede establecer una conexión con el servicio";
            } else {
                errMsg = `${statusText} (código: ${status})`;
            }
            let td = this.thisControl._fileResults.querySelector(`td[data-api-result-id="${this.index}"]`);
            td.innerHTML = `<span class="badge badge-danger" data-toggle="tooltip" data-placement="top" title="${errMsg}">Error</span>`;
            $(td.querySelector('span[data-toggle="tooltip"]')).tooltip();
        });
    }
};

MasiveUploadProductsFrontControl.prototype.FileIsValid = function (fileLines) {
    // TODO: validar cada linea e indicar si alguna linea no cumple las caracteristicas
    let isValid = true;
    this._fileResults.innerHTML = "Validando el archivo...<br>";
    let errors = '';
    for (let i = 0; i < fileLines.length; i++) {
        let columns = fileLines[i];
        if (columns.length != 4) {
            errors += `La linea ${i + 1} tiene ${columns.length} columnas deben ser 4<br>`;
            isValid = false;
        }
        if (isNaN(parseInt(columns[0]))) {
            errors += `En la linea ${i + 1} la columna Tenant_id no contiene un entero<br>`;
            isValid = false;
        }
        if (columns[1].length == 0) {
            errors += `En la linea ${i + 1} la columna Name está vacía y es obligatoria<br>`;
            isValid = false;
        }
        if (isNaN(parseFloat(columns[3]))) {
            errors += `En la linea ${i + 1} la columna List_price no contiene un número decimal<br>`;
            isValid = false;
        }
    }
    if (!isValid) {
        this._fileResults.innerHTML += `<div class="alert alert-danger" role="alert">${errors}</div>`;
    } else {
        this._fileResults.innerHTML += `<div class="alert alert-success" role="alert">¡Es valido!</div>`;
    }
    return isValid;
};

MasiveUploadProductsFrontControl.prototype.RenderTable = function (fileLines) {
    // tenantid,name,description,list_price
    let tableHtml = `<table class="table">
                        <thead class="thead-dark">
                            <tr>
                              <th scope="col">Tenant_id</th>
                              <th scope="col">Name</th>
                              <th scope="col">Description</th>
                              <th scope="col">List_price</th>
                              <th scope="col">¿Cargado?</th>
                            </tr>
                          </thead>
                        <tbody>`;
    for (let i = 0; i < fileLines.length; i++) {
        let columns = fileLines[i];
        tableHtml += `<tr>
                        <td>${columns[0]}</td>
                        <td>${columns[1]}</td>
                        <td>${columns[2]}</td>
                        <td>${columns[3]}</td>
                        <td data-api-result-id="${i}"><span class="badge badge-warning">Esperando</span></td>
                      </tr>`;
    }

    tableHtml += `</tbody>
                </table>`;

    this._fileResults.innerHTML = tableHtml;
};

MasiveUploadProductsFrontControl.prototype.OnFileError = function (evt) {
    this._fileResults.innerHTML = `<div class="alert alert-danger" role="alert">Se presentó un error, no se pudo cargar el archivo</div>`;
    console.log(evt);
};

const masiveUpload = new MasiveUploadProductsFrontControl();