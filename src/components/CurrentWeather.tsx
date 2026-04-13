import type { WeatherData } from "../types"
import {
  getWeatherEmoji,
  getWeatherDescription,
  formatTemp,
} from "../utils/formatters"
import { useWeatherStore } from "../store/useWeatherStore"

interface Props {
  data: WeatherData
}

const CurrentWeather = ({ data }: Props) => {
  const { unit, toggleUnit } = useWeatherStore()
  const { location, current } = data

  return (
    <div className="bg-blue-900 border border-blue-700 rounded-2xl p-6">

      {/* Location + unit toggle */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {location.name}
          </h2>
          <p className="text-blue-300 text-sm">
            {location.admin1 ? `${location.admin1}, ` : ""}
            {location.country}
          </p>
        </div>

        <button
          onClick={toggleUnit}
          className="bg-blue-800 hover:bg-blue-700 text-blue-200
                     px-3 py-1.5 rounded-lg text-sm font-medium
                     transition-colors border border-blue-600"
        >
          {unit === "celsius" ? "Switch to °F" : "Switch to °C"}
        </button>
      </div>

      {/* Temperature + emoji */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-6xl font-bold text-white">
            {formatTemp(current.temperature, unit)}
          </div>
          <div className="text-blue-200 text-sm mt-1">
            {getWeatherDescription(current.weatherCode)}
          </div>
        </div>
        <div className="text-7xl">
          {getWeatherEmoji(current.weatherCode)}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Humidity", value: `${current.humidity}%`, icon: "💧" },
          { label: "Wind", value: `${Math.round(current.windspeed)} km/h`, icon: "💨" },
          { label: "Condition", value: getWeatherDescription(current.weatherCode), icon: "🌡️" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-blue-950 bg-opacity-60 rounded-xl p-3 text-center"
          >
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="text-white font-semibold text-sm truncate">
              {stat.value}
            </div>
            <div className="text-blue-300 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default CurrentWeather