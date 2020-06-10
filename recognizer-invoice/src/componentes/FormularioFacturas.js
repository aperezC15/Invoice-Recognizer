import React, { useState, useEffect } from 'react';
import axios from 'axios';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginBottom: '4em'
	},
	button: {
		marginRight: theme.spacing(1)
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	input: {
		display: 'none'
	},
	buttonElegir: {
		margin: 10,
		background: '#f50057',
		color: 'white'
	},
	buttonSubir: {
		background: '#2196f3',
		color: 'white'
	},
	buttonCompletar: {
		backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
		color: '#fff',
		marginTop: '4em'
	}
}));

// componente
const FormularioFacturas = () => {
	const classes = useStyles();

	const [ selectedFile, setSelectedFile ] = useState(null);

	useEffect(
		() => {
			if (selectedFile) console.log('length of selectedFile', selectedFile.length);
		},
		[ selectedFile ]
	);

	//verificar que sí se subió un archivo
	const verEstadoSubir = (event) => {
		var files = event.target.files;

		setSelectedFile(files);
	};

	//metodo para enviar archivos
	const enviarArchivos = () => {
		const data = new FormData();
		const selectedFilesCount = selectedFile.length;

		for (let x = 0; x < selectedFilesCount; x++) {
			data.append('facturas', selectedFile[x]);
		}

		axios
			.post('http://localhost:3001/invoice/blobs', data)
			.then((res) => {
				// then print response status
				console.log(res);
			})
			.catch((err) => console.log(err));

		// limpiar el estado
		setSelectedFile(null);
	};

	return (
		<div>
			<input
				color="secondary"
				accept=".pdf"
				className={classes.input}
				id="contained-button-file"
				multiple
				type="file"
				onChange={verEstadoSubir}
			/>
			<label htmlFor="contained-button-file">
				<Button variant="contained" component="span" className={classes.buttonElegir}>
					Elegir archivos
				</Button>
			</label>

			<Button variant="contained" component="span" className={classes.buttonSubir} onClick={enviarArchivos}>
				Subir archivos
				<BackupIcon />
			</Button>
		</div>
	);
};

export default FormularioFacturas;
