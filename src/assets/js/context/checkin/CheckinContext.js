import React, { Component, createContext } from 'react';

export const CheckinContext = createContext();

export class CheckinContextProvider extends Component {

	state = {
		hotel_destination: '0000',
		hotel_checkIn: '11 / 11 / 1111',
		hotel_checkOut: '22 / 22 / 2222',
		hotel_people: 33
	}

	handleChange = e => this.setState({ [e.target.id]: e.target.value });

	formatDates = e => {
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

	componentDidMount() {

	}

	render() {

		const { handleChange, formatDates } = this;

		return (
			<CheckinContext.Provider value={{
				...this.state,
				handleChange,
				formatDates
			}}>
				{this.props.children}
			</CheckinContext.Provider>
		)
	}
}

export default CheckinContextProvider;
