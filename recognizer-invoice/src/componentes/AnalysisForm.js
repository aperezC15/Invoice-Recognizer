import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import InvoiceContext from '../context/InvoiceContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

const AnalysisForm = () => {
	const classes = useStyles();

	const invoiceContext = useContext(InvoiceContext);
	const { modelId } = invoiceContext;

	console.log('modelId', modelId);

	return (
		<div>
			<Typography variant="h5" className={classes.instructions}>
				Realice el análisis
			</Typography>
		</div>
	);
};

export default AnalysisForm;
