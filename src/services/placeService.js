'use strict';

const GOOGLE_MAP_KEY = 'AIzaSyAl-v0FWCCcT0o6UrjDE17w4NIVtAa9AAI';

let gMap;

function initMap() {
  gMap = new google.maps.Map(document.querySelector('.map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

window.initMap = initMap;
