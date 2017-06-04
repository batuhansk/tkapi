export default {

	getAvailability: {
		data : {
			OriginDestinationInformation: [
				{
					DepartureDateTime: {},
					OriginLocation: {},
					DestinationLocation: {},
					CabinPreferences: []
				},
				{
					DepartureDateTime: {},
					OriginLocation: {},
					DestinationLocation: {},
					CabinPreferences: [],
				},
			],
			PassengerTypeQuantity: [
				{
					Code: 'adult',
					Quantity: 0
				},
				{
					Code: 'child',
					Quantity: 0
				},
				{
					Code: 'infant',
					Quantity: 0
				}
			]
		}
	},
	getTimetable: {
		data: {
			OTA_AirScheduleRQ:{
				FlightTypePref: {
					DirectAndNonStopOnlyInd: false,
				},
				OriginDestinationInformation: {
					DepartureDateTime: {},
					OriginLocation: {},
					DestinationLocation: {}
				}
			}
		}
	}
}