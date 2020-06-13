import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import PublishIcon from '@material-ui/icons/Publish';
import DescriptionIcon from '@material-ui/icons/Description';
import clsx from 'clsx';

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

export default function ColorlibStepIcon(props) {
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
