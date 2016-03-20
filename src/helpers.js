"use strict"

export const getPlayerURL = (url) => {
  return "https://player.vimeo.com/video/" + url.substr(url.lastIndexOf("/") + 1)
}

export const getURLparam = (url, val, defaultVal) => {
  let channel = defaultVal,
    tmp = [];
  url.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === val) {
      channel = decodeURIComponent(tmp[1])
    }
   })
   return channel
}

export const groupByThousands = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
