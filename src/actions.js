import C from './constants'
import csvjson from 'csvjson'
//import Converter from '../node_modules/csvtojson/libs/core/Converter'

export const addError = (message) => ({
  type: C.ADD_ERROR,
  payload: message,
})

export const clearError = index => ({
  type: C.CLEAR_ERROR,
  payload: index
})

export const isFetching = () => ({
  type: C.FETCHING,
})

export const notFetching = () => ({
  type: C.CANCEL_FETCHING,
})

export const getAirTemp = () => dispatch => {

  var minLon = -83.2130
  var minLat = 24.6220
  var maxLon = -79.2710
  var maxLat = 27.1220

  var url = 'https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS?service=SOS'+
            '&request=GetObservation&version=1.0.0&observedProperty=air_temperature'+
            '&offering=urn:ioos:network:NOAA.NOS.CO-OPS:MetActive&featureOfInterest=BBOX:'+
            minLon + ',' + minLat + ',' + maxLon + ',' + maxLat +
            '&responseFormat=text/csv&eventTime=2018-03-09T00:00:00Z/2018-03-09T00:59:00Z&unit=Fahrenheit'

  dispatch({
    type: C.FETCHING
  })

  fetch(url,{
    method:  'get',
  })

  .then((response) => response.text())

  .then((respText) => {

    var options = {
      delimiter : ',', // optional
      //quote     : '"' // optional
    };

    var airTemp = csvjson.toObject(respText, options);
    
    //console.log(airTemp)
    dispatch({
      type: C.GET_AIR_TEMP,
      payload: airTemp
    })
    dispatch({
      type: C.CANCEL_FETCHING
    })
  })

  .catch(error => {
    dispatch(
      addError(error.message)
    )

    dispatch({
      type: C.CANCEL_FETCHING
    })
  })
}