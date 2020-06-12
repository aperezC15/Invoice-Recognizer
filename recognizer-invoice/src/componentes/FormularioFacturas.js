import React, { useState, useEffect } from 'react';
import axios from 'axios';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';

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
	},
	barra: {
		width: '100%',
		height: 30
	},
	alertconf: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	}
}));

function LinearProgressWithLabel(props) {
	return (
		<Box display="flex" alignItems="center">
			<Box width="100%" mr={3}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box minWidth={50}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

LinearProgressWithLabel.propTypes = {
	/**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
	value: PropTypes.number.isRequired
};

// componente
const FormularioFacturas = () => {
	const classes = useStyles();

	const [ selectedFile, setSelectedFile ] = useState(null);
	const [ progress, setProgress ] = React.useState(0);

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
			<div className={classes.alertconf}>
				<Alert variant="filled" />
			</div>
		</div>
	);
};

export default FormularioFacturas;
