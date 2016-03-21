"use strict"

export const getData = (url, obj) => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()

    req.onreadystatechange = () => {
      if (req.readyState == 4 && req.status == 200) {
        let response = JSON.parse(req.responseText)
        resolve(response)
      }

      if (req.readyState == 4 && req.status != 200) {
        reject(req.statusText)
      }
    }

    req.open("GET", url + "&" + objToParams(obj), true)
    req.send()
  })
}

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

export const getURLStringParam = (url, val, defaultVal) => {
  if (!url || !val) {
    return defaultVal
  }

  let param = defaultVal
  let tmp = []
  url.split("&").forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === val) {
      param = decodeURIComponent(tmp[1])
    }
  })
  return param
}

export const groupByThousands = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export const objToParams = (obj) => {
  let string = ""
  for (let key in obj) {
    string += string.length > 1 ? "&" : ""
    string += key + "=" + encodeURI(obj[key])
  }

  return string
}
