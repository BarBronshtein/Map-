'use strict';

const GOOGLE_MAP_KEY = 'AIzaSyByW4arVVCXU_wA07K5a2jrwLUJOKX64J4';
const PLACE_STORAGE_KEY = 'placesDB';
const gMarkers = [];
let gMap;
const place = {};
let gPlaces = [];

function getMap() {
  return gMap;
}

function initMap() {
  gMap = new google.maps.Map(document.querySelector('.map'), {
    center: { lat: 29.5576694, lng: 34.951925 },
    zoom: 14,
  });
  gMap.addListener('click', onAddMarker);
  const places = loadFromStorage(PLACE_STORAGE_KEY);
  if (!places || !places.length) return;
  places.forEach(addMarker);
  renderPlaces();
}

function getCurPos() {
  navigator.geolocation.getCurrentPosition(getUserLoc, handleLocationError);
}

function getUserLoc(location) {
  const { latitude, longitude } = location.coords;
  const position = new google.maps.LatLng(latitude, longitude);
  gMap.setCenter(position);
}

function addMarker({ lat, lng, name, id }) {
  const place = {
    name,
    lat,
    lng,
    id: id || makeId(),
  };
  gPlaces.push(place);
  const mark = new google.maps.Marker({
    map: gMap,
    position: { lat, lng },
    lat,
    lng,
  });
  mark.id = place.id;
  gMarkers.push(mark);
  saveToStorage(PLACE_STORAGE_KEY, gPlaces);
}

function deletePlace(id) {
  const idx = gPlaces.findIndex(place => place.id === id);
  gPlaces.splice(idx, 1);
  console.log(gPlaces);
  const index = gMarkers.findIndex(mark => mark.id === id);
  const mark = gMarkers.splice(index, 1)[0];
  mark.setMap(null);
  saveToStorage(PLACE_STORAGE_KEY, gPlaces);
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
