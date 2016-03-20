"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import * as helper from './helpers.js'
import { VideoFeed } from './components/VideoFeed'

var access_token = "5a34d097ebec40b64f49e1e873010976"

const apiCall = (url, obj) => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest(obj)

    req.onreadystatechange = () => {
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

let channelName = helper.getURLparam(location, "channel", "staffpicks")
let channelInfoURL = "https://api.vimeo.com/channels/" + channelName + "?access_token=" + access_token
let channelVideosURL = "https://api.vimeo.com/channels/" + channelName + "/videos?access_token=" + access_token

// get channel videos
apiCall(channelInfoURL).then((channel) => {
  document.getElementById("current-channel--name").innerHTML = channel.name
  let formattedName = channel.name
  if (channelName == "staffpicks") {
    formattedName = "staff picks"
  } else {
    formattedName = !channel.name || channel.name.length > 20 ? "featured channels" : channel.name
  }
  document.querySelector("#splash h2").innerHTML = formattedName
})

// get channel videos
apiCall(channelVideosURL, {
  filter: "embeddable",
  filter_embeddable: true
}).then((response) => {
  ReactDOM.render(
    <VideoFeed videos={response.data} />,
    document.getElementById('react-app')
  )
}).catch((err) => {
  console.log(err)
  document.getElementById('notice').style.display = "block"
  ReactDOM.render(
    <div>Sorry! There has been a connection error. Try reloading the page.</div>,
    document.getElementById('notice')
  )
})
