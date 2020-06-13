import React, { useState } from 'react';
import StepHeader from '../componentes/StepHeader';
import StepContent from '../componentes/StepContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginBottom: '4em'
	},
	button: {
		marginRight: theme.spacing(1)
	}
}));

function getSteps() {
	return [ 'Subir Facturas', 'Entrenamiento', 'Análisis', 'Resultados' ];
}

// el modo del step es de acuerdo al índice del array que devuelve getSteps
function getStepMode() {
	return {
		upload: 0,
		training: 1,
		analysis: 2,
		results: 3,
		completed: 4
	};
}

const Recognizer = () => {
	const classes = useStyles();

	//asignar en qué stepper empieza
	const [ activeStep, setActiveStep ] = useState(0);
	const steps = getSteps(),
		stepMode = getStepMode();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const onReset = () => {
		setActiveStep(0);
	};

	return (
		<div>
			<StepHeader steps={steps} activeStep={activeStep} />
			<StepContent activeStep={activeStep} stepMode={stepMode} handleReset={onReset} />

			{/* mostrar los controles de paso si no los ha completado */}
			{activeStep < stepMode.completed && (
				<div className="mb3">
					<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
						Anterior
					</Button>
					<Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
						{activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
					</Button>
				</div>
			)}
		</div>
	);
};

export default Recognizer;
