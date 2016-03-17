"use strict"

import React from 'react'

export class VideoPreview extends React.Component {
  render() {
    const { video } = this.props

    return (
      <div className="videoPreview">
        <a href={video.url}><img src={video.thumbnail_medium} /></a>
        <a href={video.url}><h3>{video.title}</h3></a>
        <p>from <a href={video.user_url}>{video.user_name}</a></p>
      </div>
    )
  }
}
