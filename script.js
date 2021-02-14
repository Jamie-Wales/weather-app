const button = document.querySelector('.btn');
const search = document.getElementById('weather-app__input');
const results = document.querySelector('.weather-app__results');


async function getWeatherData(searchterm) {
    
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchterm}&appid=fab001dc16d9e80e9c8227142cc821b7`);
    if (data.ok) {
        const weather = await data.json()
        results.classList.remove('hidden');
        generateWeatherApp(weather);
    } else {
        console.log('Oh no spagetti Os');
    }
}

function generateWeatherApp(weather) {
    const title = document.querySelector('.weather-app__results__place');
    const subtitle = document.querySelector('.weather-app__results__subtitle')
    title.textContent = weather.name;
    subtitle.textContent = weather.weather[0].description;
    console.log(weather);

    
}

button.addEventListener('click', (e) => {
    getWeatherData(search.value)
    search.value = '';

})