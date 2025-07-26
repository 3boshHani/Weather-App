const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/weather/:city', async (req, res) => {

    const city = req.params.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
    const response = await axios.get(url);
    const weatherData = response.data;
    res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
        });
    } catch (error) {
        res.status(400).json({ error: 'City not found or API error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});