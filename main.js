let elSelect = document.querySelector('.box__select');
let currentDate = new Date().toJSON().slice(0, 10);
let needDate = `${currentDate.slice(0, 4)}-${currentDate.slice(5, 7)}-${currentDate.slice(8, 10)}`
let dateTime = document.querySelector('.info__date');

fetch(`countries.json`)
    .then(function(information) {return information.json()})
    .then(function(data) {
        for(let item of data){
            elSelect.innerHTML += `<option value="${item.name}">${item.name}</option>`
        }
    })

function logWeather(country){
    dateTime.innerHTML = `<time datetime="${needDate}">${needDate}</time>`;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=6ba5ed3ac209689fcf853297a4dc8e10`)
        .then(function(information) {return information.json()})
        .then(function(data) {
            console.log(data);
            document.querySelector('.box__icon-img').src = `img/icons/${data.weather[0].icon}.svg`;
            document.querySelector('.info__celcius').textContent = `${Math.floor(data.main.temp - 273,15)}℃`;
            document.querySelector('.info__weather').textContent = `${data.weather[0].main}`;
            document.querySelector('.info__text').textContent = `${Math.floor(data.wind.speed)} km/h`;
        })
}

elSelect.addEventListener('change',()=>{
    logWeather(elSelect.value);
})

logWeather('Afghanistan');