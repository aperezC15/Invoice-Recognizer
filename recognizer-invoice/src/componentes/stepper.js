import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

// Formulario para subir las facturas
import FormularioFacturas from './TrainingForm';

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

export default function CustomizedSteppers(props) {
	const classes = useStyles();

	const displayStep = () => {
		switch (activeStep) {
			case 0:
				return FormularioFacturas();
			case 1:
				return displaySecondStep();
			case 2:
				return displayThirdStep();
			default:
				return null;
		}
	};

	const displaySecondStep = () => {
		return (
			<div>
				<p>Colocar lo necesario para el segundo step</p>
			</div>
		);
	};

	const displayThirdStep = () => {
		return (
			<div>
				<p>Colocar lo necesario para el tercer step</p>
			</div>
		);
	};

	return (
		<div className={classes.root}>
			<div>
				{activeStep === steps.length ? (
					<Typography variant="h5" className={classes.instructions}>
						{getStepContent(activeStep)}
					</Typography>
				) : (
					<div>
						<Typography variant="h5" className={classes.instructions}>
							{getStepContent(activeStep)}
						</Typography>

						<div className={classes.root}>{displayStep()}</div>

						<div className="mb3">
							<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
								Anterior
							</Button>
							<Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
								{activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
