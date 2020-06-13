import React from 'react';
import ProcessCompleted from '../componentes/ProcessCompleted';
import TrainingForm from '../componentes/TrainingForm';
import AnalysisForm from '../componentes/AnalysisForm';
import Results from '../componentes/Results';

const StepContent = ({ activeStep, stepMode, handleReset }) => {
	return (
		<div>
			{activeStep === stepMode.training ? (
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
