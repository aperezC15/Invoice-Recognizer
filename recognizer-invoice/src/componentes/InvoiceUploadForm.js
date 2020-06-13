import React, { useState, useEffect } from 'react';
import axios from 'axios';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from './Alert';

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
	},
	circularProgress: {
		position: 'absolute',
		bottom: '2em',
		right: '50%'
	}
}));

// componente
const InvoiceUploadForm = () => {
	const classes = useStyles();

	// estado para el spinner de progreso
	const [ loading, setLoading ] = React.useState(false);

	// estados para las alertas
	const [ open, setOpen ] = useState(false);
	const [ alertMessage, setAlertMessage ] = useState(null);
	const [ alertSeverity, setAlertSeverity ] = useState(null);

	const [ selectedFile, setSelectedFile ] = useState(null);
	const [ fileMessage, setFileMessage ] = useState('Ningún archivo seleccionado');

	useEffect(
		() => {
			let filesCount = selectedFile ? selectedFile.length : 0;
			let m =
				filesCount === 0
					? 'Ningún archivo seleccionado'
					: `${filesCount} ${filesCount === 1 ? 'archivo seleccionado' : 'archivos seleccionados'}`;
			setFileMessage(m);
		},
		[ selectedFile ]
	);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') return;

		setOpen(false);
	};

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

		setLoading(true); // mostrar el progreso circular

		axios
			.post('http://localhost:3001/invoice/blobs', data)
			.then((res) => {
				const { message } = res.data;

				if (res.status === 201) {
					// configurar la alerta
					setAlertMessage(message);
					setAlertSeverity('success');

					setLoading(false); // ocultar el progreso circular
					setOpen(true); // mostrar la alerta
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

			<p>{fileMessage}</p>

			{loading && <CircularProgress className={classes.circularProgress} />}

			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={alertSeverity}>
					{alertMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default InvoiceUploadForm;
