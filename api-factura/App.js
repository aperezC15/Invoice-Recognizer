const express = require('express');
const cors = require('cors');
const blobService = require('./services/blobservice');
const formRecognizer = require('./services/formRecognizerService');
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

// endpoint para realizar el entrenamiento
app.post('/training', async (req, res) => {
	const containerSasUrl = process.env.CONTAINER_SAS_URL;
	const trainingClient = formRecognizer.getTrainingClient();

	try {
		const poller = await trainingClient.beginTraining(containerSasUrl, false, {
			onProgress: (state) => {
				console.log(`training status: ${state.status}`);
			}
		});

		await poller.pollUntilDone();
		const response = poller.getResult();

		if (!response) {
			// bad request: el usuario debe subir facturas al contenedor
			return res.status(400).json({ message: 'No existen documentos para realizar el entrenamiento.' });
		}

		const { modelId, requestedOn, completedOn } = response;

		// created: se ha creado un nuevo ID de modelo
		res.status(201).json({
			message: 'Ha finalizado el entrenamiento con éxito.',
			data: {
				modelId,
				requestedOn,
				completedOn,
				trainingDocuments: response.trainingDocuments || [] // Training document information
			}
		});
	} catch (error) {
		// error de conexión con Azure o interno del servidor
		console.log('Error al ejecutar el entrenamiento.', error);
		return res.status(500).json({ message: error.message });
	}
});

app.post('/analyze', upload.single('factura'), async (req, res) => {
	const client = formRecognizer.getRecognizerClient();
	const path = req.file.path;
	const modelId = req.body.modelId;

	const readStream = fs.createReadStream(path);

	const poller = await client.beginRecognizeCustomForms(modelId, readStream, 'application/pdf', {
		onProgress: (state) => {
			console.log(`status: ${state.status}`);
		}
	});
	await poller.pollUntilDone();
	const forms = poller.getResult();

	res.status(201).json({ message: 'El analisis ha finalizado con éxito!', forms });
});

app.listen(3001, () => console.log('Escuchando en el puerto 3001'));
