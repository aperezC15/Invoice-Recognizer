import { SET_MODELID, SET_FIELDS, SET_TABLES, GET_TABLES } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_MODELID:
			return {
				...state,
				modelId: action.payload
			};
		case SET_FIELDS:
			return {
				...state,
				fields: action.payload
			};
		case GET_TABLES:
			return {
				...state,
				tables: action.payload
			};
		case SET_TABLES:
			return {
				...state,
				resultados: action.payload
			};
		default:
			return state;
	}
};
