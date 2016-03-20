"use strict"

import React from 'react'
import { VideoFeature } from './VideoFeature'
import { VideoPreview } from './VideoPreview'

export class VideoFeed extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      featuredVideo: Math.round(Math.random() * (this.props.videos.length - 1)),
      numOfVideos: this.props.videos.length,
      buttonText: "show more"
    }
  }

  changeVideo(direction) {
    const { featuredVideo, numOfVideos } = this.state

    let prev = featuredVideo - 1
    let next = featuredVideo + 1

    if (featuredVideo == 0) {
      prev = numOfVideos - 1
    } else if (featuredVideo == numOfVideos -1) {
      next = 0
    }

    let newVid = direction == "prev" ? prev : next

    this.setState({
      featuredVideo: newVid
    })
  }

  getVideos() {
    const { videos } = this.props

    return videos.map((video, i) => {
      return (
        <VideoPreview video={video} key={i} />
      )
    })
  }

  expandFeed() {
    let feed = document.querySelector(".videoFeed")
    let currentHeight = feed.clientHeight

    if (this.state.buttonText == "show more") {
      feed.style.height = currentHeight + 220 + 'px'
    } else {
      feed.style.height = currentHeight - 220 + 'px'
    }

    if (currentHeight >= 600) {
      this.setState({ buttonText: "show less" })
    } else {
      this.setState({ buttonText: "show more" })
    }
  }

  render() {
    const { videos } = this.props

    return (
      <div>
        <div>
          <VideoFeature
            video={videos[this.state.featuredVideo]}
            changeVideo={(direction) => this.changeVideo(direction)} />
        </div>
        <div className="videoFeed">
          {this.getVideos()}
        </div>
        <button
          className="expandFeed"
          onClick={() => this.expandFeed()}>
          {this.state.buttonText}
        </button>
      </div>
    )
  }
}
