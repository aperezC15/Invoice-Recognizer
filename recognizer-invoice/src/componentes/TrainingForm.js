import React, { useState, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from './Alert';
import InvoiceContext from '../context/InvoiceContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(4)
	},
	circularProgress: {
		position: 'absolute',
		bottom: '2em',
		right: '50%'
	},
	modelIdInfo: {
		marginTop: '1em',
		marginBottom: '1em'
	}
}));

const TrainingForm = () => {
	const classes = useStyles();

	const invoiceContext = useContext(InvoiceContext);
	const { setModelId } = invoiceContext;

	const [ loading, setLoading ] = React.useState(false);

	const [ open, setOpen ] = useState(false);
	const [ alertMessage, setAlertMessage ] = useState(null);
	const [ alertSeverity, setAlertSeverity ] = useState(null);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const runTraining = () => {
		setLoading(true);

		axios
			.post('http://localhost:3001/training')
			.then((res) => {
				if (res.status === 201) {
					const data = res.data;

					setModelId(data.data.modelId); // enviar el ID de modelo al state de contexto

					console.log(data.data.modelId);
					// configurar la información de la alerta
					setAlertMessage(data.message);
					setAlertSeverity('success');

					setLoading(false); // ocultar el progreso circular
					setOpen(true); // mostrar la alerta
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false); // ocultar el progreso
			});
	};

	return (
		<div>
			<Typography variant="h5" className={classes.instructions}>
				Ejecute el entrenamiento
			</Typography>

			<Button color="secondary" variant="contained" onClick={runTraining}>
				Empezar
			</Button>

			{loading && <CircularProgress className={classes.circularProgress} />}

			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={alertSeverity}>
					{alertMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default TrainingForm;
