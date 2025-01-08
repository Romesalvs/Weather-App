const API_KEY = `465dac04deae4ec4a33105928250801`

const formElement = document.querySelector('.form')
const cardElement = document.querySelector('.card')
const inputElement = document.querySelector('.input')

formElement.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (!inputElement.value.trim()) {
        console.log('Enter city name')
        return
    }

    const weatherInfo = await getWeather(inputElement.value.trim())

    if (!weatherInfo.length === 0) return

    const cityName = weatherInfo.location.name
    const cityTemp = Math.round(weatherInfo.current.temp_c)
    const cityConditionText = weatherInfo.current.condition.text
    const cityConditionIcon = weatherInfo.current.condition.icon

    renderWeather(cityName, cityTemp, cityConditionText, cityConditionIcon)

    inputElement.value = ''
})

async function getWeather(city) {
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    const response = await fetch(weatherUrl)
    const data = await response.json()
    return data
}

function renderWeather(city, temp, condText, condIcon) {
    cardElement.classList.remove('none')

    const cardCity = document.querySelector('.card-city')
    const cardTemp = document.querySelector('.card-value')
    const cardCondText = document.querySelector('.card-description')
    const cardCondImg = document.querySelector('.card-img')

    cardCity.innerText = `${city}`
    cardTemp.innerText = `${temp}` + '°c'
    cardCondText.innerText = `${condText}`
    cardCondImg.setAttribute('src', `${condIcon}`)
}
