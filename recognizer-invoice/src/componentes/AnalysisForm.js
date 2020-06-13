import React, { useState, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import InvoiceContext from '../context/InvoiceContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from './Alert';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
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
	input: {
		display: 'none'
	},
	circularProgress: {
		position: 'absolute',
		bottom: '2em',
		right: '50%'
	}
}));

const AnalysisForm = () => {
	const classes = useStyles();

	// estado para el spinner de progreso
	const [ loading, setLoading ] = React.useState(false);

	// estados para las alertas
	const [ open, setOpen ] = useState(false);
	const [ alertMessage, setAlertMessage ] = useState(null);
	const [ alertSeverity, setAlertSeverity ] = useState(null);

	const [ selectedFile, setSelectedFile ] = useState(null);

	const invoiceContext = useContext(InvoiceContext);
	const { modelId, setAnalysisResult } = invoiceContext;

	//verificar que sí se subió un archivo
	const verEstadoSubir = (event) => {
		let file = event.target.files[0];
		setSelectedFile(file);
	};

	const analyzeForm = () => {
		const data = new FormData();
		data.append('factura', selectedFile);
		data.append('modelId', modelId);

		setLoading(true); // activar el progreso circular

		axios
			.post('http://localhost:3001/analyze', data)
			.then((res) => {
				if (res.status === 201) {
					const { forms, message } = res.data;

					setAnalysisResult(forms); // envia al estado de contexto el resultado de analisis
					console.log('forms', forms);

					// configuración de la alerta a mostrar
					setAlertMessage(message);
					setAlertSeverity('success');

					setLoading(false); // ocultar el progreso circular
					setOpen(true); // mostrar la alerta
				}
			})
			.catch((err) => {
				setLoading(false); // ocultar el progreso circular
				console.log('error en el análisis', err.message);
			});
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') return;

		setOpen(false);
	};

	return (
		<div>
			<Typography variant="h5" className={classes.instructions}>
				Realice el análisis
			</Typography>

			<div>
				<input
					color="secondary"
					accept=".pdf"
					className={classes.input}
					id="contained-button-file"
					type="file"
					onChange={verEstadoSubir}
				/>
				<label htmlFor="contained-button-file">
					<Button
						variant="contained"
						component="span"
						className={`${classes.buttonElegir} ${classes.button}`}
					>
						Elegir archivo
					</Button>
				</label>

				<Button
					variant="contained"
					component="span"
					color="primary"
					className={classes.button}
					onClick={analyzeForm}
					endIcon={<BackupIcon />}
				>
					Analizar
				</Button>
			</div>

			{loading && <CircularProgress className={classes.circularProgress} />}

			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={alertSeverity}>
					{alertMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default AnalysisForm;
