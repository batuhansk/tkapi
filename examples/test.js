var tkApi = require('../api');

var api = new tkApi();

api.initialize('l7xx940a7b2120f54091b12efb1adaef1861', '7d5822a0eaec4d679361bbc9aba35363', true);

api.getAvailability(
    {
        reducedDataIndicator: false,
        routingType: 'R',
        passengerTypeQuantity: [
            {
                code: 'child',
                quantity: 1
            }
        ],
        originDestInfo: [
            {
                windowAfter: 'P0D',
                windowBefore: 'P0D',
                departureDate: '2017-10-14',
                originInfo: {
                    locationCode: 'IST',
                    multiAirportCityInd: false
                },
                destInfo: {
                    locationCode: 'ESB',
                    multiAirportCityInd: false
                },
                cabinPreferences: [
                    {
                    	Cabin: "ECONOMY"
                    }
                ]
            },

            {
                windowAfter: 'P0D',
                windowBefore: 'P0D',
                departureDate: '2017-10-24',
                originInfo: {
                    locationCode: 'ESB',
                    multiAirportCityInd: false
                },
                destInfo: {
                    locationCode: 'IST',
                    multiAirportCityInd: false
                },
                cabinPreferences: [
                    {
                    	Cabin: "ECONOMY"
                    }
                ]
            }
        ]
    },
    function (err, data) {
        if (err)
            return console.log(err);

        console.log(data);
    });


api.getFareFamilyList({ portList: ['IST', 'OGU'], isMilesRequest: true }, function (err, data) {
    if (err)
        return console.log(err);

    console.log(data);
});

api.getPortList({ airlineCode: 'TK' }, function (err, data) {
    if (err)
        return console.log(err);

    console.log(data);
});

api.getTimetable(
    {
        scheduleType: 'W',
        tripType: 'R',
        returnDate: '2017-12-23',
        airlineCode: 'TK',
        departureDate: '2017-12-10',
        windowAfter: 'P0D',
        windowBefore: 'P3D',
        originInfo: {
            locationCode: 'IST',
            multiAirportCityInd: true
        },
        destInfo: {
            locationCode: 'OGU',
            multiAirportCityInd: true
        }
    }, function (err, data) {
        if (err)
            return console.log(err);

        console.log(data);
    });


api.retrieveReservationDetail({ uniqueId: 'TT8VN8', surname: 'CELIKTAS' }, function (err, data) {
    if (err)
        return console.log(err);

    console.log(data);
});

