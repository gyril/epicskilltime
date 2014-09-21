window._EST_ = {
  env: window.location.href.indexOf('epicskilltime.') > -1 ? 'prod' : 'dev',
  domain: '',
  APIdomain: '', 

  init: function () {
    this.domain = this.env == 'prod' ? 'http://epicskilltime.airhost.me' : 'http://localhost:1337/epicskilltime'
    this.APIdomain = this.env == 'prod' ? 'http://epicskilltime.herokuapp.com' : 'http://localhost:7777'
  },

  listen: function () {
    // tags
    document.addEventListener('click', function (e) {
      if (e.target.className.indexOf("tag") > -1 && e.target.childNodes.length == 1)
        _EST_.search(e.target.textContent)

      if (e.target.parentElement.className.indexOf("-gif") > -1)
        window.location.href = _EST_.domain + '/gif.html?' + e.target.parentElement.getAttribute('data-id')
    }, false)

    // searchboxes
    var searchboxes = document.getElementsByClassName('searchbox')

    for (var i = 0; i < searchboxes.length; i++) {
      var sb = searchboxes[i]

      sb.addEventListener('keyup', function (e) {
        if (e.keyCode == 13)
          _EST_.search(this.value)
      }, false)
    }
  },

  isQuerying: false,
  currentOffset: 0,
  noGifLeft: false,

  queryGif: function (id, callback) {
    if (this.isQuerying)
      return

    var xhr = new XMLHttpRequest()
    xhr.open('GET', this.APIdomain + '/gif/' + id, true)
    
    xhr.onload = function(e) {
      if (this.status == 200) {
        _EST_.isQuerying = false
        callback(JSON.parse(this.responseText))
      }
    }
    
    this.isQuerying = true
    xhr.send()
  },

  queryGifs: function (options) {
    if (this.isQuerying)
      return

    var number = options.number || 10
      , order = options.order || 'latest'
      , offset = options.offset || 0
      , callback = options.callback

    var xhr = new XMLHttpRequest()
    xhr.open('GET', this.APIdomain + '/list/' + order + '/' + number + '/' + offset, true)
    
    xhr.onload = function(e) {
      if (this.status == 200) {
        _EST_.isQuerying = false
        callback(JSON.parse(this.responseText))
      }
    }
    
    this.isQuerying = true
    xhr.send()
  },

  searchGifs: function (query, callback) {
    if (this.isQuerying)
      return

    var xhr = new XMLHttpRequest()
    xhr.open('GET', this.APIdomain + '/search/' + query, true)
    
    xhr.onload = function(e) {
      if (this.status == 200) {
        _EST_.isQuerying = false
        callback(JSON.parse(this.responseText))
      }
    }
    
    this.isQuerying = true
    xhr.send()
  },

  templates: {

    list: function (gif) {
      var container = document.createElement('div')
      container.className = 'gif-list card'

      var title = document.createElement('div')
        , game = document.createElement('div')
        , gifvid = document.createElement('div')
        , tags = document.createElement('div')
        , links = document.createElement('div')

      title.className = 'gif-list-title'
      game.className = 'gif-list-game'
      gifvid.className = 'gif-list-gif'
      tags.className = 'gif-list-tags'
      links.className = 'gif-list-links'

      title.textContent = gif.title
      
      var video = document.createElement('video')

      video.frameborder = 0
      video.autoplay = 'true'
      video.loop = 'true'
      video.muted = 'true'
      video.width = '720'
      video.height = 720 * gif.height / gif.width
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

      gifvid.setAttribute('data-id', gif.id)
      gifvid.appendChild(video)

      for (var i = 0; i < gif.tags.length; i++) {
        var tag = gif.tags[i]
          , tagspan = document.createElement('span')

        tagspan.className = 'gif-list-tag'
        tagspan.textContent = tag.content

        tags.appendChild(tagspan)

        if (tag.type == 'game')
          game.textContent = tag.content
      }

      var link = document.createElement('a')
      link.className = 'gif-list-link'
      link.href = './gif.html?' + gif.tags[0].gif
      link.textContent = 'Link'
      links.appendChild(link)

      container.appendChild(title)
      container.appendChild(game)
      container.appendChild(gifvid)
      container.appendChild(tags)
      container.appendChild(links)

      return container
    },

    metadata: function (tagtypes) {
      var container = document.createElement('div')

      for (var i in tagtypes) {
        var type = document.createElement('div')
          , contents = document.createElement('div')
          
        type.className = 'card-title'
        type.textContent = i.toUpperCase()

        contents.className = 'metadata-contents'

        for (var j = 0; j < tagtypes[i].contents.length; j++) {
          if (j > 0)
            contents.innerHTML += ', '

          var tagContent = tagtypes[i].contents[j]
            , content = document.createElement('span')

          content.className = 'metadata-tag'
          content.textContent = tagContent
          contents.appendChild(content)
        }

        container.appendChild(type)
        container.appendChild(contents)
      }

      return container
    }
  },

  tagListToGifList: function (tags) {

    var gifs = {}
      , array = []

    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i]

      if (typeof gifs[tag.id.toString()] == 'undefined') {
        gifs[tag.id.toString()] = {
          tags: [tag],
          webmurl: tag.webmurl,
          mp4url: tag.mp4url,
          width: tag.width,
          height: tag.height,
          title: tag.title,
          id: tag.gif
        }
      } else {
        gifs[tag.id].tags.push(tag)
      }
    }

    for (var i in gifs)
      array.push(gifs[i])

    // reverse so that they are ordered by id desc
    return array.reverse()
  },

  tagListToTagTypes: function (tags) {
    var types = {}
    
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i]

      if (typeof types[tag.type.toString()] == 'undefined') {
        types[tag.type.toString()] = {
          contents: [tag.content]
        }
      } else {
        types[tag.type.toString()].contents.push(tag.content)
      }
    }

    return types
  },

  infiniteScroll: function () {
    this.intervals.push(window.setInterval(function () {
      if (window.scrollY > document.documentElement.scrollHeight - document.documentElement.offsetHeight - 200 && !_EST_.isQuerying && !_EST_.noGifLeft)
        _EST_.queryGifs({
          number: 10,
          offset: _EST_.currentOffset + 10,
          callback: function (data) {
            if (data.length == 0) {
              _EST_.noGifLeft = true
              return
            }

            var gifs = _EST_.tagListToGifList(data)

            for (var i in gifs) {
              var gif = gifs[i]

              document.getElementById("left-column").appendChild(_EST_.templates.list(gif))
            }
          }
        })
    }, 200))
  },

  intervals: [],

  search: function (query) {
    window.location.href = _EST_.domain + '/search.html?' + query.replace(/ /g, '+')
  }
}

_EST_.init()