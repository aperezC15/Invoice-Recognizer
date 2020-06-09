import React from 'react';
import Pasos from '../componentes/stepper';
import axios from 'axios';

class stepper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: null
		};

		this.verEstadoSubir = this.verEstadoSubir.bind(this);
		this.enviarArchivos = this.enviarArchivos.bind(this);
	}

	//establecer un máximo de archivos
	maxSelectFile = (event) => {
		let files = event.target.files; // crear un objeto de archivos
		if (files.length > 5) {
			const msg = 'Solamente puede seleccionar 5 archivos';
			event.target.value = null; // descartar los archivos seleccionados
			console.log(msg);
			return false;
		}
		return true;
	};

	//verficar que sea extensión pdf

	verificarExtension = (event) => {
		//obteniendo el objeto de archivos
		let files = event.target.files;
		//definir el mensaje
		let err = '';
		// lista de extensiones permitidas
		const types = [ 'pdf' ];
		//Ciclo de acceso a archivos
		for (var x = 0; x < files.length; x++) {
			// compare file type find doesn't matach
			if (types.every((type) => files[x].type !== type)) {
				// create error message and assign to container
				err += files[x].type + ' is not a supported format\n';
			}
		}

		if (err !== '') {
			// if message not same old that mean has error
			event.target.value = null; // discard selected file
			console.log(err);
			return false;
		}
		return true;
	};

	//verificar que sí se subió un archivo
	verEstadoSubir = (event) => {
		var files = event.target.files;
		if (this.maxSelectFile(event)) {
			// si retorna TRUE permitir subir cambiar el estdo
			this.setState({
				selectedFile: files
			});
			console.log(files);
		}
	};

	//metodo para enviar archivos
	enviarArchivos = () => {
		const data = new FormData();
		for (var x = 0; x < this.state.selectedFile.length; x++) {
			data.append('files', this.state.selectedFile[x]);
		}
		axios
			.post(
				'http://localhost:3001/invoice/blobs',
				data,
				{
					// receive two parameter endpoint url ,form data
				}
			)
			.then((res) => {
				// then print response status
				console.log(res.status);
				console.log(data);
			});
	};

	componentDidMount() {}

	render() {
		return <Pasos verEstadoSubir={this.verEstadoSubir} enviarArchivos={this.enviarArchivos} />;
	}
}

export default stepper;
