import 'babel-polyfill'
import got from 'got'
import qs from 'query-string'
import * as config from './config'

export default class TKApi {
  constructor({ apiKey = null, apiSecret = null, isSandbox = false }) {

    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.isSandbox = isSandbox

    this.endpoints = (isSandbox) ? config.sandBoxEndpoints : config.productionEndPoints

  }

  async getAvailability(opts) {
    try {
      return this.postRequest(this.endpoints.getAvailability, opts)
    }
    catch (err) {
      return err
    }
  }

  async getFareFamilyList(opts) {
    try {
      return this.postRequest(this.endpoints.getFareFamilyList, opts)
    }
    catch (err) {
      return err
    }

  }

  async getPortList(opts) {
    try {
      return this.getRequest(this.endpoints.getPortList, opts)
    }
    catch (err) {
      return err
    }

  }

  async getTimetable(opts) {
    try {
      return this.postRequest(this.endpoints.getTimetable, opts)
    }
    catch (err) {
      return err
    }
  }

  async retrieveReservationDetail(opts) {
    try {
      return this.getRequest(this.endpoints.retrieveReservationDetail, opts)
    }
    catch (err) {
      return err
    }
  }

  async calculateFlightMiles(opts) {
    try {
      return this.postRequest(this.endpoints.calculateFlightMiles, opts)
    }
    catch (err) {
      return err
    }
  }

  async calculateAwardMilesWithTax(opts) {
    try {
      return this.postRequest(this.endpoints.calculateAwardMilesWithTax, opts)
    }
    catch (err) {
      return err
    }
  }

  async getRequest(path, data) {
    try {
      const queryString = qs.stringify(data);

      let response = await got.get(`${config.apiSettings.apiUrl}${path}?${queryString}`, {
        headers: {
          apikey: this.apiKey,
          apisecret: this.apiSecret
        },
        json: true
      })

      return response.body
    } catch (err) {
      return err
    }
  }

  async postRequest(path, data) {
    try {
      let response = await got.post(`${config.apiSettings.apiUrl}${path}`, {
        headers: {
          apikey: this.apiKey,
          apisecret: this.apiSecret
        },
        body: data,
        json: true
      })

      return response.body
    } catch (err) {
      return err
    }
  }
}