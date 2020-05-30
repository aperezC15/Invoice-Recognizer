const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

function getContainerClient(containerName) {
	// Cuenta y clave del contenedor
	const account = process.env.ACCOUNT_NAME || '';
	const accountKey = process.env.ACCOUNT_KEY || '';

	const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
	const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, sharedKeyCredential);

	return blobServiceClient.getContainerClient(containerName);
}

module.exports = {
	getContainerClient
};
