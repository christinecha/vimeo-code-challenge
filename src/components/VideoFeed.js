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

  changeVideo(newVid) {
    this.setState({
      featuredVideo: newVid
    })
  }

  getVideos() {
    const { videos } = this.props

    return videos.map((video, i) => {
      return (
        <VideoPreview
          video={video}
          key={i}
          index={i}
          changeVideo={(newVid) => this.changeVideo(newVid)} />
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
            index={this.state.featuredVideo}
            numOfVideos={this.state.numOfVideos}
            changeVideo={(newIndex) => this.changeVideo(newIndex)} />
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
