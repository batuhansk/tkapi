import 'babel-polyfill'
import got from 'got'
import * as config from './config'
import * as defaults from './defaults'

export default class TKApi {
	constructor({apiKey = null, apiSecret = null, isSandbox = false}) {
  		
  		this.apiKey = apiKey
    	this.apiSecret = apiSecret
    	this.isSandbox = isSandbox

    	this.endpoints = (isSandbox) ? config.sandBoxEndpoints : config.productionEndPoints

  	}

  	async getAvailability(){

  	}

  	async getFareFamilyList(){

  	}

  	async getPortList(){

  	}

  	async getTimetable(){

  	}

  	async retrieveReservationDetail(opts){
  		if (typeof opts === 'object' && opts.uniqueId && opts.surname) {
  			let  data =   {
  				UniqueId = opts.uniqueId
        		Surname = opts.surname
  			}

  			return this.request(data)
  		} else {
  			return new Error('uniqueId(PNR) and surname must be entered completely! Your input is invalid!')
  		}

  	}

  	async request(data){
  		try {

  			let response = await got.post(`${config.apiSettings.apiUrl}${this.endpoints.getAvailability}`, {
  					headers: {
                	    apikey : this.apiKey,
                	    apisecret : this.apiSecret
                	},
                	body : data,
                	json : true
  				}
  			})

  			return response.body
  		} catch(err){
  			return err
  		}
  	}

}