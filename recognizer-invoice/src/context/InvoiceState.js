import React, { useReducer } from 'react';
import InvoiceReducer from './InvoiceReducer';
import { SET_MODELID, SET_FIELDS, GET_TABLES } from '../types';
import InvoiceContext from './InvoiceContext';

const initialState = {
	modelId: '97637b5e-1261-4a91-b116-76ba81c88b43',
	fields: []
	//tables: []
};

const InvoiceState = ({ children }) => {
	const [ state, dispatch ] = useReducer(InvoiceReducer, initialState);

	const setModelId = (id) => {
		dispatch({
			type: SET_MODELID,
			payload: id
		});
	};

	const setAnalysisResult = (result) => {
		const field = [];
		const { pages } = result[0];

		const filteredData = result.map((r) => {
			const filteredFields = getFilteredFields(r.fields);
			return { fields: filteredFields };
		});

		const filteredPages = getFilteredPages(pages);

		console.log('filterData: ', filteredData);
		console.log('filterPages: ', filteredPages);

		//obtener fields por página
		for (let i = 0; i < result.length; i++) {
			const { fields } = result[i];
			field.push(fields);
		}

		console.log('fields', field);
		console.log('pages con destructuracion', pages);
		//console.log('imprimir fields', fields);

		//setData(field);
		//getTables(pages);
	};

	//clasificar los fields
	function getFilteredFields(fields) {
		const values = getValues(fields);
		return filterValues(values);
	}

	function verificarNombre(value) {
		const expresionNombre = /[A-Z]+,\s[A-Z]+/;
		const expresionNombre2 = /[A-Z]+\s,\s[A-Z]+/;
		//falta la segunda expresion
		return value.match(expresionNombre) || value.match(expresionNombre2);
	}

	function verificarDpi(value) {
		const expresionDpi = /\d{4}\s\d{5}\s\d{4}/;
		return value.match(expresionDpi);
	}

	function getValues(fields) {
		const keys = Object.keys(fields);
		const values = [];

		keys.forEach((k) => values.push(fields[k].value));
		return values;
	}

	function filterValues(values) {
		const votantes = [];
		let dpiActual = null;
		let name = '';

		values.forEach((v) => {
			const esDpi = verificarDpi(v);
			if (esDpi) {
				if (dpiActual) votantes.push({ dpi: dpiActual, nombre: '' });
				dpiActual = v;
				return;
			}

			const esNombre = verificarNombre(v);
			if (esNombre) {
				//debugger;
				let posicionBarras = v.indexOf('*');

				if (posicionBarras > -1) {
					name = v.substring(0, posicionBarras).trim();
				} else {
					name = v;
				}
				if (dpiActual == null) votantes.push({ dpi: '', nombre: name });
				else {
					votantes.push({ dpi: dpiActual, nombre: name });
					dpiActual = null;
				}
			}
		});

		return votantes;
	}

	//Obtener las tablas de las páginas
	const getFilteredPages = (pages) => {
		const filteredPages = pages.map((p) => {
			const { tables } = p;
			const { pageNumber } = p;
			const filteredTables = getFilteredTables(tables);
			return { filteredTables, pageNumber };
		});

		return { tables: filteredPages };
	};

	//Obtener las filas de cada tabla
	function getFilteredTables(tables) {
		const filteredTables = tables.map((t) => {
			const { rows } = t;
			const filteredRows = getFilteredRows(rows);
			return filteredRows;
		});

		return filteredTables;
	}

	//Obtener las celdas de cada fila
	function getFilteredRows(rows) {
		const filteredRows = rows.map((r) => {
			const { cells } = r;
			return getFilteredCells(cells);
		});

		return filteredRows;
	}

	//Obtener los textos de cada celda
	function getFilteredCells(cells) {
		//debugger;
		//let isHeader = false;
		let filteredRows = [];

		const filteredCells = cells.map((c) => c.text);
		const filtered = filterValues(filteredCells);

		filteredRows = filteredRows.length > 0 ? [ ...filteredRows, ...filtered ] : filtered;

		return filteredRows;
	}

	return (
		//retornar
		<InvoiceContext.Provider
			value={{
				modelId: state.modelId,
				fields: state.fields,
				setModelId,
				setAnalysisResult
			}}
		>
			{children}
		</InvoiceContext.Provider>
	);
};

export default InvoiceState;
