import SearchBar from "./components/SearchBar"
import { useWeather } from "./hooks/useWeather"
import { useWeatherStore } from "./store/useWeatherStore"
import CurrentWeather from "./components/CurrentWeather"
import TemperatureChart from "./components/TemperatureChart"
import ForecastCard from "./components/ForecastCard"
import { useMemo } from "react"


import "./index.css"
function App() {

  const {
    isLoading,    
    searchHistory,
    weatherData
  } = useWeatherStore()

  const { search } = useWeather();

  const forecast = useMemo(
    () => weatherData?.forecast ?? [],
    [weatherData]
  )
 // const isLoading = false;
  return (
     <div className="min-h-screen bg-gray-950 text-gray-300 p-6 w-xl margin-top-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold">UK Weather Dashboard</h1>      
        </div>
        <SearchBar onSearch={search} isLoading={isLoading} /> 
         {searchHistory.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-500 text-xs uppercase tracking-wider">
              Recent:
            </span>
            {searchHistory.map((city) => (
              <button
                key={city}
                onClick={() => search(city)}
                className="text-xs bg-gray-800 hover:bg-gray-700
                           text-gray-300 px-3 py-1 rounded-full
                           transition-colors">
                {city}
              </button>
            ))}
          </div>
        )}
        {!isLoading && weatherData && (
          <div className="space-y-4">
            <CurrentWeather data={weatherData} />           
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-3">
                7-day forecast
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {forecast.map((day, i) => (
                  <ForecastCard
                    key={day.date}
                    forecast={day}
                    isToday={i === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        )}       
     </div>
  )
}

export default App