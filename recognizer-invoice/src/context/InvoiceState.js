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
		const field = [];
		const { pages } = result[0];

		//obtener fields por página
		for (let i = 0; i < result.length; i++) {
			const { fields } = result[i];
			field.push(fields);
		}

		console.log('fields', field);
		console.log('pages con destructuracion', pages);
		//console.log('imprimir fields', fields);

		//setFields(field);
		getTables(pages);
	};

	const getTables = (pages) => {
		const eachTable = [];
		const arrayrows = [];
		const countFilas = [];
		const eachRow = [];
		const allCells = [];
		const countCellsRows = [];
		const eachCells = [];
		const itemCells = [];
		const textCells = [];
		const countText = [];
		const textPerRows = [];
		let k = 0;
		let c = 0;

		//obtener las tables
		for (let i = 0; i < pages.length; i++) {
			eachTable.push(pages[i].tables);
		}

		console.log('imprimir tablas', eachTable);

		//obtener las array para llegar a las filas
		for (let i = 0; i < eachTable.length; i++) {
			eachTable[i].forEach((rows) => arrayrows.push(rows));
		}

		console.log('imprimir filas', arrayrows);

		//obtener las rows
		for (let i = 0; i < arrayrows.length; i++) {
			const { rows } = arrayrows[i];
			eachRow.push(rows);
		}
		console.log('imprimir cada fila', eachRow);

		//obtener arreglo de celdas
		for (let i = 0; i < eachTable.length; i++) {
			eachRow[i].forEach((cells) => allCells.push(cells));
		}
		console.log('imprimir arreglo de celdas', allCells);

		//obtener cada cells, cada cells incluye un array
		for (let i = 0; i < allCells.length; i++) {
			const { cells } = allCells[i];
			eachCells.push(cells);
		}
		console.log('imprimir cada arreglo de celda', eachCells);

		//obtener cada posicion de los arreglos de eachCells
		for (let i = 0; i < allCells.length; i++) {
			eachCells[i].forEach((text) => itemCells.push(text));
		}
		console.log('imprimir item de los arreglos de celdas', itemCells);

		//obtener los textos de cada item de itemCells
		for (let i = 0; i < itemCells.length; i++) {
			const { text } = itemCells[i];
			textCells.push(text);
		}
		console.log('imprimir textos', textCells);

		/*********************************************************/
		//obtener la cantidad de filas por tabla
		for (let i = 0; i < arrayrows.length; i++) {
			const { rowCount } = arrayrows[i];
			countFilas.push(rowCount);
		}

		console.log('imprimir cantidad filas', countFilas);

		//obtener la cantidad de items por arreglo de celda
		for (let i = 0; i < arrayrows.length; i++) {
			countCellsRows.push(eachCells[i].length);
		}
		console.log('imprimir cantidad de items por fila', countCellsRows);

		//calcular la cantidad de elementos que se van a dividir
		for (let i = 0; i < arrayrows.length; i++) {
			countText.push(countFilas[i] * countCellsRows[i]);
		}
		console.log('imprimir cAlculo de elmentos a guardar', countText);

		//guardar los textos por cantidad de elementos por fila
		for (let i = 0; i < arrayrows.length; i++) {
			for (let j = 0; j < countText[i]; j++) {
				if (textPerRows[k] === undefined) {
					textPerRows[k] = [];
				}
				textPerRows[k].push(textCells[c]);
				c++;
			}
			k++;
		}
		console.log('imprimir textos por tabla', textPerRows);
	};

	const setFields = (field) => {
		//debugger;
		const labels = Object.keys(field),
			keys = Object.values(field);
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

		let j = 0;
		//guardar nombres excepto República
		for (let i = 0; i < name.length; i++) {
			if (name[j] !== 'REPUBLICA DE GUATEMALA, C. A.') {
				nombres.push(name[j]);
			}
			j++;
		}
		//console.log('array name', name);
		//debugger;
		//guardar los nombres y DPI en un arreglo
		for (let f = 0; f < dpi.length; f++) {
			result.push({ numero: dpi[f], nombre: nombres[f] });
		}

		//console.log('array completos', result);

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
