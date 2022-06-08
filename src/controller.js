'use strict';

function changeColors() {
  const user = getUser();
  if (!user) return;
  document.body.style.backgroundColor = user.bgColor;
  document.body.style.color = user.color;
}

function showAge(val) {
  document.querySelector('.span-age').textContent = val;
}
