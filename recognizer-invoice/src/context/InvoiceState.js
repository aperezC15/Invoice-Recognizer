import React, { useReducer } from 'react';
import InvoiceReducer from './InvoiceReducer';
import { SET_MODELID, SET_FIELDS } from '../types';
import InvoiceContext from './InvoiceContext';

const initialState = {
	modelId: '73310f24-95e1-4116-b70c-d04725a5755b',
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
		const { fields } = result[0];
		const { cells } = result[0];
		const { rows } = result[0];

		setFields(fields);
		getTables();
	};

	const setFields = (fields) => {
		debugger;
		const labels = Object.keys(fields),
			keys = Object.values(fields);
		const fieldCount = labels.length;
		//calcular filas
		let filas = Math.ceil(fieldCount / 5);
		const grupos = [];
		const result = [];
		let pg = 0;
		//console.log('lenght: ', typeof grupos[0]);

		//guardar 5 fields en cada grupo
		for (let i = 0; i < fieldCount; i++) {
			if (grupos[pg] === undefined || grupos[pg].length < 5) {
				if (grupos[pg] === undefined) {
					grupos[pg] = [];
				}
				grupos[pg].push({ valueText: keys[i].value });
			} else {
				pg++;
			}
		}

		//guardar en result los grupos para mostrarlos por fila
		for (let f = 0; f < filas; f++) {
			if (result[f] === undefined) {
				result[f] = [];
			}
			result[f].push(grupos[f]);
		}
		console.log(result);
		dispatch({
			type: SET_FIELDS,
			payload: result
		});
	}; //end setFields

	function getCells(cells) {
		var celdas = [ cells.text ];
		return celdas;
	}

	function getName(tables) {
		var fullname = [ tables.columnCount ];
		return fullname;
	}

	function getTables(pages) {
		//var arreglo = [ { nombre: 'Ana', edad: 10 }, { nombre: 'Lety', edad: 20 }, { nombre: 'Rosa', edad: 30 } ];

		//const tabla = Object.values(rows);
		//const celds = rows.map(getName);
		console.log(pages);
	}

	return (
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
