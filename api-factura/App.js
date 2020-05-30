const express = require('express');
const formidable = require('formidable');
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const app = express();
require("dotenv").config();

async function main() {
  // Cuenta y clave del contenedor
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  //Listar los contenedores
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );
/*
  let i = 1;
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`Container ${i++}: ${container.name}`);
  }*/

  // Crear un contenedor
  const containerName = 'formrecocontainer';
  const containerClient = blobServiceClient.getContainerClient(containerName);

  //Listar los PDF del contenedor
  i = 1;
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

  // Crear un blob
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
  console.log(`Carga del grupo de imágenes ${blobName} exitosamente`, uploadBlobResponse.requestId);

}

main().catch((err) => {
    console.error("Mensaje de Error:", err.message);
});

app.listen(3001, () => console.log('Escuchando en el puerto 3001'));

