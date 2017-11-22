export default {
    apiSettings : {
        apiUrl: 'https://api.turkishairlines.com/'
    },
    sandBoxEndpoints : {
        getAvailability: 'test/getAvailability',
        getFareFamilyList: 'test/getFareFamilyList',
        getPortList: 'test/getPortList',
        getTimetable: 'test/getTimeTable',
        retrieveReservationDetail: 'test/retrieveReservationDetail',
        calculateFlightMiles: 'test/calculateFlightMiles',
        calculateAwardMilesWithTax: 'test/calculateAwardMilesWithTax'
    },
    productionEndPoints : {
        getAvailability: 'getAvailability',
        getFareFamilyList: 'getFareFamilyList',
        getPortList: 'getPortList',
        getTimetable: 'getTimeTable',
        retrieveReservationDetail: 'retrieveReservationDetail',
        calculateFlightMiles: 'calculateFlightMiles',
        calculateAwardMilesWithTax: 'calculateAwardMilesWithTax'
    }
}