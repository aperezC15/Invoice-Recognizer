import { SET_MODELID, SET_ANALYSIS_RESULT } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_MODELID:
			return {
				...state,
				modelId: action.payload
			};
		case SET_ANALYSIS_RESULT:
			return {
				...state,
				analysisResult: action.payload
			};
		default:
			return state;
	}
};
