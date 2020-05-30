const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

const app = express();
require('dotenv').config();

app.use(cors());

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
	// Cuenta y clave del contenedor
	const account = process.env.ACCOUNT_NAME || '';
	const accountKey = process.env.ACCOUNT_KEY || '';

	const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

	//Listar los contenedores
	const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, sharedKeyCredential);

	// Crear un contenedor
	const containerName = 'formrecocontainer';
	const containerClient = blobServiceClient.getContainerClient(containerName);

	//Listar los PDF del contenedor
	for await (const blob of containerClient.listBlobsFlat()) {
		blobs.push({ name: blob.name, createdOn: blob.properties.createdOn });
	}
	res.json({ data: blobs });
});

app.post('/api/upload', (req, res, next) => {
	const form = formidable({ uploadDir: 'facturas/' });

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
