import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWeather } from './useWeather.js';
import WeatherCard from './WeatherCard.jsx';
import HourlyForecast from './HourlyForecast.jsx';
import Loader from './Loader.jsx';
import './style.css';

function App() {
    const [location, setLocation] = useState('');
    const { weatherData, isLoading, error, fetchWeather } = useWeather();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.trim()) {
            fetchWeather(location.trim());
        }
    };

    const handleRefresh = () => {
        if (weatherData?.resolvedAddress) {
            // On relance la requête avec l'adresse résolue
            fetchWeather(weatherData.resolvedAddress);
        } else if (location.trim()) {
            fetchWeather(location.trim());
        }
    };

    return (
        <main className="page">
            <h1>Weather Web App</h1>

            <form className="search-form" onSubmit={handleSubmit}>
                <label htmlFor="location-input" className="sr-only">
                    Enter a location
                </label>
                <input
                    id="location-input"
                    type="text"
                    className="search-input"
                    placeholder="Enter a city, ZIP code, or address..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                <button type="submit" className="search-btn" disabled={isLoading}>
                    Search
                </button>
            </form>

            {/* Zone de contenu animée */}
            <div className="content-area">
                <AnimatePresence mode="wait">
                    {isLoading && <Loader key="loader" />}

                    {error && !isLoading && (
                        <motion.div
                            key="error"
                            className="error-message"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <p>⚠️ {error}</p>
                        </motion.div>
                    )}

                    {weatherData && !isLoading && !error && (
                        <motion.div
                            key={weatherData.resolvedAddress}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="results-header">
                                <button
                                    type="button"
                                    className="refresh-btn"
                                    onClick={handleRefresh}
                                    aria-label="Refresh weather data"
                                >
                                    🔄 Refresh
                                </button>
                            </div>

                            <WeatherCard data={weatherData} />
                            <HourlyForecast hours={weatherData.days[0].hours} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

export default App;