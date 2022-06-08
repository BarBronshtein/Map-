'use strict';

const GOOGLE_MAP_KEY = 'AIzaSyByW4arVVCXU_wA07K5a2jrwLUJOKX64J4';
const PLACE_STORAGE_KEY = 'placesDB';

let gMap;
const place = {
  id: 1,
  lat: 0,
  lng: 0,
  name: 'my house',
};
const gPlaces = [];

function getMap() {
  return gMap;
}

function initMap() {
  gMap = new google.maps.Map(document.querySelector('.map'), {
    center: { lat: 29.5576694, lng: 34.951925 },
    zoom: 14,
  });
  gMap.addListener('click', onAddMarker);
}

function getCurPos() {
  navigator.geolocation.getCurrentPosition(getUserLoc, handleLocationError);
}

function getUserLoc(location) {
  const { latitude, longitude } = location.coords;
  const position = new google.maps.LatLng(latitude, longitude);
  gMap.setCenter(position);
}

function addMarker(mark, name) {
  const place = {};
  place.name = name;
  place.lat = mark.lat;
  place.lng = mark.lng;
  gPlaces.push(place);
  saveToStorage(PLACE_STORAGE_KEY, gPlaces);
}

function deletePlace(placeId) {
  const idx = gPlaces.findIndex(place => place.id === placeId);
  gPlaces.splice(idx, 1);
}

function moveTo(position) {
  console.log(position);
  gMap.panTo(position);
}

function getPlaces() {
  return gPlaces;
}

//Attach click event handler to the marker.
function handleLocationError(err) {
  var locationError = document.querySelector('.map');

  switch (err.code) {
    case 0:
      locationError.innerHTML =
        'There was an error while retrieving your location: ' + error.message;
      break;
    case 1:
      locationError.innerHTML =
        "The user didn't allow this page to retrieve a location.";
      break;
    case 2:
      locationError.innerHTML =
        'The browser was unable to determine your location: ' + error.message;
      break;
    case 3:
      locationError.innerHTML =
        'The browser timed out before retrieving the location.';
      break;
  }
}
