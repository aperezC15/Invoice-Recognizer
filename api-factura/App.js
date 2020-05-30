const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

const app = express();
require('dotenv').config();

app.use(cors());

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

app.listen(3001, () => console.log('Escuchando en el puerto 3001'));
