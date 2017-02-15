var stringifiedSavedData = window.localStorage.getItem('storedData')
var convertedData = JSON.parse(stringifiedSavedData)
var jokesStore = {}
if (convertedData) {
  jokesStore = convertedData
}
// The message to display if the jokes object is empty
var noJokesMessage = '<h4 id="purple">I... I don\'t know any jokes. 😢</h4>'

var displayJoke = document.getElementById('displayJoke')
displayJoke.addEventListener('click', function () {
  var showJokeDiv = document.getElementById('jokeBox')
  var requestedJokeInput = document.getElementById('requestedJoke').value
  requestedJokeInput = requestedJokeInput.trim().toLocaleLowerCase()
  var jokeItself = jokesStore[requestedJokeInput]
  if (jokeItself) {
    showJokeDiv.innerHTML = '<p>' + jokeItself['setup'] + '</p>' + '<h6><strong> punchline </strong></h6>' + '<p>' + jokeItself['punchline'] + '</p>'
  } else {
    showJokeDiv.innerHTML = '<h2 id="red">No matching joke found 😢</h2>'
    document.getElementById('red').style.color = 'red'
  }
})

document.getElementById('rememberJoke').addEventListener('click', function () {
  var aboutJoke = document.getElementById('aboutJoke').value
  var setupJoke = document.getElementById('setupJoke').value
  var punchlineJoke = document.getElementById('punchlineJoke').value
  if (aboutJoke in jokesStore) {
    window.alert('Joke (About) already Exist')
  }
  if (aboutJoke) {
    aboutJoke = aboutJoke.trim().toLocaleLowerCase()
    jokesStore[aboutJoke] = {}

    if (setupJoke && punchlineJoke) {
      jokesStore[aboutJoke]['setup'] = setupJoke
      jokesStore[aboutJoke]['punchline'] = punchlineJoke
      updateJokes()
    } else {
      window.alert('Empty Textfiled')
    }
  } else {
    window.alert('Empty Textfiled')
  }
})
document.getElementById('forgetJoke').addEventListener('click', function () {
  var joke2Forget = document.getElementById('joke2Forget').value

  if (joke2Forget in jokesStore) {
    delete jokesStore[joke2Forget]
  } else {
    window.alert('Joke (About) does not exist')
  }
  updateJokes()
})

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  var jokeKeys = Object.keys(jokesStore)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

var updateJokes = function () {
  var stringifiedData = JSON.stringify(jokesStore)
  window.localStorage.setItem('storedData', stringifiedData)
  updateJokesMenu()
}
// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
}

updatePage()
