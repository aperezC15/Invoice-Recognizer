import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import InvoiceContext from '../context/InvoiceContext';

const useStyles2 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5)
	},
	encabezado: {
		backgroundColor: '#0277bd',
		color: 'white',
		fontSize: 14
	}
}));

function TablaPaginationActions(props) {
	const classes = useStyles2();
	const theme = useTheme();
	const { cant, pag, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, pag - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, pag + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(cant / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton onClick={handleFirstPageButtonClick} disabled={pag === 0} aria-label="first page">
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={pag === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={pag >= Math.ceil(cant / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={pag >= Math.ceil(cant / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

TablaPaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired
};

// const useStyles2 = makeStyles({
// 	table: {
// 		minWidth: 500
// 	}
// });

const Tabla = () => {
	const classes = useStyles2();

	//const invoiceContext = useContext(InvoiceContext);
	//const { celdas } = invoiceContext;

	const [ pag, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer component={Paper}>
			<Table size="medium" aria-label="custom pagination table">
				<TableHead>
					<TableRow>
						<TableCell className={classes.encabezado}>Número</TableCell>
						<TableCell className={classes.encabezado}>Edad</TableCell>
						<TableCell className={classes.encabezado}>Nombre del ciudadano</TableCell>
						<TableCell className={classes.encabezado}>Marca de voto</TableCell>
						<TableCell className={classes.encabezado}>Firma</TableCell>
						<TableCell className={classes.encabezado}>Confirmar</TableCell>
					</TableRow>
				</TableHead>
				<TableBody />
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[ 5, 10, 25, { label: 'Todo', value: -1 } ]}
							colSpan={3}
							count={10}
							rowsPerPage={rowsPerPage}
							page={pag}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={TablaPaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
};

export default Tabla;
