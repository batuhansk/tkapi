# tkapi - Unofficial Turkish Airlines Node.js API wrapper

tkapi is a Node.js API wrapper that provides to Turkish Airlines API endpoints.

You can use these endpoints:
 # getAvailability 
The Availability Request message requests Flight Availability for a city pair on a specific date for a specific number and type of passengers. Calendar with best price of each day in a week and full flight list with their price depending on cabin will be provided.
 # getFareFamilyList 
This is a lookup method that gives fare family list to be used for getAvailability request. The output changes depending on ports location (domestic or international) and ticket type (award ticket or not)
 # getPortList
Lists all ports in details.
 # getTimetable
This method retrieves schedule info. It lists all flights in requested route and operation days in a week.
 # retrieveReservationDetail
This method returns the detailed information of the reservations created through our reservation system in XML format. It covers reservations made from all sales channels.
 # calculateFlightMiles
Calculates miles for flight.
 # calculateAwardMilesWithTax
Calculates award miles with tax.

You can see how to use the wrapper in the examples folder. (Once you need to install packages for run.)

Firstly, run the following commands to use wrapper,

```
npm install
npm run-script build
```

Once you have created an account from the Turkish Airlines developer portal, you should create an application then you need to get an API key and API secret.

### Version 1.0.0
- Wrapper created.

### Version 1.0.1
- Request models improved. (You can send request easily!)

### Version 1.0.5
- Library available on npmjs!

### Version 1.0.6
- Project merged with c0b41's contribution. Thanks for support.

### Version 2.0.0
- The complex parameter validation structure has been removed. You can handle body/status values via returned body.
- 2 new endpoints added. (calculateFlightMiles / calculateAwardMilesWithTax)


You can see example request data and much more in documentations.

##### Turkish Airlines Developer Portal:
https://developer.turkishairlines.com

##### Turkish Airlines API (Documentation):
https://developer.turkishairlines.com/documentation

## License
---
tk-api is available under the MIT license. See the LICENSE file for more info.
