import React, { createContext, useReducer } from 'react';

export const CheckinContext = createContext();
import { checkinReducer } from '../../reducer/checkinReducer';

export const CheckinContextProvider = (props) => {

	const initialState = {
		hotel_destination: '',
		hotel_checkIn: '',
		hotel_checkOut: '',
		hotel_people: 0
	}

	const [state, dispatch] = useReducer(checkinReducer, initialState);

	const handleChange = e => {
		dispatch({ type: 'CHANGE_HOTEL_DESTINATION', payload: e.target.value });
	};

	const selectDate = e => {
		console.log(e.target);

		console.log(document.querySelector('.date-name'))
	}

	const formatDates = e => {
		const formatArray = [];
		const len = e.target.value.length;
		let slash = ' / ';

		/// IF WE WANT TO TYPE 
		for (let i = 0; i <= len; i++) {

			if (i === 0) formatArray.push(e.target.value.substring(i, i + 2));

			if (i === 2) formatArray.push(slash);

			if (i === 5) formatArray.push(e.target.value.substring(i, i + 2));

			if (i === 7) formatArray.push(slash);

			if (i === 10) formatArray.push(e.target.value.substring(i, i + 4));
		}

		this.setState({ [e.target.id]: formatArray.join("") });
	}

	return (
		<CheckinContext.Provider value={{
			...state,
			handleChange,
			formatDates,
			selectDate
		}}>
			{props.children}
		</CheckinContext.Provider>
	)
}

export default CheckinContextProvider;
