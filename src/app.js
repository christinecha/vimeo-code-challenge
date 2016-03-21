"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import * as helper from './helpers.js'
import { VideoFeed } from './components/VideoFeed'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      access_token: "5a34d097ebec40b64f49e1e873010976",
      channelId: helper.getURLparam(location, "channel", "staffpicks"),
      loading: true,
      page: 1,
      paging: {},
      videosPerPage: 20,
      videos: []
    }
  }

  componentWillMount() {
    this.getChannelInfo()
    this.getChannelVideos()
  }

  changeChannel(channel) {
    this.setState({
      channelId: channel
    }, () => {
      this.getChannelInfo()
      this.getChannelVideos()
    })
  }

  changePage(page) {
    this.setState({
      page: page
    }, () => {
      console.log(this.state.page)
      this.getChannelInfo()
      this.getChannelVideos()
    })
  }

  getChannelInfo() {
    let channelInfoURL = "https://api.vimeo.com/channels/" + this.state.channelId + "?access_token=" + this.state.access_token
    helper.getData(channelInfoURL).then((channel) => {
      document.getElementById("current-channel--name").innerHTML = channel.name
      let formattedName = channel.name
      if (this.state.channelId == "staffpicks") {
        formattedName = "staff picks"
      } else {
        formattedName = !channel.name || channel.name.length > 20 ? "featured channels" : channel.name
      }
      document.querySelector("#splash h2").innerHTML = formattedName
    })
  }

  getChannelVideos() {
    this.loading(true)
    let channelVideosURL = "https://api.vimeo.com/channels/" + this.state.channelId + "/videos?access_token=" + this.state.access_token
    helper.getData(channelVideosURL, {
      filter: "embeddable",
      filter_embeddable: true,
      per_page: this.state.videosPerPage,
      page: parseInt(this.state.page)
    }).then((response) => {
      console.log(response.data, this.state.page)
      this.setState({
        paging: response.paging,
        videos: response.data,
        loading: false
      })
    })
  }

  loading(bool) {
    this.setState({
      loading: bool
    })
  }

  render() {
    if (this.state.videos.length > 0) {
      return (
        <div>
          <div className={this.state.loading ? "loading" : null}>
            {this.state.loading ? "loading feed..." : null}
          </div>
          <VideoFeed
            changePage={(page) => this.changePage(page)}
            changeChannel={(channel) => this.changeChannel(channel)}
            videos={this.state.videos}
            page={this.state.page}
            paging={this.state.paging}
            videosPerPage={this.state.videosPerPage} />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
)
