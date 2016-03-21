"use strict"

import React from 'react'
import * as helper from '../helpers.js'
import { VideoFeature } from './VideoFeature'
import { VideoPreview } from './VideoPreview'

export class VideoFeed extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      featuredVideo: Math.round(Math.random() * (this.props.videos.length - 1))
    }
  }

  componentWillUpdate(prevProps) {
    if (prevProps != this.props) {
      this.setState({
        featuredVideo: Math.round(Math.random() * (this.props.videos.length - 1))
      })
    }
  }

  changeVideo(newVid) {
    this.setState({
      featuredVideo: newVid
    })
    document.querySelector(".featuredVideoContainer").scrollIntoView()
    // console.log(location.hash)
  }

  getPagination() {
    const { changePage, page, paging } = this.props

    let paginationKey = ["first", "previous", "next", "last"]
    let key = 0

    return paginationKey.map((link, i) => {
      return (
        <button
          onClick={() => changePage(helper.getURLStringParam(paging[link], "page", 1))}
          className={!paging[link] ? "inactive pagination" : "pagination"}
          key={i}>
          {link}
        </button>
      )
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

  render() {
    const { videos } = this.props

    return (
      <div>
        <div>
          <VideoFeature
            video={videos[this.state.featuredVideo]}
            index={this.state.featuredVideo}
            numOfVideos={videos.length}
            changeVideo={(newIndex) => this.changeVideo(newIndex)} />
        </div>
        <div className="videoFeed">
          {this.getVideos()}
        </div>
        { this.getPagination() }
      </div>
    )
  }
}
