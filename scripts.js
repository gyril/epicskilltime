window._EST_ = {
  env: window.location.href.indexOf('epicskilltime.') > -1 ? 'prod' : 'dev',
  domain: '',
  APIdomain: '',


  init: function () {
    this.domain = this.env == 'prod' ? 'http://epicskilltime.airhost.me' : 'http://localhost:1337/epicskilltime'
    this.APIdomain = this.env == 'prod' ? 'http://epicskilltime.herokuapp.com' : 'http://localhost:7777'
  },

  denis: function(){
    return 'boloss';
  },

  listen: function () {
    // tags
    document.addEventListener('click', function (e) {
      if (e.target.className.indexOf("tag") > -1 && e.target.childNodes.length == 1)
        _EST_.search(e.target.getAttribute('data-content'))

      if (e.target.parentElement.className.indexOf("-gif") > -1) {
        var gifURL = _EST_.domain + '/gif.html?' + e.target.parentElement.getAttribute('data-id')
        if (window.location.href.indexOf(gifURL) < 0)
          window.location.href = gifURL
      }
    }, false)

    // searchboxes
    var searchboxes = document.getElementsByClassName('searchbox')

    for (var i = 0; i < searchboxes.length; i++) {
      var sb = searchboxes[i]

      sb.addEventListener('keydown', function (e) {
        if (e.keyCode == 38 || e.keyCode == 40)
          e.preventDefault()
      }, false)

      sb.addEventListener('keyup', function (e) {
        // Enter
        if (e.keyCode == 13) {
          // check if autocomplete active
          var autocomplete = document.getElementById('autocomplete')
            , tags = autocomplete.getElementsByClassName('active')

          if (tags.length > 0) {
            _EST_.search(tags[0].getAttribute('data-content'))
          } else {
            _EST_.search(this.value)
          }
        }

        // Up arrow
        else if (e.keyCode == 38)
          _EST_.focusPrevSearchResult()

        // Down arrow
        else if (e.keyCode == 40)
          _EST_.focusNextSearchResult()

        else if (this.value.length > 1) {
          var _this = this
          _EST_.searchGifs(this.value, function (data) {
            _EST_.autocomplete(data, _this)
          })
        }

        else _EST_.hideAutocomplete()

      }, false)

      sb.addEventListener('blur', function () {
        window.setTimeout(_EST_.hideAutocomplete, 300)
      }, false)
    }

    // play pause gifs
    this.intervals.push(window.setInterval(function () {
      var videos = document.getElementsByTagName('video')

      for (var i = 0; i < videos.length; i++) {
        var video = videos[i]
        if (_EST_.utils.isInViewport(video)) {
          if(video.paused)
            video.play()
        } else {
          if (!video.paused)
            video.pause()
        }
      }
    }, 200))
  },

  getHashtags: function() {
    var sTitle = document.getElementsByName('title')[0].value
    var $Tags = document.getElementsByName('free')[0]
    var tags = sTitle.match(/\#[a-z0-9\-\_]*/ig)
    $Tags.value = tags.join(", ")
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

  queryGifList: function (list, callback) {
    if (this.isQuerying)
      return

    var xhr = new XMLHttpRequest()
    xhr.open('GET', this.APIdomain + '/list/' + list.join('+'), true)

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
    window.index.search(query, function (success, data) {
      if (!success)
        return

      callback(data)
    })
  },

  templates: {

    list: function (gif) {
      var container = document.createElement('div')
      container.className = 'gif-list card'

      var title = document.createElement('div')
        , game = document.createElement('div')
        , gifvid = document.createElement('div')
        , links = document.createElement('div')

      title.className = 'gif-list-title'
      game.className = 'gif-list-game'
      gifvid.className = 'gif-list-gif'
      links.className = 'gif-list-links'

      title.textContent = gif.title
      title.innerHTML = title.textContent.replace(/\#([a-z0-9\-\_]*)/ig, "<a href="+document.location.origin+"/search.html?$1 class='gif-list-title-hashtag'>#$1</a>")

      var video = document.createElement('video')

      video.frameborder = 0
      video.autoplay = 'false'
      video.loop = 'true'
      video.muted = 'true'
      video.width = '600'
      video.style.border = 'none'

      var mp4src = document.createElement('source')
      mp4src.src = gif.mp4url
      if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
        mp4src.src = gif.mp4url.replace(/\.mp4/g, '-android.mp4')
        video.controls = true
        video.style.backgroundColor = 'black'
      }
      mp4src.type = 'video/mp4'
      video.appendChild(mp4src)

      var webmsrc = document.createElement('source')
      webmsrc.src = gif.webmurl
      webmsrc.type = 'video/webm'
      video.appendChild(webmsrc)

      gifvid.setAttribute('data-id', gif.id)
      gifvid.appendChild(video)

      for (var i = 0; i < gif.tags.length; i++) {
        var tag = gif.tags[i]
        if (tag.type == 'game')
          game.textContent = tag.content
          var gameLink = document.createElement('a')
          gameLink.className = "gif-list-game-link"
          gameLink.setAttribute('href', document.location.origin + "/search.html?"+ game.textContent.replace(/\ /g,"+"))
      }

      var facebook = document.createElement('a')
      facebook.className = 'gif-list-facebook'
      facebook.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fepicskilltime.airhost.me%2Fgif.html%3F' + gif.id)
      facebook.setAttribute('target', '_blank')
      facebook.textContent = 'Facebook'

      var link = document.createElement('a')
      link.className = 'gif-list-link'
      link.setAttribute('data-link', _EST_.domain + '/gif.html?' + gif.id)
      link.addEventListener('click', function () {
        _EST_.copyLink(this.getAttribute('data-link'))
      }, false)
      link.textContent = 'Copy link'
      links.appendChild(facebook)
      links.appendChild(link)

      container.appendChild(title)
      container.appendChild(gameLink)
      gameLink.appendChild(game)
      container.appendChild(gifvid)
      container.appendChild(links)

      return container
    },

    gameGate: function (gif) {
      var gateLink = document.createElement('a')
      gateLink.className = 'game-gate-link'
      for (var i = 0; i < gif.tags.length; i++) {
        var tag = gif.tags[i]
        if (tag.type == 'game')
          gateLink.textContent = "Watch more gifs for " + tag.content
          gateLink.setAttribute('href', document.location.origin+"/search.html?" + tag.content.replace(/ /g, "+"))
          break
      }

      return gateLink
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
          content.setAttribute('data-content', tagContent)
          contents.appendChild(content)
        }

        container.appendChild(type)
        container.appendChild(contents)
      }

      return container
    },

    autocomplete: function (results) {
      var container = document.createElement('div')

      for (var i in results) {
        if (!_EST_.utils.isEmptyObj(results[i])) {
          var type = document.createElement('div')
          type.className = 'autocomplete-type'
          type.textContent = _EST_.utils.capitalize(i)
          container.appendChild(type)

          for (var j in results[i]) {
            var tag = document.createElement('div')
            tag.className = 'autocomplete-tag'
            tag.textContent = j + ' (' + results[i][j]+ ' gif'+(results[i][j] > 1 ? 's' : '')+')'
            tag.setAttribute('data-content', j)

            container.appendChild(tag)
          }
        }
      }

      return container
    }
  },

  ogTags: function (gif) {
    return {
      url: this.domain + '/gif.html?' + gif.id,
      title: gif.title,
      image: 'http://thumbs.gfycat.com/'+gif.webmurl.split('/').reverse()[0].split('.')[0]+'-poster.jpg',
      site_name: 'http://ggwp.com/'
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

            _EST_.currentOffset += 10

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
  },

  autocomplete: function (data, searchbox) {
    if (data.hits.length == 0) {
      this.hideAutocomplete()
      return
    }

    var results = {game: {}, players: {}, characters: {}, teams: {}, evt: {}, free: {}}

    for (var i = 0; i < data.hits.length; i++) {
      var hit = data.hits[i]

      if (typeof results[hit.type][hit.content] == 'undefined')
        results[hit.type][hit.content] = 1
      else results[hit.type][hit.content]++
    }

    var autocomplete = document.getElementById('autocomplete')

    autocomplete.innerHTML = ''
    autocomplete.appendChild(_EST_.templates.autocomplete(results))
    autocomplete.style.top = (searchbox.offsetTop + searchbox.offsetHeight - 1) + 'px'
    autocomplete.style.width = searchbox.offsetWidth + 'px'
    autocomplete.style.display = 'block'


  },

  hideAutocomplete: function () {
    var autocomplete = document.getElementById('autocomplete')
    autocomplete.style.display = 'none'
  },

  focusPrevSearchResult: function () {
    var autocomplete = document.getElementById('autocomplete')
      , tags = autocomplete.getElementsByClassName('autocomplete-tag')
      , current = null

    if (tags.length == 0)
      return

    for (var i = tags.length - 1; i >= 0; i--)
      if (tags[i].className.indexOf('active') > -1)
        current = i

    if (current == null) {
      tags[tags.length-1].className += ' active'
    } else {
      tags[current].className = tags[current].className.replace( /(?:^|\s)active(?!\S)/ , '' )
        if (current == 0) {

        } else {
          tags[current-1].className += ' active'
        }
    }
  },

  focusNextSearchResult: function () {
    var autocomplete = document.getElementById('autocomplete')
      , tags = autocomplete.getElementsByClassName('autocomplete-tag')
      , current = null

    if (tags.length == 0)
      return

    for (var i = tags.length - 1; i >= 0; i--)
      if (tags[i].className.indexOf('active') > -1)
        current = i

    if (current == null) {
      tags[0].className += ' active'
    } else {
      tags[current].className = tags[current].className.replace( /(?:^|\s)active(?!\S)/ , '' )
        if (current == tags.length-1) {

        } else {
          tags[current+1].className += ' active'
        }
    }
  },

  copyLink: function (link) {
    window.prompt('Copy-paste this link:', link)
  },

  utils: {
    isEmptyObj: function (obj) {
      for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false
      }
      return true
    },

    isInViewport: function (video) {
      var viewport = [window.scrollY, window.scrollY + document.documentElement.offsetHeight]

      return (video.offsetTop + 200 > viewport[0] && video.offsetTop + video.offsetHeight < viewport[1])
    },

    capitalize: function (string) {
      return string[0].toUpperCase()+string.substring(1)
    }
  }
}

_EST_.init()