export default {
    apiSettings : {
        apiUrl: 'https://api.turkishairlines.com/'
    },
    sandBoxEndpoints : {
        getAvailability: 'test/getAvailability',
        getFareFamilyList: 'test/getFareFamilyList',
        getPortList: 'test/getPortList',
        getTimetable: 'test/getTimeTable',
        retrieveReservationDetail: 'test/retrieveReservationDetail'
    },
    productionEndPoints : {
        getAvailability: 'getAvailability',
        getFareFamilyList: 'getFareFamilyList',
        getPortList: 'getPortList',
        getTimetable: 'getTimeTable',
        retrieveReservationDetail: 'retrieveReservationDetail'
    }
}