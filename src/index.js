import 'babel-polyfill'
import got from 'got'
import * as config from './config'
import * as util from './util'

export default class TKApi {
	constructor({apiKey = null, apiSecret = null, isSandbox = false}) {
  		
  		this.apiKey = apiKey
    	this.apiSecret = apiSecret
    	this.isSandbox = isSandbox

    	this.endpoints = (isSandbox) ? config.sandBoxEndpoints : config.productionEndPoints

  }

  async getAvailability(opts){

     try {
        const data = await util.getAvailabilityValidate(opts)

        return this.request(this.endpoints.getAvailability,data)

      } catch(err){
        return err
      }

  }

  async getFareFamilyList(opts){
    try {
        const data = await util.getFareFamilyListValidate(opts)

        return this.request(this.endpoints.getFareFamilyList,data)

      } catch(err){
        return err
      }

  }

  async getPortList(opts){

    try {
        const data = await util.getPortListValidate(opts)

        return this.request(this.endpoints.getPortList,data)

      } catch(err){
        return err
      }

  }

  async getTimetable(opts){
    try {
        const data = await util.getTimetableValidate(opts)

        return this.request(this.endpoints.getTimetable,data)

      } catch(err){
        return err
      }

  }

  async retrieveReservationDetail(opts){
  		
      try {
        const data = await util.retrieveReservationDetailValidate(opts)

        return this.request(this.endpoints.retrieveReservationDetail,data)

      } catch(err){
        return err
      }

  }

  async request(path, data){

  	try {

      let response = await got.post(`${config.apiSettings.apiUrl}${path}`, {
        headers: {
          apikey : this.apiKey,
          apisecret : this.apiSecret
        },
        body: data,
        json: true
      })

      return response.body
    } catch(err) {
      return err
    }

  }

}