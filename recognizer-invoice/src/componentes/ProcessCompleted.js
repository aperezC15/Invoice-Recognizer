import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

const useStyles = makeStyles((theme) => ({
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	completeButton: {
		backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
		color: '#fff',
		marginTop: '4em'
	}
}));

const ProcessCompleted = ({ handleReset }) => {
	const classes = useStyles();

	return (
		<div>
			<Typography color="primary" variant="h5" className={classes.instructions}>
				<Button variant="contained" onClick={handleReset} className={classes.completeButton}>
					Ha completado todos los pasos
					<CheckCircleTwoToneIcon fontSize="large" />
				</Button>
			</Typography>
		</div>
	);
};

export default ProcessCompleted;
