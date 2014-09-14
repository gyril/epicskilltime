document.getElementById('searchbox').addEventListener('keydown', function(e) {
  if (e.keyCode == 13)
    search(this.value)
}, false)

document.addEventListener('click', function (e) {
  if (e.target.className.indexOf('tag') > -1)
    search(e.target.textContent.substr(1))

  if (e.target.parentElement.id == 'random')
    window.location.href = './add.html'

  if (e.target.parentElement.parentElement.className.indexOf('card-popular-content') > -1)
    search(e.target.textContent)

  if (e.target.id == 'logo')
    window.location.href = './index.html'
}, false)