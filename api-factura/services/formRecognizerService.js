const { FormTrainingClient, FormRecognizerClient, AzureKeyCredential } = require('@azure/ai-form-recognizer');

function getTrainingClient() {
	const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || '';
	const apiKey = process.env.FORM_RECOGNIZER_KEY || '';

	return new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
}

function getRecognizerClient() {
	const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || '';
	const apiKey = process.env.FORM_RECOGNIZER_KEY || '';

	return new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
}

module.exports = {
	getTrainingClient,
	getRecognizerClient
};
