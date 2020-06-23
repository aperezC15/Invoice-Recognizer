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
		//const { cells } = result[0];
		//const { rows } = result[0];

		setFields(fields);
		//getTables();
	};

	const setFields = (fields) => {
		//debugger;
		const labels = Object.keys(fields),
			keys = Object.values(fields);
		const fieldCount = labels.length;
		//calcular filas
		//let filas = 10;
		const dpi = [];
		const valores = [];
		const name = [];
		const nombres = [];
		const result = [];
		//console.log('lenght: ', typeof grupos[0]);
		//expresion regular para DPI
		var evaluardpi = /\d{4}\s\d{5}\s\d{4}/;
		//expresiones regulares para nombres
		var evaluarnombre = /[A-Z]+,\s[A-Z]+/;
		var evaluarnombre2 = /[A-Z]+\s,\s[A-Z]+/;

		//guardar en un array los textos
		for (let i = 0; i < fieldCount; i++) {
			valores.push(keys[i].value);
		}
		//console.log(valores);

		//obtener los DPI
		for (let i = 0; i < fieldCount; i++) {
			if (valores[i].match(evaluardpi)) {
				dpi.push(keys[i].value);
			}
		}
		//console.log('array DPI', dpi);

		//evaluar e ir guardando los nombres
		for (let i = 0; i < fieldCount; i++) {
			if (valores[i].match(evaluarnombre) || valores[i].match(evaluarnombre2)) {
				name.push(keys[i].value);
			}
		}
		debugger;
		let j = 0;
		//guardar nombres excepto República
		for (let i = 0; i < name.length; i++) {
			if (name[j] !== 'REPUBLICA DE GUATEMALA, C. A.') {
				nombres.push(name[j]);
			}
			j++;
		}
		console.log('array name', name);
		//debugger;
		//guardar los nombres y DPI en un arreglo
		for (let f = 0; f < dpi.length; f++) {
			result.push({ numero: dpi[f], nombre: nombres[f] });
		}

		console.log('array nombres', nombres);

		dispatch({
			type: SET_FIELDS,
			payload: result
		});
	}; //end setFields

	/*
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
	}*/

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
