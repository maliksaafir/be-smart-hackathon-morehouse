//Code to send requests between Google Api and the app
var response = null
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            response  = callback(xmlHttp.responseText)
            console.log("Response " + response)
        }
    }
    xmlHttp.open("GET", theUrl, true) // true for asynchronous 
    // xmlHttp.setRequestHeader("Origin", "")
    xmlHttp.send("")
}

function duration(response) {
    var arrival_time = get('arrival_time');
    // var suggestedTime = new Date(2018, 10, 01, 03, 25, 00)
    var suggestedTime = arrival_time.replace(/\+/g, ' ')
    suggestedTime = new Date(suggestedTime)

    var travelTime= JSON.parse(response)
    //parse through Google JSON
    travelTime = travelTime.routes[0].legs[0].duration.value
    // console.log("travel time: ", travelTime/60, " minutes")
    // console.log("travel time: ", travelTime)
    // suggestedTime = suggestedTime - travelTime
    suggestedTime.setSeconds(suggestedTime.getSeconds() - travelTime)
    // console.log("updated suggested time: ", suggestedTime)
    $('#leave_time').html(suggestedTime.toLocaleString('en-US'));
    $('#travel_time').html(Math.floor(travelTime/60))
    return suggestedTime
}

function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

$(document).ready(function(){
    let address_info = [get('address'), get('city'), get('state'), get('zip')];
    let origin = get('origin');
    var full_address = address_info[0] + " " + address_info[1] + ", " + address_info[2] + " " + address_info[3];
    // var departure = arrival_time;

    httpGetAsync('https://maps.googleapis.com/maps/api/directions/json?origin=' + full_address + '&destination=' + origin + '&mode=driving&key=AIzaSyALtf42098B-ChBnH_qeAqD5uRS8A4yugg', duration);
});