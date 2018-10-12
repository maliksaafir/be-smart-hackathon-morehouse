var trip_info;
var response;
function sendRequestAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", theUrl, true)
    xmlHttp.send("")
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            response = xmlHttp.responseText;
            // console.log("JSON: "+ response)
            callback(response);
            // console.log("arrival: " + arrival)
        }
    }
    //console.log("Result: " + arrival)
    //console.log("Response: "+ result)
    // var obj = JSON.parse(xmlHttp.responseText)
    // var departure = new Date(obj.flights[0].departureTime)
    //var test = xmlHttp.responseText
    
    // return arrival
}

function calcTime(response) {
    let bufferTime = 2
    let obj = JSON.parse(response)
    let departure = new Date(obj.flights[0].departureTime)
    let origin = obj.flights[0].origin
    let flight_num = obj.flights[0].flightNumber
    let destination = obj.flights[0].destination
    let suggested_arrival = new Date(departure)
    // departure = departure.getHours()
    suggested_arrival.setHours(suggested_arrival.getHours() - bufferTime)
    // arrivalTime = arrivalTime.setHours()
    // console.log([departure, origin, destination, flight_num])
    trip_info = [flight_num, origin, destination, departure, suggested_arrival]
    $('#flight_num').html(trip_info[0])
    $('#origin').html(trip_info[1])
    $('#destination').html(trip_info[2])
    $('#departure').html(trip_info[3].toLocaleString('en-US'))
    $('#suggested_arrival').html(trip_info[4].toLocaleString('en-US'))
    $('#buffer_time').html(bufferTime)
    $('#hidden_arrival').attr('value', suggested_arrival);
    $('#hidden_origin').attr('value', trip_info[1]);
}

function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}
// Time for the user to leave

// var arrivalTime = departure
// function Result()
// {
//     sendRequestAsync('https://aa-morehouse.herokuapp.com/reservation?recordLocator=ORGGUT', time)
// }

// console.log("Data: " + time)

//sendRequestAsync('https://aa-morehouse.herokuapp.com/reservation?recordLocator=ORGGUT', time)


$(document).ready(function() {
    var form_info = [get('fname'), get('lname'), get('record_locator')];
    if (!(form_info[0] && form_info[1] && form_info[2])) {
        window.location.replace('index.html');
    }
    sendRequestAsync('https://aa-morehouse.herokuapp.com/reservation?recordLocator=' + form_info[2], calcTime);
    // sendRequestAsync('https://apps.tsa.dhs.gov/MyTSAWebService/GetConfirmedWaitTimes.ashx?ap=' + arrival[2], calcBuffer);
});