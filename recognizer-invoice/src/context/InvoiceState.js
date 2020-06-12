import React, { useReducer } from 'react';
import InvoiceReducer from './InvoiceReducer';
import { ALGO } from '../types';
import InvoiceContext from './InvoiceContext';

const initialState = {
	factura: 'mi factura'
};

const InvoiceState = ({ children }) => {
	const [ state, dispatch ] = useReducer(InvoiceReducer, initialState);

	const agregarFactura = () => {
		dispatch({
			type: ALGO
		});
	};

	return (
		<InvoiceContext.Provider
			value={{
				factura: state.factura,
				agregarFactura
			}}
		>
			{children}
		</InvoiceContext.Provider>
	);
};

export default InvoiceState;
