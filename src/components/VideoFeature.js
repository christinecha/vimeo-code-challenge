"use strict"

import React from 'react'
import * as helper from '../helpers.js'

export class VideoFeature extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      descriptionExpanded: false,
      screenWidth: window.innerWidth
    }
  }

  componentWillMount() {
    window.addEventListener("resize", function() {
      this.setState({
        screenWidth: window.innerWidth
      })
    }.bind(this))
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.setState({
        descriptionExpanded: false
      })
    }
  }

  getVideoDimensions() {
    if (this.state.screenWidth < 820) {
      return [this.state.screenWidth, this.state.screenWidth * 0.6]
    } else {
      return [800, 500]
    }
  }

  getNewVideo(direction) {
    const { index, numOfVideos, changeVideo } = this.props

    let prev = index - 1
    let next = index + 1

    if (index == 0) {
      prev = numOfVideos - 1
    } else if (index == numOfVideos -1) {
      next = 0
    }

    changeVideo(direction == "prev" ? prev : next)
  }

  getDescription() {
    return this.props.video && this.props.video.description ? this.props.video.description.replace(/<br \/>/g, '\n') : null
  }

  toggleDescription() {
    this.setState({
      descriptionExpanded: !this.state.descriptionExpanded
    })
  }

  render() {
    const { changeVideo, video } = this.props
    const { descriptionExpanded, screenWidth } = this.state

    const styles = {
      videoFeature: {
        textAlign: "center",
        width: this.getVideoDimensions()[0] + "px",
        margin: "0 auto",
        display: "inline-block"
      },
      descriptionContainer: {
        textAlign: "left",
        backgroundColor: "rgba(0,0,0,0.4)",
        maxWidth: "740px",
        margin: "10px auto",
        padding: "30px",
        color: "white",
        position: "relative"
      },
      description: {
        marginTop: "10px",
        fontSize: "12px",
        maxWidth: descriptionExpanded ? null : "85%",
        whiteSpace: descriptionExpanded ? "pre-wrap" : "nowrap",
        overflow: "scroll",
        textOverflow: "ellipsis",
      },
      readMore: {
        display: video && video.description && video.description.length > 100 ? "block" : "none",
        position: descriptionExpanded || screenWidth < 820 ? null : "absolute",
        right: "30px",
        margin: descriptionExpanded || screenWidth < 820 ? "20px 0" : "-22px 0"
      }
    }

    return (
      <div className="featuredVideoContainer">
        <button
          className="featuredVideoArrow"
          onClick={() => this.getNewVideo("prev")}>
          prev
        </button>
        <div style={styles.videoFeature}>
          <iframe
            src={video ? helper.getPlayerURL(video.uri) : null}
            width={this.getVideoDimensions()[0] + "px"}
            height={this.getVideoDimensions()[1] + "px"}
            frameBorder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen>
          </iframe>
          <div style={styles.descriptionContainer}>
            <h3>{video ? video.name : null}</h3>
            <p style={styles.description}>{this.getDescription()}</p>
            <button style={styles.readMore} onClick={() => this.toggleDescription()}>
              { this.state.descriptionExpanded ? "collapse" : "read more" }
            </button>
            <div className="stats">
              <span className="plays">{ video && video.stats.plays ? helper.groupByThousands(video.stats.plays) : null} plays </span>
            </div>
          </div>
        </div>
        <button
          className="featuredVideoArrow"
          onClick={() => this.getNewVideo("next")}>
          next
        </button>
      </div>
    )
  }
}
