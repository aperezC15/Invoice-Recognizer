import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

const AnalysisForm = () => {
	const classes = useStyles();

	return (
		<div>
			<Typography variant="h5" className={classes.instructions}>
				Realice el análisis
			</Typography>
		</div>
	);
};

export default AnalysisForm;
