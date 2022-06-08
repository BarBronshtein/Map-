'use strict';

onSetLoc();

function changeColors() {
  const user = getUser();
  if (!user) return;
  document.body.style.backgroundColor = user.bgColor;
  document.body.style.color = user.color;
}

function showAge(val) {
  document.querySelector('.span-age').textContent = val;
}

function onSetLoc() {
  setTimeout(
    () =>
      document.querySelector('.gm-svpc').addEventListener('click', getCurPos),
    3000
  );
}
function onAddMarker(ev) {
  const name = prompt('Enter Place Name:');
  const mark = new google.maps.Marker({
    map: getMap(),
    position: ev.latLng,
    lat: ev.latLng.lat(),
    lng: ev.latLng.lng(),
  });
  addMarker(mark, name);
  renderPlaces();
}

function renderPlaces() {
  const places = getPlaces();
  let strHTML = '';
  places.forEach(
    place =>
      (strHTML += `<a onclick="moveTo({lat:${place.lat},lng:${place.lng}})">${place.name} <span onclick="onDeletePlace(place.id)" class="del-place">X</span></a>`)
  );
  document.querySelector('.places-container').innerHTML = strHTML;
}

function onDeletePlace(placeId) {
  deletePlace(placeId);
  renderPlaces();
}
