"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import { VideoFeed } from './components/VideoFeed'

const getStaffPicks = (url) => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()

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

getStaffPicks("http://vimeo.com/api/v2/channel/staffpicks/videos.json").then((response) => {
  console.log(response)
  ReactDOM.render(
    <VideoFeed videos={response} />,
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
