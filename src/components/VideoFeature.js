"use strict"

import React from 'react'
import * as helper from '../helpers.js'

export class VideoFeature extends React.Component {
  getDescription() {
    return this.props.video.description.replace(/<br \/>/g, '\n')
  }

  render() {
    const { changeVideo, video } = this.props
    const styles = {
      videoFeature: {
        textAlign: "center",
        width: "800px",
        margin: "0 auto",
        display: "inline-block"
      },
      descriptionContainer: {
        textAlign: "left",
        backgroundColor: "rgba(0,0,0,0.5)",
        maxWidth: "740px",
        margin: "10px auto",
        padding: "30px",
        color: "white",
      },
      description: {
        marginTop: "10px",
        fontSize: "12px",
        whiteSpace: "nowrap",
        overflow: "scroll",
        textOverflow: "ellipsis"
      }
    }

    return (
      <div className="featuredVideoContainer">
        <button
          className="featuredVideoArrow"
          onClick={() => changeVideo("prev")}>
          prev
        </button>
        <div style={styles.videoFeature}>
          <iframe
            src={helper.getPlayerURL(video.url)}
            width="800"
            height="500"
            frameBorder="0"
            allowFullScreen>
          </iframe>
          <div style={styles.descriptionContainer}>
            <h3>{video.title}</h3>
            <p style={styles.description}>{this.getDescription()}</p>
          </div>
        </div>
        <button
          className="featuredVideoArrow"
          onClick={() => changeVideo("next")}>
          next
        </button>
      </div>
    )
  }
}
