import { useState, useCallback, useEffect } from 'react';

// Unités : 'metric' pour Celsius, km/h
const UNIT_GROUP = 'metric';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function useWeather() {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = useCallback(async (location) => {
        if (!location) return;

        setIsLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            // On demande les conditions actuelles ET les prévisions horaires
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${UNIT_GROUP}&include=current,hours&key=${API_KEY}&contentType=json`;

            const response = await fetch(url);

            if (!response.ok) {
                // Gestion des erreurs HTTP (404, 401, etc.)
                if (response.status === 400) {
                    throw new Error('Location not found. Please try another search.');
                }
                if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your .env file.');
                }
                throw new Error('Failed to fetch weather data. Please try again later.');
            }

            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Optionnel : Charger la position actuelle au démarrage
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // On passe les coordonnées comme localisation
                    fetchWeather(`${latitude},${longitude}`);
                },
                () => {
                    // L'utilisateur a refusé ou erreur : on ne fait rien
                    console.log('Geolocation permission denied.');
                }
            );
        }
    }, [fetchWeather]);

    return { weatherData, isLoading, error, fetchWeather };
}