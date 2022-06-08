'use strict';

const KEY_STORAGE = 'userDB';
const gUser = {};

function getUser() {
  const user = loadFromStorage(KEY_STORAGE);
  return user;
}

function save(ev) {
  ev.preventDefault();
  const elForm = document.querySelector('form');
  const gUser = {
    age: elForm.querySelector('[name=age]').value,
    email: elForm.querySelector('[name=email]').value,
    bgColor: elForm.querySelector('[name=bg-color]').value,
    color: elForm.querySelector('[name=color]').value,
    date: elForm.querySelector('[name=date]').value,
    time: elForm.querySelector('[name=time]').value,
  };
  saveToStorage(KEY_STORAGE, gUser);
  window.location.replace('index.html');
}
