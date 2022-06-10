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
  const lat = ev.latLng.lat();
  const lng = ev.latLng.lng();
  addMarker({ lat, lng, name });
  renderPlaces();
}

function renderPlaces() {
  const places = getPlaces();
  let strHTML = '';
  places.forEach(
    place =>
      (strHTML += `<a href="#" onclick="moveTo({lat:${place.lat},lng:${place.lng}})">${place.name} <span onclick="onDeletePlace('${place.id}')" class="del-place">X</span></a>`)
  );
  document.querySelector('.places-container').innerHTML = strHTML;
}

function onDeletePlace(placeId) {
  deletePlace(placeId);
  renderPlaces();
}
