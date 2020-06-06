import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import PublishIcon from '@material-ui/icons/Publish';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import BackupIcon from '@material-ui/icons/Backup';

const useQontoStepIconStyles = makeStyles({
	root: {
		color: '#eaeaf0',
		display: 'flex',
		height: 22,
		alignItems: 'center'
	},
	active: {
		color: '#784af4'
	},
	circle: {
		width: 8,
		height: 8,
		borderRadius: '50%',
		backgroundColor: 'currentColor'
	},
	completed: {
		color: '#784af4',
		zIndex: 1,
		fontSize: 18
	}
});

function QontoStepIcon(props) {
	const classes = useQontoStepIconStyles();
	const { active, completed } = props;

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active
			})}
		>
			{completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
		</div>
	);
}

QontoStepIcon.propTypes = {
	/**
   * Whether this step is active.
   */
	active: PropTypes.bool,
	/**
   * Mark the step as completed. Is passed to child components.
   */
	completed: PropTypes.bool
};

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

const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: '#ccc',
		zIndex: 1,
		color: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	active: {
		backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
	},
	completed: {
		backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
	}
});

function ColorlibStepIcon(props) {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons = {
		1: <PublishIcon />,
		2: <ImageSearchIcon />,
		3: <DescriptionIcon />
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed
			})}
		>
			{icons[String(props.icon)]}
		</div>
	);
}

ColorlibStepIcon.propTypes = {
	/**
   * Whether this step is active.
   */
	active: PropTypes.bool,
	/**
   * Mark the step as completed. Is passed to child components.
   */
	completed: PropTypes.bool,
	/**
   * The label displayed in the step icon.
   */
	icon: PropTypes.node
};

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
    color: 'white',
  },
  buttonCompletar: {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    color: '#fff',
    marginTop: '4em'
  }
}));

function getSteps() {
	return [ 'Entrenamiento', 'Análisis', 'Resultados' ];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return 'Seleccione las imágenes para el entrenamiento';
		case 1:
			return 'Realice el análisis';
		case 2:
			return 'Los resultados obtenidos son los siguientes:';
		default:
			return 'Paso desconocido';
	}
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const useColors = useColorlibStepIconStyles();
	//asignar en qué stepper empieza
	const [ activeStep, setActiveStep ] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const displayStep = () => {
		switch (activeStep) {
			case 0:
				return displayFirstStep();
			case 1:
				return displaySecondStep();
			case 2:
				return displayThirdStep();
		}
	};

	const displayFirstStep = () => {
		return (
			<div>
				<input
					color="secondary"
					accept=".pdf"
					className={classes.input}
					id="contained-button-file"
					multiple
					type="file"
				/>
				<label htmlFor="contained-button-file">
					<Button variant="contained"  component="span" className={classes.buttonElegir}>
						Elegir archivos
					</Button>
				</label>

        <Button variant="contained"  component="span" className={classes.buttonSubir}>
					  Subir archivos
            <BackupIcon/>
					</Button>
			</div>
		);
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
			<Stepper
				alternativeLabel
				activeStep={activeStep}
				connector={<ColorlibConnector />}
				orientation="horizontal"
			>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Typography color="primary" variant="h5" className={classes.instructions}>
							<Button variant="contained" onClick={handleReset} className={classes.buttonCompletar}>
								Ha completado todos los pasos
								<CheckCircleTwoToneIcon fontSize="large" />
							</Button>
						</Typography>
					</div>
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