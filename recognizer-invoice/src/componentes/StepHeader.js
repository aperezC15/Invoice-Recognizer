import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { withStyles } from '@material-ui/core/styles';
import ColorlibStepIcon from './ColorlibStepIcon';

const ColorlibConnector = withStyles({
	alternativeLabel: {
		top: 22
	},
	active: {
		'& $line': {
			backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
		}
	},
	completed: {
		'& $line': {
			backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
		}
	},
	line: {
		height: 3,
		border: 0,
		backgroundColor: '#eaeaf0',
		borderRadius: 1
	}
})(StepConnector);

const StepHeader = ({ steps, activeStep }) => {
	return (
		<Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} orientation="horizontal">
			{steps.map((label) => (
				<Step key={label}>
					<StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
};

export default StepHeader;
