import React from 'react';
import ProcessCompleted from '../componentes/ProcessCompleted';
import InvoiceUploadForm from './InvoiceUploadForm';
import AnalysisForm from '../componentes/AnalysisForm';
import TrainingForm from '../componentes/TrainingForm';
import Results from '../componentes/Results';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		minHeight: '8em'
	}
}));

const StepContent = ({ activeStep, stepMode, handleReset }) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			{activeStep === stepMode.upload ? (
				<InvoiceUploadForm />
			) : activeStep === stepMode.training ? (
				<TrainingForm />
			) : activeStep === stepMode.analysis ? (
				<AnalysisForm />
			) : activeStep === stepMode.results ? (
				<Results />
			) : activeStep === stepMode.completed ? (
				<ProcessCompleted handleReset={handleReset} />
			) : (
				<p>Paso no encontrado</p>
			)}
		</div>
	);
};

export default StepContent;
