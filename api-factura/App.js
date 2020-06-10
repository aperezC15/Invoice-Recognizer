const express = require('express');
const cors = require('cors');
const blobService = require('./services/blobservice');
const fs = require('fs');
const multer = require('multer');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const upload = multer({ dest: 'facturas/' });

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

function createInvoiceSender(containerClient, factura) {
	return new Promise((resolve, reject) => {
		fs.readFile(factura.ruta, 'utf-8', async (err, data) => {
			if (err) {
				reject(err);
			} else {
				// subir las facturas al servicio de Azure
				const blockBlobClient = containerClient.getBlockBlobClient(factura.nombre);
				const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
				resolve(uploadBlobResponse);
			}
		});
	});
}

app.post('/invoice/blobs', upload.array('facturas', 5), (req, res, next) => {
	// Obtener el contenedor
	const containerName = 'formrecocontainer';
	const containerClient = blobService.getContainerClient(containerName);

	// Obtener el nombre y la ruta de las facturas subidas
	let facturas = req.files.map((f) => {
		const { originalname: nombre, path: ruta } = f;
		return { nombre, ruta };
	});

	const invoicesSender = facturas.map((factura) => createInvoiceSender(containerClient, factura));

	Promise.all(invoicesSender)
		.then((result) => {
			console.log(result);
			res.status(201).send('Las facturas se han subido correctamente.');
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err.message);
		});
});

app.listen(3001, () => console.log('Escuchando en el puerto 3001'));

// 		data = {
// 			message: 'Facturas subidas correctamente!',
// 			data: invoices, //Devolvemos una o la lista de rutas de los archivos
// 			nInvoices: upload.length || 1 //Devolvemos la cantidad de archivos
// 		};
// 	} else {
// 		data = {
// 			message: 'No hay ninguna factura seleccionada para subir...',
// 			data: [],
// 			nInvoices: 0
// 		};
// 	}

// 	res.json(data);
// });
