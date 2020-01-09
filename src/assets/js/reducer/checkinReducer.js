export const checkinReducer = (state, action) => {

	switch (action.type) {
		case 'CHANGE_HOTEL_DESTINATION':
			return {
				...state,
				hotel_destination: action.payload
			}

		default: return state;
	}
};