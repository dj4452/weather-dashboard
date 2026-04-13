import type { DailyForecast } from "../types"
import { useWeatherStore } from "../store/useWeatherStore"
import {
  getWeatherEmoji,
  getWeatherDescription,
  formatDay,
  formatTemp,
} from "../utils/formatters"

interface Props {
  forecast: DailyForecast
  isToday?: boolean
}

const ForecastCard = ({ forecast, isToday }: Props) => {
  const { unit } = useWeatherStore()

  return (
    <div
      className={`rounded-xl p-3 text-center transition-colors
        ${isToday
          ? "bg-blue-800 border border-blue-500"
          : "bg-gray-900 border border-gray-800 hover:border-gray-600"
        }`}
    >
      <p className="text-gray-400 text-xs mb-2 font-medium">
        {formatDay(forecast.date)}
      </p>
      <div className="text-2xl mb-2">
        {getWeatherEmoji(forecast.weatherCode)}
      </div>
      <p className="text-white font-bold text-sm">
        {formatTemp(forecast.maxTemp, unit)}
      </p>
      <p className="text-gray-500 text-xs">
        {formatTemp(forecast.minTemp, unit)}
      </p>
      <p className="text-gray-500 text-xs mt-1 leading-tight">
        {getWeatherDescription(forecast.weatherCode)}
      </p>
    </div>
  )
}

export default ForecastCard