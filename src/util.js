import * as defaults from './defaults'

const getAvailabilityValidate = async (opts) => {
	if (typeof opts === 'object') {
		
		let data = defaults.getAvailability.data

		if (typeof opts.reducedDataIndicator === 'undefined' || opts.reducedDataIndicator !== true && opts.reducedDataIndicator !== false) {
			throw new Error('reducedDataIndicator must be boolean type!')
		}
            
		data.ReducedDataIndicator = opts.reducedDataIndicator               

        if (typeof opts.routingType === 'undefined' || opts.routingType !== 'O' && opts.routingType !== 'R' && opts.routingType !== 'M') {
        	throw new Error(`routingType must be 'O(One way)' or 'R(Round trip)' or 'M(Multicity)'`)
        }

        data.RoutingType = opts.routingType;

        if (typeof opts.targetSource !== 'undefined' && opts.targetSource === 'AWT'){
        	data.TargetSource = 'AWT'
        }
        
        if (typeof opts.passengerTypeQuantity !== 'undefined' && Array.isArray(opts.passengerTypeQuantity)) {
            for (let i = 0; i < opts.passengerTypeQuantity.length; i++) {
            	let code = opts.passengerTypeQuantity[i].code,
                    qty = opts.passengerTypeQuantity[i].quantity;

                if (typeof code !== 'undefined' && typeof qty !== 'undefined') {
                    for (let p = 0; p < data.PassengerTypeQuantity.length; p++) {
                        if (data.PassengerTypeQuantity[p].Code === code)
                            data.PassengerTypeQuantity[p].Quantity = qty;
                    }
                } else {
                    throw new Error('passengerTypeQuantity is missing and incorrect!')
                }
            }
        } else {
        	throw new Error('passengerTypeQuantity must declare as Array when call the function!')
        }



        if (typeof opts.originDestInfo !== 'undefined' && Array.isArray(opts.originDestInfo)) {
        	let len = opts.originDestInfo.length;
                    
            if(len !== 2) {
            	throw new Error('originDestInfo must have two entrances for departure and return.')
            }
                        

            for (let i = 0; i < len; i++) {
                
                let info = opts.originDestInfo[i];        
            	
            	if (typeof info.windowAfter === 'undefined' || info.windowAfter !== 'P0D' && info.windowAfter !== 'P3D') {
            		        throw new Error('windowAfter must be "P0D" or "P3D". Your input is invalid!')
            	}
                    

                data.OriginDestinationInformation[i].DepartureDateTime.WindowAfter = info.windowAfter;

                if (typeof info.windowBefore === 'undefined' || info.windowBefore !== 'P0D' && info.windowBefore !== 'P3D'){
                    throw new Error('windowBefore must be "P0D" or "P3D". Your input is invalid!')
                }

                data.OriginDestinationInformation[i].DepartureDateTime.WindowBefore = info.windowBefore;

                if (typeof info.departureDate === 'undefined'){
                	throw new Error('departureShortDate is missing.')
                } else {

                  let valid = isValidDate(info.departureDate);

                   if (!valid){
                   	    throw new Error(`departureDate must be defined like this format. 'YYYY-MM-DD'`)
                   }
                    

                   data.OriginDestinationInformation[i].DepartureDateTime.Date = info.departureDate;
                }

                if (typeof info.originInfo === 'undefined'){
                	throw new Error('originInfo is missing!')
                }
                    
                if (typeof info.originInfo.locationCode === 'undefined' || info.originInfo.locationCode.length !== 3){
              		throw new Error('originInfo.locationCode is invalid! locationCode must be 3 digit. I.E. "IST", "OGU"')
                }
                    
                data.OriginDestinationInformation[i].OriginLocation.LocationCode = info.originInfo.locationCode;

                if (typeof info.originInfo.multiAirportCityInd !== 'boolean'){
                    throw new Error('originInfo.multiAirportCityInd is invalid! multiAirportCityInd must be boolean type!')
                }

                data.OriginDestinationInformation[i].OriginLocation.MultiAirportCityInd = info.originInfo.multiAirportCityInd;

                if (typeof info.destInfo === 'undefined'){
                	throw new Error('destInfo is missing!')
                }
                    

              	if (typeof info.destInfo.locationCode === 'undefined' || info.destInfo.locationCode.length !== 3){
              	    throw new Error('destInfo.locationCode is invalid! locationCode must be 3 digit. I.E. "IST", "OGU"')
              	}
    
                data.OriginDestinationInformation[i].DestinationLocation.LocationCode = info.destInfo.locationCode;

                if (typeof info.destInfo.multiAirportCityInd !== 'boolean'){
              		        throw new Error('destInfo.multiAirportCityInd is invalid! multiAirportCityInd must be boolean type!')
                }
                    
                data.OriginDestinationInformation[i].DestinationLocation.MultiAirportCityInd = info.destInfo.multiAirportCityInd;

                if (typeof info.cabinPreferences === 'undefined' || !Array.isArray(info.cabinPreferences)){
               		throw new Error('cabinPreferences must declare as Array when call the function!')
                } else {
                	for (let r = 0; r < info.cabinPreferences.length; r++) {
                        if (info.cabinPreferences[r].Cabin == 'ECONOMY' || info.cabinPreferences == 'BUSINESS')
                            data.OriginDestinationInformation[i].CabinPreferences.push(info.cabinPreferences[r]);
                    }            
                }

                if (info.cabinPreferences.length == 0){
                    throw new Error('cabinPreferences should not be empty!')
                }

            }

            return data


        } else {
        	throw new Error('originDestInfo should not be empty!')
        }


	} else {
		throw new Error('Your input is invalid!')
	}
} 

const getFareFamilyListValidate = async (opts) => {
	if (typeof opts === 'object' && Array.isArray(opts.portList)) {
		
		if (typeof opts.isMilesRequest === 'undefined' || opts.isMilesRequest !== true && opts.isMilesRequest !== false) {
			throw new Error(`isMilesRequest must be 'T' or 'F'.`)
		}

        opts.isMilesRequest = (opts.isMilesRequest) ? 'T' : 'F';

        let portLength = 0

        for (let i = 0; i < opts.portList.length; i++) {
            if (opts.portList[i].length == 3)
                portLength++;
        }

        if (!portLength > 0) {
            throw new Error('portList must include IATA port code.')
        }

        return opts

	} else {
		throw new Error('portList must be defined as an Array when call the function!')
	}

}

const getPortListValidate = async (opts) => {
	if (typeof opts === 'object' && opts.airlineCode) {
		let data = {}

        let lc = (typeof opts.languageCode !== 'undefined') ? true : false;

        data.airlineCode = opts.airlineCode;
        if (lc) {
        	data.languageCode = opts.languageCode
        }

        return data
	} else {
		throw new Error('airlineCode must be defined when call the function!')
	}

}

const getTimetableValidate = async (opts) => {
	if (typeof opts === 'object') {
		let data = defaults.getTimetable.data

		if (typeof opts.scheduleType === 'undefined' || opts.scheduleType !== 'W' && opts.scheduleType !== 'M' && opts.scheduleType !== 'D'){
			throw new Error(`scheduleType must be 'W(Weekly)' or 'M(Monthly)' or 'D(Daily).`)
		}
                    

        data.scheduleType = opts.scheduleType;

        if (typeof opts.tripType === 'undefined' || opts.tripType !== 'O' && opts.tripType !== 'R'){
        	throw new Error(`tripType must be 'O(One way)' or 'R(Round trip)'.`);
        }

        data.tripType = opts.tripType;

        if (opts.tripType !== 'O') {
            if (typeof opts.returnDate === 'undefined'){
            	    throw new Error('tripType assigned as round trip. You must call the function with returnDate.');
            } else {
            	var isValid = isValidDate(opts.returnDate);

                if (!isValid){
                	throw new Error(`returnDate must be defined like this format. 'YYYY-MM-DD'`);
                }
                data.returnDate = opts.returnDate;
            }	
        }


        if (typeof opts.airlineCode !== 'undefined') {
            if (opts.airlineCode !== 'TK' && opts.airlineCode !== 'AJ') {
            	throw new Error('AirlineCode must be 2 digit. I.E. "TK", "AJ"')
            }
            
            data.OTA_AirScheduleRQ.AirlineCode = opts.airlineCode;
        }


        if (typeof opts.departureDate === 'undefined'){
        	throw new Error('departureDate must be defined!')
        } else {
          	let valid = isValidDate(opts.departureDate)

            if (!valid){
            	throw new Error(`departureDate must be defined like this format. 'YYYY-MM-DD'`)
           	}                

            data.OTA_AirScheduleRQ.OriginDestinationInformation.DepartureDateTime.Date = opts.departureDate;
        }

        if (typeof opts.windowAfter === 'undefined' || opts.windowAfter !== 'P0D' && opts.windowAfter !== 'P3D') {
         	throw new Error('windowAfter must be "P0D" or "P3D". Your input is invalid!')
        }
                    

        data.OTA_AirScheduleRQ.OriginDestinationInformation.DepartureDateTime.WindowAfter = opts.windowAfter;

        if (typeof opts.windowBefore === 'undefined' || opts.windowBefore !== 'P0D' && opts.windowBefore !== 'P3D') {
        	throw new Error('windowBefore must be "P0D" or "P3D". Your input is invalid!')	
        }
		
		data.OTA_AirScheduleRQ.OriginDestinationInformation.DepartureDateTime.WindowBefore = opts.windowBefore;

        if (typeof opts.originInfo === 'undefined') {
        	throw new Error('originInfo is missing!')
        }

        if (typeof opts.originInfo.locationCode === 'undefined' || opts.originInfo.locationCode.length !== 3) {
      		throw new Error('originInfo.locationCode is invalid! locationCode must be 3 digit. I.E. "IST", "OGU"')
        }
            
        data.OTA_AirScheduleRQ.OriginDestinationInformation.OriginLocation.LocationCode = opts.originInfo.locationCode;

       	if (typeof opts.originInfo.multiAirportCityInd !== 'boolean') {
       		throw new Error('originInfo.multiAirportCityInd is invalid! multiAirportCityInd must be boolean type!')
       	}
        
        data.OTA_AirScheduleRQ.OriginDestinationInformation.OriginLocation.MultiAirportCityInd = opts.originInfo.multiAirportCityInd;

        if (typeof opts.destInfo === 'undefined') {
        	throw new Error('destInfo is missing!')
        }
            
		if (typeof opts.destInfo.locationCode === 'undefined' || opts.destInfo.locationCode.length !== 3) {
		    throw new Error('destInfo.locationCode is invalid! locationCode must be 3 digit. I.E. "IST", "OGU"')
		}
            
        data.OTA_AirScheduleRQ.OriginDestinationInformation.DestinationLocation.LocationCode = opts.destInfo.locationCode;

        if (typeof opts.destInfo.multiAirportCityInd !== 'boolean') {
        	        throw new Error('destInfo.multiAirportCityInd is invalid! multiAirportCityInd must be boolean type!')
        }
            

        data.OTA_AirScheduleRQ.OriginDestinationInformation.DestinationLocation.MultiAirportCityInd = opts.destInfo.multiAirportCityInd;

        return data
                    
	} else {
		throw new Error('tripType and scheduleType must be defined when call the function!')
	}
}


const retrieveReservationDetailValidate = async (opts) => {
	if(typeof opts === 'object' && opts.uniqueId && opts.surname){
		let  data =   {
  			UniqueId : opts.uniqueId,
        	Surname : opts.surname
  		}

  		return data
	} else {
		throw new Error('uniqueId(PNR) and surname must be entered completely! Your input is invalid!')
	}
}

const isValidDate = (date) => {
    let d = new Date(date)
    return d.isValid();
}

// Monkey Patch
Date.prototype.isValid = function () {
    
    return this.getTime() === this.getTime();
    
}; 

export default{
	getAvailabilityValidate,
	getFareFamilyListValidate,
	getPortListValidate,
	getTimetableValidate,
	retrieveReservationDetailValidate,
}