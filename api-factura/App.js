const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const blobService = require('./services/blobservice');
const fs = require('fs');
const multer = require('multer');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const form = formidable({ uploadDir: 'facturas/', multiples: true });
/*app.use(
	cors()(
		multer({
			dest: '/facturas',
			rename: function(fieldname, filename) {
				return filename.replace(/\W+/g, '-').toLowerCase();
			}
		})
	)
);

app.use(express.static(__dirname + '/facturas'));
*/
app.get('/', (req, res) => {
	res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/invoice/blobs" enctype="multipart/form-data" method="post">
      <div>Titulo de la factura: <input type="text" name="title" /></div>
      <div>Archivo: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

app.get('/invoice/blobs', async (req, res, next) => {
	const blobs = [];

	// Obtener el contenedor
	const containerName = 'formrecocontainer';
	const containerClient = blobService.getContainerClient(containerName);

	//Listar los PDF del contenedor
	for await (const blob of containerClient.listBlobsFlat()) {
		blobs.push({ name: blob.name, createdOn: blob.properties.createdOn });
	}
	res.json({ data: blobs });
});

app.post('/invoice/blobs', async (req, res, next) => {
	req._multipart = true;
	// Obtener el contenedor
	const containerName = 'formrecocontainer';
	const containerClient = blobService.getContainerClient(containerName);

	var invoices;

	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}

		const upload = files.someExpressFiles;

		if (upload) {
			//Si existe archivo subido o no
			if (Array.isArray(upload)) {
				//Si se han subido mas de un archivo, es decir, si es un Array de archivos
				invoices = upload.map((file) => {
					return { name: file.name, path: file.path };
				});
			} else {
				invoices = [ { name: upload.name, path: upload.path } ];
			}

			invoices.forEach(async (file) => {
				fs.readFile(file.path, 'utf-8', async (err, data) => {
					if (err) {
						console.log('error: ', err);
					} else {
						// subir las facturas al servicio de Azure
						const blockBlobClient = containerClient.getBlockBlobClient(file.name);
						const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
					}
				});
			});

			data = {
				message: 'Facturas subidas correctamente!',
				data: invoices, //Devolvemos una o la lista de rutas de los archivos
				nInvoices: upload.length || 1 //Devolvemos la cantidad de archivos
			};
		} else {
			data = {
				message: 'No hay ninguna factura seleccionada para subir...',
				data: [],
				nInvoices: 0
			};
		}

		res.json(data);
	});
});

app.listen(3001, () => console.log('Escuchando en el puerto 3001'));
