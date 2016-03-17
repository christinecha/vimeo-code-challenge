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
})
