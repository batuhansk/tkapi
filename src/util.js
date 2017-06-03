import * as defaults from './defaults'

const getAvailabilityValidate = async () => {

} 

const getFareFamilyListValidate = async () => {

}

const getPortListValidate = async () => {

}

const getTimetableValidate = async () => {
	if (typeof opts === 'object') {

	} else {
		return new Error('tripType and scheduleType must be defined when call the function!')
	}
}


const retrieveReservationDetailValidate = async (opts) => {
	if(typeof opts === 'object' && opts.uniqueId && opts.surname){
		let  data =   {
  			UniqueId = opts.uniqueId
        	Surname = opts.surname
  		}

  		return data
	} else {
		return new Error('uniqueId(PNR) and surname must be entered completely! Your input is invalid!')
	}
}


export default{
	getAvailabilityValidate,
	getFareFamilyListValidate,
	getPortListValidate,
	getTimetableValidate,
	retrieveReservationDetailValidate,
}