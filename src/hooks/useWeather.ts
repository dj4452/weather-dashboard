import axios from "axios"
import { useWeatherStore } from "../store/useWeatherStore"
import type { GeoResponse, GeoLocation, WeatherData, DailyForecast } from "../types"

// Simple cache — prevents repeat API calls for 10 minutes
const cache = new Map<string, { data: WeatherData; timestamp: number }>()
const CACHE_TTL = 10 * 60 * 1000

const getCached = (city: string): WeatherData | null => {
  const entry = cache.get(city.toLowerCase())
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(city.toLowerCase())
    return null
  }
  return entry.data
}

// Step 1 — City name → coordinates
const searchCity = async (city: string): Promise<GeoLocation> => {
  const res = await axios.get<GeoResponse>(
    "https://geocoding-api.open-meteo.com/v1/search",
    { params: { name: city, count: 1, language: "en", format: "json" } }
  )
  const results = res.data.results
  if (!results || results.length === 0) {
    throw new Error(`City "${city}" not found. Please try another name.`)
  }
  return results[0]
}

// Step 2 — Coordinates → weather data
const fetchWeatherData = async (location: GeoLocation): Promise<WeatherData> => {
  const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      current: "temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code",
      daily: "temperature_2m_max,temperature_2m_min,weather_code",
      timezone: "Europe/London",
      forecast_days: 7,
    },
  })

  const c = res.data.current
  const d = res.data.daily

  const forecast: DailyForecast[] = (d.time as string[]).map(
    (date: string, i: number) => ({
      date,
      maxTemp: d.temperature_2m_max[i] as number,
      minTemp: d.temperature_2m_min[i] as number,
      weatherCode: d.weather_code[i] as number,
    })
  )

  return {
    location,
    current: {
      temperature: c.temperature_2m as number,
      windspeed: c.wind_speed_10m as number,
      humidity: c.relative_humidity_2m as number,
      weatherCode: c.weather_code as number,
      time: c.time as string,
    },
    forecast,
  }
}

// The hook — what components import and use
export const useWeather = () => {
  const { setWeatherData, setLoading, setError, addToHistory } = useWeatherStore()

  const search = async (city: string): Promise<void> => {
    const cleaned = city.trim()
    if (!cleaned) { setError("Please enter a city name"); return }

    const cached = getCached(cleaned)
    if (cached) { setWeatherData(cached); addToHistory(cleaned); return }

    setLoading(true)
    setError(null)

    try {
      const location = await searchCity(cleaned)
      const weatherData = await fetchWeatherData(location)
      cache.set(cleaned.toLowerCase(), { data: weatherData, timestamp: Date.now() })
      setWeatherData(weatherData)
      addToHistory(cleaned)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError("Could not connect. Please check your internet connection.")
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred.")
      }
    } finally {
      setLoading(false)
    }
  }

  return { search }
}