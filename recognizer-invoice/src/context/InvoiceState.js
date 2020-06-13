import React, { useReducer } from 'react';
import InvoiceReducer from './InvoiceReducer';
import { SET_MODELID, SET_FIELDS } from '../types';
import InvoiceContext from './InvoiceContext';

const initialState = {
	modelId: '73310f24-95e1-4116-b70c-d04725a5755b',
	fields: [],
	tables: []
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

		setFields(fields);
	};

	const setFields = (fields) => {
		const labels = Object.keys(fields),
			keys = Object.values(fields);
		const fieldCount = labels.length;
		const result = [];

		for (let i = 0; i < fieldCount; i++) {
			result.push({ labelText: keys[i].labelText.text, valueText: keys[i].value });
		}

		dispatch({
			type: SET_FIELDS,
			payload: result
		});
	};

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
