var tkApi = require('../api');

var api = new tkApi();

api.initialize('l7xx940a7b2120f54091b12efb1adaef1861', '7d5822a0eaec4d679361bbc9aba35363', true);

var data = {};

api.getAvailability(data, function (err, data) {
    if (err)
        return console.log(err);

    console.log(data);
});

api.getFareFamilyList(data, function (err, data) {
    if (err)
        return console.log(err);

    console.log(data);
});

api.getPortList(data, function (err, data) {
    if (err)
        return console.log(err);

    console.log(data);
});

api.getTimetable(data, function (err, data) {
    if (err)
        return console.log(err);

    console.log(data);
});

api.retrieveReservationDetail(data, function (err, data) {
    if (err)
        return console.log(err);

    console.log(data);
});