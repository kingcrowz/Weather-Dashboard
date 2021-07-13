var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');
var searchInputVal= document.querySelector('#search-input');
var today = document.querySelector('#currentWeatherSection');
var APIKey = "a305d46d8e583055265454a4f817362a";
var queryUrl;
var todayWeather;
function handleSearchFormSubmit(event) {
  event.preventDefault();

  searchInputVal= document.querySelector('#search-input').value;
  // var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInputVal + "&appid=" +APIKey;
  searchApi(searchInputVal, APIKey);
// var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;
//   var queryString = './search-results.html?q=' + searchInputVal;
//   location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchParamsArr = document.querySelector('#search-input').val;
    console.log(searchParamsArr);
    // Get the query and format values
    var query = searchParamsArr;
    console.log(query + "= Query");
    console.log(APIKey + "=appid");
  
  
    searchApi(query, APIKey);
  }




  function searchApi(query, format) {
    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    todayWeather = 'https://api.openweathermap.org/data/2.5/weather';
    console.log(format);
    locQueryUrl = locQueryUrl + '?q=' + query + "&appid=" + format + "&units=imperial";
    todayWeather = todayWeather + '?q=' + query + "&appid=" + format + "&units=imperial";
    getCurrentWeather(todayWeather);
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        // write query to page so user knows what they are viewing
        resultTextEl.textContent = locRes.city.name;
  
        console.log(locRes);
  
        if (locRes.message == "city not found") {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < locRes.list.length; i++) {
            if(i===0 || i===8 || i===16 || i===24 || i===32){
            printResults(locRes.list[i]);
            }
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  function printResults(resultObj) {
    console.log(resultObj);
  
    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.city;
  
    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
      '<strong>Date:</strong> ' + resultObj.dt_txt + '<br/>';
  
      bodyContentEl.innerHTML +=
        '<strong>Temperature:</strong> between ' + resultObj.main.temp_min + ' and ' + resultObj.main.temp_max + '<br/>';
  
      bodyContentEl.innerHTML +=
        '<strong>Description:</strong> ' + resultObj.weather[0].description;
    var imgElement = document.createElement("img");
    var icon = resultObj.weather[0].icon;
    var iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
    imgElement.src = iconurl;
  
    // var linkButtonEl = document.createElement('a');
    // linkButtonEl.textContent = 'Read More';
    // linkButtonEl.setAttribute('href', resultObj.url);
    // linkButtonEl.classList.add('btn', 'btn-dark');
  
    resultBody.append(titleEl, bodyContentEl, imgElement);
  
    resultContentEl.append(resultCard);
  }


function getCurrentWeather(todayWeather){
  fetch(todayWeather).then(function(response){
    return(response.json());
  }).then(function(data){
    console.log(data);
    var lat = data.coord.lat;
    var long = data.coord.lon;
    var headEl = document.createElement('h1');
    headEl.innerHTML = data.name;
    console.log(headEl);
    var uvVal = data.dt;
    console.log(uvVal);
    var timeholder  = moment.unix(uvVal).format("MM/DD/YYYY");
    var timeEl = document.createElement('h2');
    timeEl.innerHTML = timeholder;
    today.append(headEl, timeEl);
    getUVIndex(lat, long);

  })
}


function getUVIndex(lat, long){
  var holder = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + APIKey + "&units=imperial";
  fetch(holder).then(function(response){
    return(response.json());
  }).then(function(data){
    console.log(data);
  })
}
