
$(document).on('pageshow', '#pagetwo', function (event) {
    max_height();
    navigator.geolocation.getCurrentPosition(displayPosition, onError,{'enableHighAccuracy':true,'timeout':20000});
});

// Success callback function
function displayPosition(pos) {
    var mylat = pos.coords.latitude;
    var mylong = pos.coords.longitude;
    //Load Google Map
    var latlng = new google.maps.LatLng(mylat, mylong);
    var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.HYBRID
};

var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

// Places
var request = {
    location: latlng,
    radius: '20000',
    types: ['store']
};

var service = new google.maps.places.PlacesService(map);
service.search( request, callback );

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
            }
        }
    }

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
    });
}

var marker = new google.maps.Marker({
     position: latlng, 
     map: map, 
     title:"You're here"
 });


}

// Error callback function
function errorFunction(pos) {
    alert('It seems like your browser or phone has blocked our access to viewing your location. Please enable this before trying again.');
}