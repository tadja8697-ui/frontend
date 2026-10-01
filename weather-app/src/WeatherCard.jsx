import { getWeatherIcon } from './weatherIcons.js';

function WeatherCard({ data }) {
    const { currentConditions, resolvedAddress, timezone } = data;

    return (
        <div className="weather-card">
            <header className="weather-card-header">
                <h2>{resolvedAddress}</h2>
                <p className="weather-timezone">{timezone}</p>
            </header>

            <div className="weather-card-main">
                <div className="weather-icon-big">
                    {getWeatherIcon(currentConditions.icon)}
                </div>
                <div className="weather-temp">
                    {Math.round(currentConditions.temp)}°C
                </div>
            </div>

            <p className="weather-condition-text">
                {currentConditions.conditions}
            </p>

            <dl className="weather-details">
                <div>
                    <dt>💨 Wind</dt>
                    <dd>{currentConditions.windspeed} km/h</dd>
                </div>
                <div>
                    <dt>🌧️ Rain chance</dt>
                    <dd>{currentConditions.precipprob}%</dd>
                </div>
                <div>
                    <dt>💧 Humidity</dt>
                    <dd>{currentConditions.humidity}%</dd>
                </div>
                <div>
                    <dt>🌡️ Feels like</dt>
                    <dd>{Math.round(currentConditions.feelslike)}°C</dd>
                </div>
            </dl>
        </div>
    );
}

export default WeatherCard;