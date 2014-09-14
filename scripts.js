function listDataReady () {
  var list = document.getElementById('gif-list')
    , gifs = {}
  
  for (var i = 0; i < window.data.length; i++) {
    var tag = window.data[i]

    if (typeof gifs[tag.id.toString()] == 'undefined') {
      gifs[tag.id.toString()] = {
        tags: [tag],
        webmurl: tag.webmurl,
        mp4url: tag.mp4url,
        width: tag.width,
        height: tag.height
      }
    }
    else gifs[tag.id].tags.push(tag)
  }

  for (var i in gifs) {
    var gif = gifs[i]
      , url = gif.url

    var li = document.createElement('li')
      , header = document.createElement('div')

    header.className = 'gif-header'

    for (var j = 0; j < gif.tags.length; j++) {
      var tag = gif.tags[j]
        , span = document.createElement('span')

      span.className = 'tag'
      span.textContent = '#'+tag.content
      header.appendChild(span)
      header.innerHTML += ' '
    }

    var item = document.createElement('div')
      , video = document.createElement('video')

    item.className = 'gif-li'
    item.appendChild(header)

    video.frameborder = 0
    video.autoplay = "true"
    video.loop = "true"
    video.muted = "true"
    video.width = gif.width
    video.height = gif.height
    video.style.border = 'none'

    if (gif.webmurl) {
      var webmsrc = document.createElement('source')
      webmsrc.src = gif.webmurl
      video.appendChild(webmsrc)
    } else if (gif.mp4url) {
      var mp4src = document.createElement('source')
      mp4src.src = gif.mp4url
      video.appendChild(mp4src)
    }

    item.appendChild(video)
    li.appendChild(item)

    
    list.insertBefore(li, list.childNodes[0])
  }
}

function homeGifReady () {
  var item = document.getElementById('gif')
    , gif = {
      tags: data,
      webmurl: data[0].webmurl,
      mp4url: data[0].mp4url,
      width: data[0].width,
      height: data[0].height
    }
    , header = document.createElement('div')

  header.className = 'gif-header'

  for (var j = 0; j < gif.tags.length; j++) {
    var tag = gif.tags[j]
      , span = document.createElement('span')

    span.className = 'tag'
    span.textContent = '#'+tag.content
    header.appendChild(span)
    header.innerHTML += ' '
  }

  var video = document.createElement('video')
    , arrl = document.createElement('div')
    , arrr = document.createElement('div')

  arrl.className = 'arrow arrow-left'
  arrr.className = 'arrow arrow-right'

  item.appendChild(header)
  item.appendChild(arrl)
  item.appendChild(arrr)

  video.frameborder = 0
  video.autoplay = "true"
  video.loop = "true"
  video.muted = "true"
  video.width = 900
  video.height = 507
  video.style.border = 'none'

  if (gif.webmurl) {
    var webmsrc = document.createElement('source')
    webmsrc.src = gif.webmurl
    video.appendChild(webmsrc)
  } else if (gif.mp4url) {
    var mp4src = document.createElement('source')
    mp4src.src = gif.mp4url
    video.appendChild(mp4src)
  }
  
  item.appendChild(video)
}

function search (query) {
  window.location.href = domain + '/search.html?' + query.replace(/ /g, '+')
}