import React, { useState } from 'react';
import axios from 'axios';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginBottom: '4em'
	},
	button: {
		margin: theme.spacing(1)
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
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2)
	}
}));

// componente
const InvoiceUploadForm = () => {
	const classes = useStyles();

	const [ selectedFile, setSelectedFile ] = useState(null);

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
				if (res.status === 200) {
					this.mensaje = 'Se ha completado correctamente la subida';
				}
			})
			.catch((err) => console.log(err));

		// limpiar el estado
		setSelectedFile(null);
	};

	return (
		<div>
			<Typography variant="h5" className={classes.instructions}>
				Seleccione las imágenes para el entrenamiento
			</Typography>

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
				<Button variant="contained" component="span" className={`${classes.buttonElegir} ${classes.button}`}>
					Elegir archivos
				</Button>
			</label>

			<Button
				variant="contained"
				component="span"
				color="primary"
				className={classes.button}
				onClick={enviarArchivos}
				endIcon={<BackupIcon />}
			>
				Subir archivos
			</Button>
		</div>
	);
};

export default InvoiceUploadForm;
