"use strict"

document.addEventListener("scroll", function() {
  var splash = document.getElementById("splash")
  var nav = document.querySelector("nav")

  splash.style.top = window.scrollY <= 250 ? (-(window.scrollY * 2)) + 'px' : "-500px"
  splash.style.opacity = window.scrollY < 250 ? (500 - (window.scrollY * 2)) / 500 : 0

  if (window.scrollY >= 200) {
    nav.style.backgroundColor = "rgba(0,0,0,0.8)"
  } else {
    nav.style.backgroundColor = "transparent"
  }
})
