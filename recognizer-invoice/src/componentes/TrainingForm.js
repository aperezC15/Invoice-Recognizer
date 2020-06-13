import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

const TrainingForm = () => {
	const classes = useStyles();

	return (
		<div>
			<Typography variant="h5" className={classes.instructions}>
				Ejecute el entrenamiento
			</Typography>
			<p>Descripción de lo que realiza este paso.</p>
			<Button color="secondary" variant="contained">
				Empezar
			</Button>
		</div>
	);
};

export default TrainingForm;
