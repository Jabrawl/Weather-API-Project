let form = document.querySelector('.city-form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
})

const getData = async (city, key) => {
    let result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    return result.data
}

const DOM_Elements = {
    weather_info: '.weather-info'
}

const create_info = (city, forecast, high, low, humidity) => {
    const html = `<thead>
    <tr>
      <th scope="col">City</th>
      <th scope="col">Forecast</th>
      <th scope="col">High</th>
      <th scope="col">Low</th>
      <th scope="col">Humidity</th>
    </tr>
  </thead>
  <tbody>
    <tr class="weather-row">
        <td class="driver">${city}</td>
        <td class="driver">${forecast}</td>
        <td class="driver">${high}</td>    
        <td class="driver">${low}</td>
        <td class="driver">${humidity}</td>
    </tr>
  </tbody>`;
    document.querySelector(DOM_Elements.weather_info).insertAdjacentHTML('beforeend', html)
}

const load_weather = async () => {
    let key = 'e8d628a659660bf29f83262dd7fa7008';
    let city = document.querySelector('#your-city').value

    document.querySelector(DOM_Elements.weather_info).innerHTML = ''
    const weather = await getData(city, key);
    create_info(city, `${farenheit(weather.main.temp)}°F`, `${farenheit(weather.main.temp_max)}°F`, `${farenheit(weather.main.temp_min)}°F`, `${weather.main.humidity}%`)
}

const farenheit = temper => {
    return ((temper - 273.15) * 9 / 5 + 32).toFixed(2)
}
