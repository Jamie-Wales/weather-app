const button = document.querySelector('.btn');
const search = document.getElementById('weather-app__input');
const celc = document.querySelector('.weather-app__results__temp-type__C');
const farin = document.querySelector('.weather-app__results__temp-type__F');



async function getWeatherData(searchterm) {
    if (celc.classList.contains('active')) {
        const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchterm}&units=metric&appid=fab001dc16d9e80e9c8227142cc821b7`);
        dataCheck(data)
    } else {
        const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchterm}&units=imperial&appid=fab001dc16d9e80e9c8227142cc821b7`);
        dataCheck(data)
    }
}

async function dataCheck(data) {
    if (data.ok) {
        const weather = await data.json()
        const results = document.querySelector('.weather-app__results');
        results.classList.remove('hidden');
        const error = document.querySelector('.weather-app__error');
        error.classList.add('hidden');
        generateHero(weather);
        
    } else {
        const error = document.querySelector('.weather-app__error');
        const results = document.querySelector('.weather-app__results');
        error.classList.remove('hidden');
        results.classList.add('hidden');
    }
}

function generateHero(weather) {
    const title = document.querySelector('.weather-app__results__place');
    const subtitle = document.querySelector('.weather-app__results__subtitle');
    const temperature = document.querySelector('.weather-app__results__temp');
    const country = document.querySelector('.weather-app__results__country');
    title.textContent = weather.name;
    subtitle.textContent = weather.weather[0].description;
    temperature.textContent = `${weather.main.temp}°`;
    country.textContent = weather.sys.country;
    const weatherType = weather.weather[0].main;
    generateHeroImage(weatherType);
    
}

function generateHeroImage(weather) {
    const heroImage = document.querySelector('.weather-app__results__hero');
    const icon = document.querySelector('.weather-app__results__icon');
    if (weather == 'Rain') {
        heroImage.style.backgroundImage = 'url(./img/rain.jpg)'
        icon.style.backgroundImage = 'url(./icons/showers.svg)'
    }
    if (weather == 'Thunderstorm') {
        heroImage.style.backgroundImage = 'url(./img/thunderstorms.jpg)'
        icon.style.backgroundImage = 'url(./icons/showers.svg)'
    }
    if (weather == 'Drizzle') {
        heroImage.style.backgroundImage = 'url(./img/drizzle.jpg)'
        icon.style.backgroundImage = 'url(./icons/drizzle.svg)'
    }
    if (weather == 'Clouds') {
        heroImage.style.backgroundImage = 'url(./img/cloudy.jpg)'
        icon.style.backgroundImage = 'url(./icons/cloudy.svg)'
    }


}

function checkActive(event, celc, far) {
    if (event.target.classList.contains('active')) {
        return;
    }
    else if(celc.classList.contains('active')) {
        celc.classList.remove('active');
        far.classList.add('active');
    } else {
        far.classList.remove('active');
        celc.classList.add('active');
    }
}


function generateDate() {
    const date = new Date;
    const dateText = document.querySelector('.weather-app__body');
    dateText.textContent = date.toDateString();

}

button.addEventListener('click', (e) => {
    getWeatherData(search.value)
    search.value = '';

})

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherData(search.value)
        search.value = '';
    }

})

farin.addEventListener('click', (e) => {
    checkActive(e, celc, farin)
    const title = document.querySelector('.weather-app__results__place')
    getWeatherData(title.textContent)
});


celc.addEventListener('click', (e) => {
    checkActive(e, celc, farin)
    const title = document.querySelector('.weather-app__results__place')
    getWeatherData(title.textContent)
});


window.onload = event => {
    
    
    generateDate();

}

