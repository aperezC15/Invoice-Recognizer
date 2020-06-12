import { ALGO } from '../types';

export default (state, action) => {
	switch (action.type) {
		case ALGO:
			return {
				...state,
				factura: 'mifactura'
			};
		default:
			return state;
	}
};
