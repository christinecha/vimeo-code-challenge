"use strict"

var access_token = "5a34d097ebec40b64f49e1e873010976"
var splash = document.getElementById("splash")
var nav = document.querySelector("nav")

// choose random image for splash section
var rand = Math.floor(Math.random() * 8)
splash.style.backgroundImage = "url('./src/assets/still" + rand + ".png')"

// animation for splash section
document.addEventListener("scroll", function() {
  splash.style.top = window.scrollY <= 250 ? (-(window.scrollY * 2)) - 30 + 'px' : "-500px"
  splash.style.opacity = window.scrollY < 250 ? (500 - (window.scrollY * 2)) / 500 : 0

  if (window.scrollY >= 200) {
    nav.style.backgroundColor = "rgba(0,0,0,0.8)"
  } else {
    nav.style.backgroundColor = "transparent"
  }
})

// channel picker dropdown
function getChannels(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest()

    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
        let response = JSON.parse(req.responseText)
        resolve(response)
      }

      if (req.readyState == 4 && req.status != 200) {
        reject(req.statusText)
      }
    }

    req.open("GET", url, true)
    req.send()
  })
}

function displayChannels(channels) {
  channels.data.forEach(function(channel){
    var option = document.createElement("div")
    option.innerHTML = channel.name
    option.className = "dropdown-option"
    option.dataset.id = channel.link.substr(channel.link.lastIndexOf("/") + 1)
    option.addEventListener("click", function() {
      location.href = "/" + "?channel=" + channel.link.substr(channel.link.lastIndexOf("/") + 1)
                          + "&access_token=" + access_token
    })
    document.getElementById("all-channels").appendChild(option)
  })
}

document.addEventListener("click", function(e) {
  var dropdown = document.querySelector("#all-channels")
  if (dropdown.dataset.expanded) {
    dropdown.style.display = "none"
    dropdown.style.height = "0"
    delete dropdown.dataset.expanded
  } else if (e.path.indexOf(document.getElementById("current-channel")) >= 0) {
    dropdown.style.display = "block"
    dropdown.style.height = "auto"
    dropdown.dataset.expanded = true
  }
})

getChannels("https://api.vimeo.com/channels?filter=featured&sort=followers&access_token=" + access_token).then(function(response) {
  displayChannels(response)
})
