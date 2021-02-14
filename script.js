const button = document.querySelector('.btn');
const search = document.getElementById('weather-app__input');

function generateWeatherApp(weather) {
 
    getMainWeather
    
    document.body.innerHTML = weather.main.temp
}

async function getWeatherData(searchterm) {
    
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchterm}&appid=fab001dc16d9e80e9c8227142cc821b7`);
    if (data.ok) {
        const weather = await data.json()
        generateWeatherApp()
    } else {
        console.log('Oh no spagetti Os');
    }
}


button.addEventListener('click', (e) => {
    getWeatherData(search.value)
    search.value = '';

    

})