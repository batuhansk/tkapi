function api() {
    this.config = require('./config');
    this.async = require('async');
    this.request = require('request');

    this.moment = require('moment');
}

api.prototype.initialize = function (apiKey, apiSecret, isSandbox) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.isSandbox = isSandbox;

    this.endpoints = (isSandbox) ? this.config.sandBoxEndpoints : this.config.productionEndPoints;
};

api.prototype.getAvailability = function (opts, callback) {
    if (typeof opts === 'object') {

        var self = this;

        this.async.parallel([
            function (cb) {
                var data = {};

                data.OriginDestinationInformation = [{}, {}];
                data.OriginDestinationInformation[0].DepartureDateTime = {};
                data.OriginDestinationInformation[0].OriginLocation = {};
                data.OriginDestinationInformation[0].DestinationLocation = {};
                data.OriginDestinationInformation[0].CabinPreferences = [];

                data.OriginDestinationInformation[1].DepartureDateTime = {};
                data.OriginDestinationInformation[1].OriginLocation = {};
                data.OriginDestinationInformation[1].DestinationLocation = {};
                data.OriginDestinationInformation[1].CabinPreferences = [];

                data.PassengerTypeQuantity =
                    [{
                        'Code': 'adult',
                        'Quantity': 0
                    },
                    {
                        'Code': 'child',
                        'Quantity': 0
                    },
                    {
                        'Code': 'infant',
                        'Quantity': 0
                    }];

                if (typeof opts.reducedDataIndicator === 'undefined' || opts.reducedDataIndicator !== true && opts.reducedDataIndicator !== false)
                    return callback(new Error('reducedDataIndicator must be boolean type!'));

                data.ReducedDataIndicator = opts.reducedDataIndicator;

                if (typeof opts.routingType === 'undefined' || opts.routingType !== 'O' && opts.routingType !== 'R' && opts.routingType !== 'M')
                    return callback(new Error('routingType must be \'O(One way)\' or \'R(Round trip)\' or \'M(Multicity)\''));

                data.RoutingType = opts.routingType;

                if (typeof opts.targetSource !== 'undefined' && opts.targetSource === 'AWT')
                    data.TargetSource = 'AWT';

                if (typeof opts.passengerTypeQuantity !== 'undefined' && Array.isArray(opts.passengerTypeQuantity)) {
                    for (var i = 0; i < opts.passengerTypeQuantity.length; i++) {
                        var code = opts.passengerTypeQuantity[i].code,
                            qty = opts.passengerTypeQuantity[i].quantity;

                        if (typeof code !== 'undefined' && typeof qty !== 'undefined') {
                            for (var p = 0; p < data.PassengerTypeQuantity.length; p++) {
                                if (data.PassengerTypeQuantity[p].Code === code)
                                    data.PassengerTypeQuantity[p].Quantity = qty;
                            }
                        }
                        else
                            return callback(new Error('passengerTypeQuantity is missing and incorrect!'));
                    }
                }
                else
                    return callback(new Error('passengerTypeQuantity must declare as Array when call the function!'));

                if (typeof opts.originDestInfo !== 'undefined' && Array.isArray(opts.originDestInfo)) {
                    var len = opts.originDestInfo.length;
                    
                    if(len !== 2)
                        return callback(new Error('originDestInfo must have two entrances for departure and return.')); 

                    for (var i = 0; i < len; i++) {
                        var info = opts.originDestInfo[i];

                        if (typeof info.windowAfter === 'undefined' || info.windowAfter !== 'P0D' && info.windowAfter !== 'P3D')
                            return callback(new Error('windowAfter must be "P0D" or "P3D". Your input is invalid!'));

                        data.OriginDestinationInformation[i].DepartureDateTime.WindowAfter = info.windowAfter;

                        if (typeof info.windowBefore === 'undefined' || info.windowBefore !== 'P0D' && info.windowBefore !== 'P3D')
                            return callback(new Error('windowBefore must be "P0D" or "P3D". Your input is invalid!'));

                        data.OriginDestinationInformation[i].DepartureDateTime.WindowBefore = info.windowBefore;

                        if (typeof info.departureDate === 'undefined')
                            return callback(new Error('departureShortDate is missing.'));
                        else {
                            var date = self.moment(info.departureDate, 'YYYY-MM-DD');

                            if (!date.isValid())
                                return callback(new Error('departureDate must be defined like this format. \'YYYY-MM-DD\''));

                            data.OriginDestinationInformation[i].DepartureDateTime.Date = date.format('DDMMM').toUpperCase();
                        }

                        if (typeof info.originInfo === 'undefined')
                            return callback(new Error('originInfo is missing!'));

                        if (typeof info.originInfo.locationCode === 'undefined' || info.originInfo.locationCode.length !== 3)
                            return callback(new Error('originInfo.locationCode is invalid! locationCode must be 3 digit. I.E. "IST", "OGU"'));

                        data.OriginDestinationInformation[i].OriginLocation.LocationCode = info.originInfo.locationCode;

                        if (typeof info.originInfo.multiAirportCityInd !== 'boolean')
                            return callback(new Error('originInfo.multiAirportCityInd is invalid! multiAirportCityInd must be boolean type!'));

                        data.OriginDestinationInformation[i].OriginLocation.MultiAirportCityInd = info.originInfo.multiAirportCityInd;

                        if (typeof info.destInfo === 'undefined')
                            return callback(new Error('destInfo is missing!'));

                        if (typeof info.destInfo.locationCode === 'undefined' || info.destInfo.locationCode.length !== 3)
                            return callback(new Error('destInfo.locationCode is invalid! locationCode must be 3 digit. I.E. "IST", "OGU"'));

                        data.OriginDestinationInformation[i].DestinationLocation.LocationCode = info.destInfo.locationCode;

                        if (typeof info.destInfo.multiAirportCityInd !== 'boolean')
                            return callback(new Error('destInfo.multiAirportCityInd is invalid! multiAirportCityInd must be boolean type!'));

                        data.OriginDestinationInformation[i].DestinationLocation.MultiAirportCityInd = info.destInfo.multiAirportCityInd;

                        if (typeof info.cabinPreferences === 'undefined' || !Array.isArray(info.cabinPreferences))
                            return callback(new Error('cabinPreferences must declare as Array when call the function!'));
                        else {
                            for (var r = 0; r < info.cabinPreferences.length; r++) {
                                if (info.cabinPreferences[r].Cabin == 'ECONOMY' || info.cabinPreferences == 'BUSINESS')
                                    data.OriginDestinationInformation[i].CabinPreferences.push(info.cabinPreferences[r]);
                            }

                            if (info.cabinPreferences.length == 0)
                                return callback(new Error('cabinPreferences should not be empty!'));
                        }
                    }

                    cb(null, data);
                }
                else
                    return callback(new Error('originDestInfo should not be empty!'))
            },
        ], function (err, data) {
            const options = {
                method: 'POST',
                uri: self.config.apiSettings.apiUrl + self.endpoints.getAvailability,
                headers: {
                    'apikey': self.apiKey,
                    'apisecret': self.apiSecret
                },
                body: data[0],
                json: true
            };

            self.request(options, function (err, res, body) {
                if (err)
                    callback(err);
                else {
                    if (res.statusCode >= 200 && res.statusCode <= 500)
                        callback(null, body);
                }
            });
        });
    }
    else
        return console.log(new Error('Your input is invalid!'));
};

api.prototype.getFareFamilyList = function (opts, callback) {
    if (typeof opts === 'object' && Array.isArray(opts.portList)) {
        if (typeof opts.isMilesRequest === 'undefined' || opts.isMilesRequest !== true && opts.isMilesRequest !== false)
            return callback(new Error('isMilesRequest must be \'T\' or \'F\'.'));

        opts.isMilesRequest = (opts.isMilesRequest) ? 'T' : 'F';

        var self = this;
        var portLength = 0;

        this.async.parallel([
            function (cb) {
                for (var i = 0; i < opts.portList.length; i++) {
                    if (opts.portList[i].length == 3)
                        portLength++;
                }

                cb(null, portLength);
            },
        ], function (err, portLength) {
            if (!portLength > 0)
                return callback(new Error('portList must include IATA port code.'));

            const options = {
                method: 'POST',
                uri: self.config.apiSettings.apiUrl + self.endpoints.getFareFamilyList,
                headers: {
                    'apikey': self.apiKey,
                    'apisecret': self.apiSecret
                },
                body: opts,
                json: true
            };

            self.request(options, function (err, res, body) {
                if (err)
                    callback(err);
                else {
                    if (res.statusCode >= 200 && res.statusCode <= 500)
                        callback(null, body);
                }
            });
        });
    }
    else
        return console.log(new Error('portList must be defined as an Array when call the function!'));
};

api.prototype.getPortList = function (opts, callback) {
    if (typeof opts === 'object' && opts.airlineCode) {
        var qs = {};

        var lc = (typeof opts.languageCode !== 'undefined') ? true : false;

        qs.airlineCode = opts.airlineCode;
        if (lc) qs.languageCode = opts.languageCode;

        const options = {
            method: 'GET',
            uri: this.config.apiSettings.apiUrl + this.endpoints.getPortList,
            qs: qs,
            headers: {
                'apikey': this.apiKey,
                'apisecret': this.apiSecret
            },
            json: true
        };

        this.request(options, function (err, res, body) {
            if (err)
                callback(err);
            else {
                if (res.statusCode >= 200 && res.statusCode <= 500)
                    callback(null, body);
            }
        });
    }
    else
        return console.log(new Error('airlineCode must be defined when call the function!'));
};

api.prototype.getTimetable = function (opts, callback) {
    if (typeof opts === 'object') {
        var self = this;

        this.async.parallel([
            function (cb) {
                var data = {};

                data.OTA_AirScheduleRQ = {};
                data.OTA_AirScheduleRQ.FlightTypePref = {};
                data.OTA_AirScheduleRQ.FlightTypePref.DirectAndNonStopOnlyInd = false;

                data.OTA_AirScheduleRQ.OriginDestinationInformation = {};
                data.OTA_AirScheduleRQ.OriginDestinationInformation.DepartureDateTime = {};
                data.OTA_AirScheduleRQ.OriginDestinationInformation.OriginLocation = {};
                data.OTA_AirScheduleRQ.OriginDestinationInformation.DestinationLocation = {};

                if (typeof opts.scheduleType === 'undefined' || opts.scheduleType !== 'W' && opts.scheduleType !== 'M' && opts.scheduleType !== 'D')
                    return callback(new Error('scheduleType must be \'W(Weekly)\' or \'M(Monthly)\' or \'D(Daily).'));

                data.scheduleType = opts.scheduleType;

                if (typeof opts.tripType === 'undefined' || opts.tripType !== 'O' && opts.tripType !== 'R')
                    return callback(new Error('tripType must be \'O(One way)\' or \'R(Round trip)\'.'));

                data.tripType = opts.tripType;

                if (opts.tripType !== 'O') {
                    if (typeof opts.returnDate === 'undefined')
                        return callback(new Error('tripType assigned as round trip. You must call the function with returnDate.'));
                    else {
                        var date = self.moment(opts.returnDate, 'YYYY-MM-DD');

                        if (!date.isValid())
                            return callback(new Error('returnDate must be defined like this format. \'YYYY-MM-DD\''));

                        data.returnDate = opts.returnDate;
                    }
                }

                if (typeof opts.airlineCode !== 'undefined') {
                    if (opts.airlineCode !== 'TK' && opts.airlineCode !== 'AJ')
                        return callback(new Error('AirlineCode must be 2 digit. I.E. "TK", "AJ"'));
                    else
                        data.OTA_AirScheduleRQ.AirlineCode = opts.airlineCode;
                }

                if (typeof opts.departureDate === 'undefined')
                    return callback(new Error('departureDate must be defined!'));
                else {
                    var date = self.moment(opts.departureDate, 'YYYY-MM-DD');

                    if (!date.isValid())
                        return callback(new Error('departureDate must be defined like this format. \'YYYY-MM-DD\''));

                    data.OTA_AirScheduleRQ.OriginDestinationInformation.DepartureDateTime.Date = opts.departureDate;
                }

                if (typeof opts.windowAfter === 'undefined' || opts.windowAfter !== 'P0D' && opts.windowAfter !== 'P3D')
                    return callback(new Error('windowAfter must be "P0D" or "P3D". Your input is invalid!'));

                data.OTA_AirScheduleRQ.OriginDestinationInformation.DepartureDateTime.WindowAfter = opts.windowAfter;

                if (typeof opts.windowBefore === 'undefined' || opts.windowBefore !== 'P0D' && opts.windowBefore !== 'P3D')
                    return callback(new Error('windowBefore must be "P0D" or "P3D". Your input is invalid!'));

                data.OTA_AirScheduleRQ.OriginDestinationInformation.DepartureDateTime.WindowBefore = opts.windowBefore;

                if (typeof opts.originInfo === 'undefined')
                    return callback(new Error('originInfo is missing!'));

                if (typeof opts.originInfo.locationCode === 'undefined' || opts.originInfo.locationCode.length !== 3)
                    return callback(new Error('originInfo.locationCode is invalid! locationCode must be 3 digit. I.E. "IST", "OGU"'));

                data.OTA_AirScheduleRQ.OriginDestinationInformation.OriginLocation.LocationCode = opts.originInfo.locationCode;

                if (typeof opts.originInfo.multiAirportCityInd !== 'boolean')
                    return callback(new Error('originInfo.multiAirportCityInd is invalid! multiAirportCityInd must be boolean type!'));

                data.OTA_AirScheduleRQ.OriginDestinationInformation.OriginLocation.MultiAirportCityInd = opts.originInfo.multiAirportCityInd;

                if (typeof opts.destInfo === 'undefined')
                    return callback(new Error('destInfo is missing!'));

                if (typeof opts.destInfo.locationCode === 'undefined' || opts.destInfo.locationCode.length !== 3)
                    return callback(new Error('destInfo.locationCode is invalid! locationCode must be 3 digit. I.E. "IST", "OGU"'));

                data.OTA_AirScheduleRQ.OriginDestinationInformation.DestinationLocation.LocationCode = opts.destInfo.locationCode;

                if (typeof opts.destInfo.multiAirportCityInd !== 'boolean')
                    return callback(new Error('destInfo.multiAirportCityInd is invalid! multiAirportCityInd must be boolean type!'));

                data.OTA_AirScheduleRQ.OriginDestinationInformation.DestinationLocation.MultiAirportCityInd = opts.destInfo.multiAirportCityInd;

                cb(null, data);
            }
        ], function (err, data) {
            const options = {
                method: 'POST',
                uri: self.config.apiSettings.apiUrl + self.endpoints.getTimetable,
                headers: {
                    'apikey': self.apiKey,
                    'apisecret': self.apiSecret
                },
                body: data[0],
                json: true
            };

            self.request(options, function (err, res, body) {
                if (err)
                    callback(err);
                else {
                    if (res.statusCode >= 200 && res.statusCode <= 500)
                        callback(null, body);
                }
            });
        });
    }
    else
        return console.log(new Error('tripType and scheduleType must be defined when call the function!'));
};

api.prototype.retrieveReservationDetail = function (opts, callback) {
    if (typeof opts === 'object' && opts.uniqueId && opts.surname) {
        var qs = {};

        qs.UniqueId = opts.uniqueId;
        qs.Surname = opts.surname;

        const options = {
            method: 'GET',
            uri: this.config.apiSettings.apiUrl + this.endpoints.retrieveReservationDetail,
            qs: qs,
            headers: {
                'apikey': this.apiKey,
                'apisecret': this.apiSecret
            },
            json: true
        };

        this.request(options, function (err, res, body) {
            if (err)
                callback(err);
            else {
                if (res.statusCode >= 200 && res.statusCode <= 500)
                    callback(null, body);
            }
        });
    }
    else
        return console.log(new Error('uniqueId(PNR) and surname must be entered completely! Your input is invalid!'));

};

module.exports = api;