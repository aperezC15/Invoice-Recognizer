import React, { useReducer } from 'react';
import InvoiceReducer from './InvoiceReducer';
import { SET_MODELID } from '../types';
import InvoiceContext from './InvoiceContext';

const initialState = {
	modelId: null
};

const InvoiceState = ({ children }) => {
	const [ state, dispatch ] = useReducer(InvoiceReducer, initialState);

	const setModelId = (id) => {
		dispatch({
			type: SET_MODELID,
			payload: id
		});
	};

	return (
		<InvoiceContext.Provider
			value={{
				modelId: state.modelId,
				setModelId
			}}
		>
			{children}
		</InvoiceContext.Provider>
	);
};

export default InvoiceState;
