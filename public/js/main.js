document.getElementById('add').addEventListener('click',async()=> {

    const city = document.getElementById('input').value.trim();
    const resultDiv = document.getElementById('result');

    if (!city) {
    resultDiv.innerHTML = '<p>Please enter a city name</p>';
    return;
}
    resultDiv.innerHTML = '<p>Loading...</p>';
    try {
    const response = await fetch(`/weather/${city}`);
    const data = await response.json();

    if (data.error) {
    resultDiv.innerHTML = `<p>${data.error}</p>`;
    } else {
    resultDiv.innerHTML = `
        <p>City: ${data.city}</p>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Description: ${data.description}</p>
        <img src="http://openweathermap.org/img/wn/${data.icon}.png" alt="Weather Icon">
    `;
}
    } catch (error) {
    resultDiv.innerHTML = '<p>Error fetching weather data</p>';
}
})