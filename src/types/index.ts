
export interface GeoLocation {
  name: string
  country: string
  country_code: string
  latitude: number
  longitude: number
  admin1?: string     
}


export interface GeoResponse {
  results?: GeoLocation[]  
}


export interface CurrentWeather {
  temperature: number
  windspeed: number
  humidity: number
  weatherCode: number
  time: string
}


export interface DailyForecast {
  date: string
  maxTemp: number
  minTemp: number
  weatherCode: number
}


export interface WeatherData {
  location: GeoLocation
  current: CurrentWeather
  forecast: DailyForecast[]
}


export interface WeatherStore {
  weatherData: WeatherData | null
  isLoading: boolean
  error: string | null
  searchHistory: string[]
  unit: "celsius" | "fahrenheit"
  setWeatherData: (data: WeatherData) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void
  addToHistory: (city: string) => void
  toggleUnit: () => void
}