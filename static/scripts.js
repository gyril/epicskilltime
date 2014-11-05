window._EST_ = {
  env: window.location.href.indexOf('epicskilltime.') > -1 ? 'prod' : 'dev',
  domain: '',
  APIdomain: '',


  init: function () {
    this.domain = this.env == 'prod' ? 'http://www.epicskilltime.com' : 'http://localhost:1337/epicskilltime'
    this.APIdomain = this.env == 'prod' ? 'http://epicskilltime.herokuapp.com' : 'http://localhost:7777'
  },

  listen: function () {
    // tags
    document.addEventListener('click', function (e) {
      if (e.target.className.indexOf("tag") > -1 && e.target.childNodes.length == 1)
        _EST_.search(e.target.getAttribute('data-content'))

      if (e.target.className.indexOf('playbackrate') >= 0) {
        return
      }

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
  },

  autoPlayPause: function() {
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
    $Tags.value = (tags) ? tags.join(", ") : ""
  },

  selectGames: function(callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', this.APIdomain + '/games', true)

    xhr.onload = function(e) {
      if (this.status == 200) {
        _EST_.isQuerying = false
        callback(JSON.parse(this.responseText))
      }
    }

    this.isQuerying = true
    xhr.send()
  },

  updateTitle: function(title, id, callback) {
    title = encodeURIComponent(title)
    var xhr = new XMLHttpRequest()
        xhr.open('GET', this.APIdomain + "/updatetitles/" + id + "/" + title, true)

        xhr.onload = function(e) {
          if (this.status == 200) {
            _EST_.isQuerying = false
            callback(JSON.parse(this.responseText))
          }
        }

        this.isQuerying = true
        xhr.send()
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

  queryRandomGif: function (callback) {
    if (this.isQuerying)
      return

    var xhr = new XMLHttpRequest()
    xhr.open('GET', this.APIdomain + '/random/1', true)

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

      container.appendChild(_EST_.templates.gifTitle(gif))
      container.appendChild(_EST_.templates.gifGameLink(gif))
      container.appendChild(_EST_.templates.gifVideo(gif))
      container.appendChild(_EST_.templates.gifLinks(gif))

      return container
    },

    gifTitle: function(gif) {
      var title = document.createElement('div')

      title.className = 'gif-list-title'

      title.textContent = gif.title
      title.innerHTML = title.textContent.replace(/\#([a-z0-9\-\_]*)/ig, "<a href="+_EST_.domain+"/search.html?$1 class='gif-list-title-hashtag'>#$1</a>")

      return title
    },

    gifGameLink: function(gif) {
      var game = document.createElement('div')

      game.className = 'gif-list-game'
      game.textContent = _EST_.getGame(gif)
      var gameLink = document.createElement('a')
      gameLink.className = "gif-list-game-link"
      gameLink.setAttribute('href', _EST_.domain + "/search.html?"+ game.textContent.replace(/\ /g,"+"))

      gameLink.appendChild(game)

      return gameLink
    },

    gifVideo:function(gif) {
      var gifvid = document.createElement('div')

      gifvid.className = 'gif-list-gif'

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

      var fast = document.createElement('div')
      fast.className = "gif-video-playbackrate"
      fast.classList.add('selected-playback')
      fast.textContent = "x1"
      gifvid.appendChild(fast)
      var slow = document.createElement('div')
      slow.className = "gif-video-playbackrate"
      slow.textContent = "x½"
      gifvid.appendChild(slow)
      var minus_two = document.createElement('div')
      minus_two.className = "gif-video-playbackrate"
      minus_two.textContent = "-2s"
      gifvid.appendChild(minus_two)
      minus_two.addEventListener('click', function(e){
        video.currentTime = video.currentTime - 2;
      })
      slow.addEventListener('click', function(e){
        video.playbackRate = 0.4
        slow.classList.add("selected-playback")
        fast.classList.remove("selected-playback")
      })
      fast.addEventListener('click', function(e){
        video.playbackRate = 1
        fast.classList.add("selected-playback")
        slow.classList.remove("selected-playback")
      })

      // append the playback elements before the video so that the're on top
      gifvid.appendChild(video)

      return gifvid
    },

    gifLinks:function(gif) {
      var links = document.createElement('div')

      links.className = 'gif-list-links'

      var facebook = document.createElement('a')
      facebook.className = 'gif-list-facebook'
      facebook.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.epicskilltime.com%2Fgif.html%3F' + gif.id)
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

      return links
    },

    gameGate: function (gif) {
      var gateLink = document.createElement('a')
      gateLink.className = 'game-gate-link'
      for (var i = 0; i < gif.tags.length; i++) {
        var tag = gif.tags[i]
        if (tag.type == 'game')
          gateLink.textContent = "Watch more gifs for " + tag.content
          gateLink.setAttribute('href', _EST_.domain+"/search.html?" + tag.content.replace(/ /g, "+"))
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

    form: function(game) {
      var form = document.createElement('form')
      form.setAttribute('id','add-form')
      form.setAttribute('method','post')
      // gif url
      var gif_field = document.createElement('fieldset')
      var gif_input = document.createElement('input')
      gif_input.setAttribute("name","url")
      gif_input.setAttribute("id","url")
      gif_input.setAttribute("type","text")
      gif_input.setAttribute("placeholder","Youtube url")
      gif_field.appendChild(gif_input)
      // start_time
      var start_time_field = document.createElement('fieldset')
      start_time_field.classList.add('float')
      var start_time_input = document.createElement('input')
      start_time_input.classList.add('time')
      start_time_input.setAttribute("name","start_time")
      start_time_input.setAttribute("id","start_time")
      start_time_input.setAttribute("type","text")
      start_time_input.setAttribute("placeholder","start time (sec)")
      start_time_field.appendChild(start_time_input)
      // length
      var length_field = document.createElement('fieldset')
      var length_input = document.createElement('input')
      length_input.classList.add('time')
      length_input.setAttribute("name","length")
      length_input.setAttribute("id","length")
      length_input.setAttribute("type","text")
      length_input.setAttribute("placeholder","length (max 15sec)")
      length_field.appendChild(length_input)
      // title
      var title_field = document.createElement('fieldset')
      var title_input = document.createElement('input')
      title_input.setAttribute("name","title")
      title_input.setAttribute("id","title")
      title_input.setAttribute("type","text")
      title_input.setAttribute("placeholder","Title (hashtags supported!)")
      title_field.appendChild(title_input)
      // game
      var game_select = document.createElement('select')
      game_select.setAttribute("name", "game")
      game_select.setAttribute("id", "game")
      game_select.setAttribute("type", "text")
      if (game) {
        game_select.setAttribute("value", game)
        game_select.setAttribute("hidden", true)
      } else {
        _EST_.selectGames(function(lGames){
          _EST_.fillDropdown(game_select, lGames)
        })
      }
      // free tags
      var free_input = document.createElement('input')
      free_input.setAttribute("name", "free")
      free_input.setAttribute("hidden", true)
      // submit
      var submit_field = document.createElement('fieldset')
      var submit_button = document.createElement('input')
      submit_button.setAttribute("type","submit")
      submit_button.setAttribute("name","submit")
      submit_button.setAttribute("onclick","dataLayer.push({'event': 'gfyUploaded'});")
      submit_button.setAttribute("value","Upload")
      submit_field.appendChild(submit_button)

      form.appendChild(gif_field)
      form.appendChild(start_time_field)
      form.appendChild(length_field)
      form.appendChild(title_field)
      if (game) {
        form.appendChild(game_select)
      } else {
        var game_field = document.createElement('fieldset')
        game_field.appendChild(game_select)
        form.appendChild(game_field)
      }
      form.appendChild(free_input)
      form.appendChild(submit_field)

      form.action = _EST_.APIdomain + '/add'
      form.addEventListener('submit', function (e) {
        var game = document.getElementById('game')
          , title = document.getElementById('title')
          , url = document.getElementById('url')
          , start = document.getElementById('start_time')
          , length = document.getElementById('length')

        if (parseInt(start.value).toString() != start.value || parseInt(length.value).toString() != length.value) {
          e.preventDefault()
          alert('Please only enter numbers in the time fields')
          return
        }

        if (parseInt(length.value) > 15) {
          e.preventDefault
          alert('15s max length')
          return
        }

        if (parseInt(start.value) < 0 || parseInt(length.value) < 0) {
          e.preventDefault
          alert('Please enter positive numbers')
          return
        }

        if (title.value == '' || url.value == '' || start.value == '' || length.value == '') {
          e.preventDefault()
          alert('Game over: all fields must be filled!')
        } else {
          e.preventDefault()
          _EST_.getHashtags()
          _EST_.encodeGif(url.value, start.value, length.value)
        }
      }, false)
      return form
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
    },

    feedback: function() {
      var main = document.getElementById('main')
      var feedback_label = document.createElement('a')
      feedback_label.setAttribute('href', "mailto:ggwping@gmail.com?subject=Some feedback about your site!")
      feedback_label.setAttribute('target', "_blank")
      feedback_label.className = "feedback"
      feedback_label.textContent = "Feedback"
      main.appendChild(feedback_label)
    },

    status: function(message) {
      var statusText = document.createElement('div')
      statusText.className = "status"
      statusText.textContent = message
      return statusText
    }
  },

  fillDropdown: function (dropdown, lGames) {
    var placeholder = document.createElement("option")
    placeholder.setAttribute('value', '')
    placeholder.setAttribute('disabled', 'true')
    placeholder.setAttribute('selected', 'true')
    placeholder.textContent = 'Game (list will be extended)'
    dropdown.appendChild(placeholder)
    dropdown.classList.add('dimmed')

    dropdown.addEventListener('change', function(e){
      this.classList.remove('dimmed')
      if (this.value == "Other...") {
        if (confirm("Hey, we'd love to know from you what games you want to see in epic gifs. Tell us via email!")) {
          window.location.href = "mailto:ggwping@gmail.com?subject=Please add my favourite game!"
        }
        this.selectedIndex = 0
        this.classList.add('dimmed')
      }
    })

    var lGameNames = []

    for (var i=0, iLength = lGames.length; i < iLength; i++) {
      var sGame = lGames[i].content
      lGameNames.push(sGame)
    }

    lGameNames.sort()
    for (var i=0, iLength = lGameNames.length; i < iLength; i++) {
      var sGame = lGameNames[i]
      if (sGame != "") {
        var option = document.createElement('option')
        option.value = sGame
        option.textContent = sGame
        dropdown.appendChild(option)
      }
    }
    var option = document.createElement('option')
    option.value = "Other..."
    option.textContent = "Other..."
    dropdown.appendChild(option)
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

  getGame: function(gif) {
    var tags = gif.tags
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i]
      if (tag.type == "game") return tag.content
    }
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
  },

  encodeGif: function(link, start, length) {
    if (link.indexOf('youtube.com/watch?v=') >= 0 || link.indexOf('youtu.be/') >= 0) {
      var status = this.templates.status("Now creating and uploading your epic play. This could take up to 2 min, please do not leave the page")
      var form = document.getElementById('add-form')
      form.appendChild(status);
      var unique_key = Date.now()

      var xhr = new XMLHttpRequest()
      xhr.open('GET', "http://upload.gfycat.com/transcode/" + unique_key + "?fetchSeconds="+start+"&fetchLength="+length+"&fetchUrl=" + link, true)

      xhr.onload = function(e) {
        if (this.status == 200) {
          var response = JSON.parse(this.responseText)
          console.log(response)
          if (response.error && response.error.indexOf('Connection timeout') >= 0) {
            _EST_.checkStatus(unique_key)
          } else if (response.error == "Unable to retrieve video.  Sorry, fetching video from remote services doesn't always work!"){
            status.remove()
            alert('There was a problem fetching the video :( please try that again')
          } else if (response.error == 'Url conversion already in progress.' && !response.gfyname) {
            status.remove()
            alert('Gif encoding already in progress')
          } else if (response.error == 'Url conversion already in progress.' && !response.task == 'complete'){
            status.remove()
            alert('this gif already exists!')
          } else if (response.error && response.error.indexOf('Sorry, please wait another') >= 0) {
            status.remove()
            alert('please allow 30s between two uploads')
          } else if (response.task == 'complete' || (!response.error && response.gfyname)) {
            var gfycatUrl = 'http://www.gfycat.com/' + response.gfyname
            _EST_.uploadGif(gfycatUrl)
          }
        }
      }

      xhr.send()
    } else {
      alert(':/ looks like this is not a supported youtube url, please check again')
    }
  },

  checkStatus: function(unique_key) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', "http://upload.gfycat.com/status/" + unique_key, true)

    xhr.onload = function(e) {
      if (this.status == 200) {
        var response = JSON.parse(this.responseText)
        if (response.task == 'encoding') {
          setTimeout(function(){
            _EST_.checkStatus(unique_key)
          }, 5000)
        } else if (response.task == 'complete') {
          var gfycatUrl = 'http://www.gfycat.com/' + response.gfyname
          _EST_.uploadGif(gfycatUrl)
        }
      }
    }

    xhr.send()
  },

  uploadGif: function(gfycatUrl) {
    var title = document.getElementsByName('title')[0].value
    var url = gfycatUrl
    var free = document.getElementsByName('free')[0].value
    var game = document.getElementsByName('game')[0].value
    var params = "title="+title+"&url="+url+"&free="+free+"&game="+game
    var xhr = new XMLHttpRequest()
    xhr.open('POST', _EST_.APIdomain + '/upload', true)
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function(e) {
      if (this.status == 200) {
        response = JSON.parse(this.responseText)
        window.location.href = window.location.origin + "/search.html?" + response.game[0].replace(/\ /g, "+")
      }
    }

    xhr.send(params);
  }
}

_EST_.init()