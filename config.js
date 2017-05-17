var apiSettings = 
{
    apiUrl: 'https://api.turkishairlines.com/'
};

var sandBoxEndpoints =
{   
    getAvailability: 'test/getAvailability',
    getFareFamilyList: 'test/getFareFamilyList',
    getPortList: 'test/getPortList',
    getTimetable: 'test/getTimetable',
    retrieveReservationDetail: 'test/retrieveReservationDetail'
};

var productionEndPoints = 
{
    getAvailability: 'getAvailability',
    getFareFamilyList: 'getFareFamilyList',
    getPortList: 'getPortList',
    getTimetable: 'getTimetable',
    retrieveReservationDetail: 'retrieveReservationDetail'
};

exports.apiSettings = apiSettings;
exports.sandBoxEndpoints = sandBoxEndpoints;
exports.productionEndPoints = productionEndPoints;