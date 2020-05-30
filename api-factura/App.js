const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
const blobService = require('./services/blobservice');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const form = formidable({ uploadDir: 'facturas/' });

app.get('/', (req, res) => {
	res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
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
	// Obtener el contenedor
	const containerName = 'formrecocontainer';
	const containerClient = blobService.getContainerClient(containerName);

	form.parse(req, async (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}
		const { name: blobName } = fields;
		const content = 'Hello world!';

		const blockBlobClient = containerClient.getBlockBlobClient(blobName);
		const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
		console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
		res.json({ requestId: uploadBlobResponse.requestId });
	});
});

app.post('/api/upload', (req, res, next) => {
	// const form = formidable({ uploadDir: 'facturas/' });

	form.on('file', (filename, file) => {
		form.emit('data', { name: 'file', key: filename, value: file });
	});

	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}
		res.json({ fields, files });
	});
});

app.listen(3001, () => console.log('Escuchando en el puerto 3001'));
