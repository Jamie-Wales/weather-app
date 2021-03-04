const button = document.querySelector('.btn');
const search = document.getElementById('weather-app__input');
const celc = document.querySelector('.weather-app__results__temp-type__C');
const farin = document.querySelector('.weather-app__results__temp-type__F');


async function getWeatherData(searchterm) {
    if (celc.classList.contains('active')) {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchterm}&units=metric&appid=fab001dc16d9e80e9c8227142cc821b7`);
        const weeklyData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchterm}&units=metric&appid=fab001dc16d9e80e9c8227142cc821b7`);
        const quoteOfTheDay = await fetch('https://quotes.rest/qod?language=en');
        dataCheck(data, weeklyData, quoteOfTheDay);
    } else {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchterm}&units=imperial&appid=fab001dc16d9e80e9c8227142cc821b7`);
        const weeklyData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchterm}&units=imperial&appid=fab001dc16d9e80e9c8227142cc821b7`);
        const quoteOfTheDay = await fetch('https://quotes.rest/qod?language=en');
        dataCheck(data, weeklyData, quoteOfTheDay);
    }
}

async function dataCheck(data, weeklyData, quoteOfTheDay) {
    if (data.ok && weeklyData.ok && quoteOfTheDay) {
        const weather = await data.json()
        const next24 = await weeklyData.json();
        const quote = await quoteOfTheDay.json();
        const quoteText = await quote.contents.quotes[0].quote
        const results = document.querySelector('.weather-app__results');
        results.classList.remove('hidden');
        const error = document.querySelector('.weather-app__error');
        error.classList.add('hidden');
        generateHero(weather);
        generateNext24Hrs(next24);
        generateQotd(quoteText);
        
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
    const sunrise = new Date(weather.sys.sunrise * 1000);
    const sunset = new Date(weather.sys.sunset * 1000);
    generateSunriseset(sunrise.toLocaleTimeString(), sunset.toLocaleTimeString());
}

function generateHeroImage(weather) {
    const heroImage = document.querySelector('.weather-app__results__hero');
    const icon = document.querySelector('.weather-app__results__icon');
    if (weather == 'Rain') {
        heroImage.style.backgroundImage = 'url(./img/rain.jpg)';
        icon.style.backgroundImage = 'url(./icons/showers.svg)';
    }
    if (weather == 'Thunderstorm') {
        heroImage.style.backgroundImage = 'url(./img/thunderstorms.jpg)';
        icon.style.backgroundImage = 'url(./icons/showers.svg)';
    }
    if (weather == 'Drizzle') {
        heroImage.style.backgroundImage = 'url(./img/drizzle.jpg)';
        icon.style.backgroundImage = 'url(./icons/drizzle.svg)';
    }
    if (weather == 'Clouds') {
        heroImage.style.backgroundImage = 'url(./img/cloudy.jpg)';
        icon.style.backgroundImage = 'url(./icons/cloudy.svg)';
    }
    if (weather == 'Snow') {
        heroImage.style.backgroundImage = 'url(./img/snow.jpg)';
        icon.style.backgroundImage = 'url(./icons/snow.svg)';
    }
    if (weather == 'Clear') {
        heroImage.style.backgroundImage = 'url(./img/sunny.jpg)';
        icon.style.backgroundImage = 'url(./icons/sun.svg)';
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

function addIcon(weeklyWeatherType, icon) {
    if (weeklyWeatherType == 'Rain') {
        icon.style.backgroundImage = 'url(./icons/showers.svg)';
    }
    if (weeklyWeatherType == 'Thunderstorm') {
        icon.style.backgroundImage = 'url(./icons/showers.svg)';
    }
    if (weeklyWeatherType == 'Drizzle') {
        icon.style.backgroundImage = 'url(./icons/drizzle.svg)';
    }
    if (weeklyWeatherType == 'Clouds') {
        icon.style.backgroundImage = 'url(./icons/cloudy.svg)';
    }
    if (weeklyWeatherType == 'Snow') {
        icon.style.backgroundImage = 'url(./icons/snow.svg)';
    }
    if (weeklyWeatherType == 'Clear') { 
        icon.style.backgroundImage = 'url(./icons/sun.svg)';
    }  
}

function generateNext24Hrs(next24) {
    const next24ForcastHtml = document.querySelector('.weather-app__results__cards');
    next24ForcastHtml.innerHTML = '';
    for (let i = 0; i < 8; i++){
        let newElement = document.createElement('div');
        let title = document.createElement('h2');
        let firstP = document.createElement('p');
        let secondP = document.createElement('p');
        let icon = document.createElement('div');
        newElement.classList.add('weather-app__results__card');
        title.classList.add('weather-app__results__card__title');
        title.classList.add('title--medium');
        newElement.classList.add('weather-app__results__card');
        newElement.classList.add('weather-app__results__card');
        firstP.classList.add('weather-app__results__card__info');
        secondP.classList.add('weather-app__results__card__temp');
        icon.classList.add('weather-app__results__card__icon');
        newElement.appendChild(title);
        newElement.appendChild(firstP);
        newElement.appendChild(secondP);
        newElement.appendChild(icon);
        title.textContent = i;
        next24ForcastHtml.appendChild(newElement);
        const thisDate = new Date(next24.list[i].dt * 1000);
        title.innerText = thisDate.toLocaleTimeString();
        firstP.innerText = next24.list[i].weather[0].description;
        secondP.innerText = `${next24.list[i].main.temp}°`;
        const weeklyWeatherType = next24.list[i].weather[0].main;
        addIcon(weeklyWeatherType, icon);
    };
};

function generateSunriseset(sunrise, sunset) {
    const sunriseHtml = document.querySelector('.weather-app__results__highlights__boxes__sunrise-sunrise__icon__text');
    const sunsetHtml = document.querySelector('.weather-app__results__highlights__boxes__sunrise-sunset__icon__text');
    sunriseHtml.innerHTML = sunrise;
    sunsetHtml.innerHTML = sunset;
};

function generateQotd(quoteText) {
    const qotd = document.querySelector('p.weather-app__results__highlights__quote-of-the-day');
    qotd.innerText = quoteText;
};

button.addEventListener('click', (e) => {
    getWeatherData(search.value)
    search.value = '';
});

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherData(search.value)
        search.value = '';
    }
});

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
};


