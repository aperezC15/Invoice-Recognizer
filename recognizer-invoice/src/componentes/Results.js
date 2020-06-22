import React from 'react';
import Fields from './Fields';
//import Tabla from './Tabla';

// material-ui
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginBottom: '4em'
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

const Results = () => {
	const classes = useStyles();

	return (
		<div>
			<Typography variant="h5" className={classes.instructions}>
				Los resultados obtenidos son los siguientes:
			</Typography>

			<Fields />
		</div>
	);
};

export default Results;
