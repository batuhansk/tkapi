const TKApi = require('./dist')

const api = new TKApi({
	apiKey: 'l7xx940a7b2120f54091b12efb1adaef1861',
	apiSecret: '7d5822a0eaec4d679361bbc9aba35363',
	isSandbox: true
})


//api.getAvailability(
//    {
//        reducedDataIndicator: false,
//        routingType: 'R',
//        passengerTypeQuantity: [
//            {
//                code: 'child',
//                quantity: 1
//            }
//        ],
//        originDestInfo: [
//            {
//                windowAfter: 'P0D',
//                windowBefore: 'P0D',
//                departureDate: '2017-10-14',
//                originInfo: {
//                    locationCode: 'IST',
//                    multiAirportCityInd: false
//                },
//                destInfo: {
//                    locationCode: 'ESB',
//                    multiAirportCityInd: false
//                },
//                cabinPreferences: [
//                    {
//                    	Cabin: "ECONOMY"
//                    }
//                ]
//            },
//
//            {
//                windowAfter: 'P0D',
//                windowBefore: 'P0D',
//                departureDate: '2017-10-24',
//                originInfo: {
//                    locationCode: 'ESB',
//                    multiAirportCityInd: false
//                },
//                destInfo: {
//                    locationCode: 'IST',
//                    multiAirportCityInd: false
//                },
//                cabinPreferences: [
//                    {
//                    	Cabin: "ECONOMY"
//                    }
//                ]
//            }
//        ]
//})
//.then(console.log)
//.catch(console.log)


//api.getFareFamilyList({ portList: ['IST', 'OGU'], isMilesRequest: true })
//.then(console.log)
//.catch(console.log)


//api.getPortList({ airlineCode: 'TK' })
//.then(console.log)
//.catch(console.log)

//api.getTimetable({
// scheduleType: 'W',
// tripType: 'R',
// returnDate: '2017-12-23',
// airlineCode: 'TK',
// departureDate: '2017-12-10',
// windowAfter: 'P0D',
// windowBefore: 'P3D',
// originInfo: {
//     locationCode: 'IST',
//     multiAirportCityInd: true
// },
// destInfo: {
//     locationCode: 'OGU',
//     multiAirportCityInd: true
//}})
//.then(console.log)
//.catch(console.log)


//api.retrieveReservationDetail({ uniqueId: 'TT8VN8', surname: 'CELIKTAS' })
//.then(console.log)
//.catch(console.log)