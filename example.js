const TKApi = require('./dist')

const api = new TKApi({
	apiKey: 'l7xx940a7b2120f54091b12efb1adaef1861',
	apiSecret: 'a0e12eb5753047b6be9b5d9cc7c84fc7',
	isSandbox: true
})

api.getAvailability(
	{
		ReducedDataIndicator: false,
		RoutingType: 'r',
		PassengerTypeQuantity: [
			{
				Code: 'adult',
				Quantity: 1
			},
			{
				Code: 'child',
				Quantity: 1
			},
			{
				Code: 'infant',
				Quantity: 0
			}
		],
		OriginDestinationInformation: [
			{
				DepartureDateTime: {
					WindowAfter: 'P0D',
					WindowBefore: 'P0D',
					Date: '14OCT'
				},
				OriginLocation: {
					LocationCode: 'IST',
					MultiAirportCityInd: false
				},
				DestinationLocation: {
					LocationCode: 'ESB',
					MultiAirportCityInd: false
				},
				CabinPreferences: [
					{
						Cabin: 'ECONOMY'
					},
					{
						Cabin: 'BUSINESS'
					}
				]
			},
			{
				DepartureDateTime: {
					WindowAfter: 'P0D',
					WindowBefore: 'P0D',
					Date: '15OCT'
				},
				OriginLocation: {
					LocationCode: 'ESB',
					MultiAirportCityInd: false
				},
				DestinationLocation: {
					LocationCode: 'IST',
					MultiAirportCityInd: false
				},
				CabinPreferences: [
					{
						Cabin: 'ECONOMY'
					},
					{
						Cabin: 'BUSINESS'
					}
				]
			}
		]
	})
	.then(console.log)
	.catch(console.log)



api.getFareFamilyList(
	{
		portList: [
			'IST',
			'JFK'
		],
		isMilesRequest: 'F'
	})
	.then(console.log)
	.catch(console.log)


api.getPortList(
	{
		airlineCode: 'TK',
		languageCode: 'TR'
	})
	.then(console.log)
	.catch(console.log)


api.getTimetable({
	OTA_AirScheduleRQ: {
		OriginDestinationInformation: {
			DepartureDateTime: {
				WindowAfter: 'P3D',
				WindowBefore: 'P3D',
				Date: '2017-10-14'
			},
			OriginLocation: {
				LocationCode: 'IST',
				MultiAirportCityInd: true
			},
			DestinationLocation: {
				LocationCode: 'ESB',
				MultiAirportCityInd: false
			}
		},
		AirlineCode: 'TK',
		FlightTypePref: {
			DirectAndNonStopOnlyInd: false
		}
	},
	returnDate: '2017-10-20',
	scheduleType: 'W',
	tripType: 'R'
})
	.then(console.log)
	.catch(console.log)


api.retrieveReservationDetail(
	{
		UniqueId: 'TT8VN8',
		Surname: 'CELIKTAS'
	})
	.then(console.log)
	.catch(console.log)

api.calculateFlightMiles(
	{
		cabin_code: 'Y',
		card_type: 'EP',
		class_code: '',
		destination: 'IST',
		flightDate: '21.04.2017',
		operatingFlightNumber: 'TK1000',
		origin: 'FRA'
	})
	.then(console.log)
	.catch(console.log)


api.calculateAwardMilesWithTax(
	{
		awardType: 'E',
		wantMoreMiles: 'F',
		isOneWay: 'T',
		departureOrigin: 'IST',
		departureDestination: 'FRA',
		departureDateDay: 12,
		departureDateMonth: 11,
		departureDateYear: 2017
	})
	.then(console.log)
	.catch(console.log)

