"use strict"

import React from 'react'

export class VideoPreview extends React.Component {
  render() {
    const { video } = this.props

    return (
      <div className="videoPreview">
        <a href={video.link}><img src={video.pictures.sizes[1].link} /></a>
        <a href={video.link}><h3>{video.name}</h3></a>
        <p>from <a href={video.user.link}>{video.user.name}</a></p>
      </div>
    )
  }
}
