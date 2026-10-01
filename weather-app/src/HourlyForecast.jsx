import { getWeatherIcon } from './weatherIcons.js';

function HourlyForecast({ hours }) {
    if (!hours || hours.length === 0) return null;

    // On récupère l'index de l'heure actuelle
    const now = new Date();
    const currentHourIndex = hours.findIndex((h) => {
        const hourTime = new Date(h.datetimeEpoch * 1000);
        return hourTime.getHours() === now.getHours();
    });

    // On prend les 12 heures avant et 12 heures après (si disponibles)
    const start = Math.max(0, currentHourIndex - 12);
    const end = Math.min(hours.length, currentHourIndex + 13);
    const displayHours = hours.slice(start, end);

    return (
        <section className="hourly-forecast">
            <h3>24-Hour Outlook</h3>
            <div className="hourly-list">
                {displayHours.map((hour, index) => {
                    const isNow = index === 12; // L'heure actuelle est au milieu
                    const hourDate = new Date(hour.datetimeEpoch * 1000);
                    const hourLabel = hourDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                        <div
                            key={hour.datetimeEpoch}
                            className={`hourly-item ${isNow ? 'is-now' : ''}`}
                        >
                            <span className="hourly-time">
                                {isNow ? 'Now' : hourLabel}
                            </span>
                            <span className="hourly-icon">
                                {getWeatherIcon(hour.icon)}
                            </span>
                            <span className="hourly-temp">
                                {Math.round(hour.temp)}°
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default HourlyForecast;