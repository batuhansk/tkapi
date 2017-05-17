function api() {
    this.config = require('./config');
    this.request = require('request');
}

api.prototype.initialize = function (apiKey, apiSecret, isSandbox) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.isSandbox = isSandbox;

    this.endpoints = (isSandbox) ? this.config.sandBoxEndpoints : this.config.productionEndPoints;
};

api.prototype.getAvailability = function (data, callback) {
    const options = {
        method: 'POST',
        uri: this.config.apiSettings.apiUrl + this.endpoints.getAvailability,
        headers: {
            'apikey': this.apiKey,
            'apisecret': this.apiSecret
        },
        body: data,
        json: true
    };

    this.request(options, function (err, res, body) {
        if (err)
            callback(err);
        else {
            if (res.statusCode >= 200 && res.statusCode <= 499)
                callback(null, body);
        }
    });
};

api.prototype.getFareFamilyList = function (data, callback) {
    const options = {
        method: 'POST',
        uri: this.config.apiSettings.apiUrl + this.endpoints.getFareFamilyList,
        headers: {
            'apikey': this.apiKey,
            'apisecret': this.apiSecret
        },
        body: data,
        json: true
    };

    this.request(options, function (err, res, body) {
        if (err)
            callback(err);
        else {
            if (res.statusCode >= 200 && res.statusCode <= 499)
                callback(null, body);
        }
    });
};

api.prototype.getPortList = function (data, callback) {
    const options = {
        method: 'GET',
        uri: this.config.apiSettings.apiUrl + this.endpoints.getPortList,
        headers: {
            'apikey': this.apiKey,
            'apisecret': this.apiSecret
        },
        body: data,
        json: true
    };

    this.request(options, function (err, res, body) {
        if (err)
            callback(err);
        else {
            if (res.statusCode >= 200 && res.statusCode <= 499)
                callback(null, body);
        }
    });
};

api.prototype.getTimetable = function (data, callback) {
    const options = {
        method: 'POST',
        uri: this.config.apiSettings.apiUrl + this.endpoints.getTimeTable,
        headers: {
            'apikey': this.apiKey,
            'apisecret': this.apiSecret
        },
        body: data,
        json: true
    };

    this.request(options, function (err, res, body) {
        if (err)
            callback(err);
        else {
            if (res.statusCode >= 200 && res.statusCode <= 499)
                callback(null, body);
        }
    });
};

api.prototype.retrieveReservationDetail = function (data, callback) {
    const options = {
        method: 'GET',
        uri: this.config.apiSettings.apiUrl + this.endpoints.getTimeTable,
        headers: {
            'apikey': this.apiKey,
            'apisecret': this.apiSecret
        },
        body: data,
        json: true
    };

    this.request(options, function (err, res, body) {
        if (err)
            callback(err);
        else {
            if (res.statusCode >= 200 && res.statusCode <= 499)
                callback(null, body);
        }
    });
};

module.exports = api;