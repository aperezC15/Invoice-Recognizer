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

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'facturas');
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + file.originalname);
	}
});

const upload = multer({ storage: storage });

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

app.post('/invoice/blobs', upload.array('facturas', 5), async (req, res, next) => {
	let respuesta = {
		message: 'Facturas agregadas al contenedor exitosamente!',
		data: [], // nombre de las facturas subidas exitosamente
		status: 201 // por defecto el estado http es 201 (creado)
	};

	// Obtener el contenedor
	const containerName = 'formrecocontainer';
	const containerClient = blobService.getContainerClient(containerName);

	// Obtener el nombre y la ruta de las facturas subidas
	let facturas = req.files.map((f) => {
		const { originalname: nombre, path: ruta } = f;
		return { nombre, ruta };
	});

	try {
		for await (const factura of facturas) {
			// definir el nombre del blob a crear
			const blockBlobClient = containerClient.getBlockBlobClient(factura.nombre);

			// subir al contenedor la factura indicada por la ruta
			await blockBlobClient.uploadFile(factura.ruta, {
				concurrency: 5, // 5 es el numero maximo de archivos a subir de forma simultanea
				onProgress: (ev) => console.log(ev)
			});

			// agregar la factura subida al conteo
			respuesta.data.push(factura.nombre);
		}
	} catch (err) {
		console.log(
			`uploadFile failed, requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err
				.details.errorCode}`
		);

		// agregar información de error
		respuesta.message = `Ha ocurrido un error al subir las facturas! [Código de error: ${err.details.errorCode}]`;
		respuesta.status = 500;
	}

	res.status(respuesta.status).json(respuesta);
});

app.listen(3001, () => console.log('Escuchando en el puerto 3001'));
