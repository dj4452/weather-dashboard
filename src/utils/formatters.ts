export const toFahrenheit = (celsius: number): number =>
  Math.round((celsius * 9) / 5 + 32)


export const formatTemp = (
  celsius: number,
  unit: "celsius" | "fahrenheit"
): string =>
  unit === "celsius"
    ? `${Math.round(celsius)}°C`
    : `${toFahrenheit(celsius)}°F`

// Weather code → description (WMO standard codes)
export const getWeatherDescription = (code: number): string => {
  const conditions: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Foggy", 48: "Icy fog",
    51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
    61: "Light rain", 63: "Rain", 65: "Heavy rain",
    71: "Light snow", 73: "Snow", 75: "Heavy snow",
    80: "Light showers", 81: "Showers", 82: "Heavy showers",
    95: "Thunderstorm", 99: "Heavy thunderstorm",
  }
  return conditions[code] ?? "Unknown"
}

// Weather code → emoji
export const getWeatherEmoji = (code: number): string => {
  if (code === 0) return "☀️"
  if (code <= 2) return "🌤️"
  if (code === 3) return "☁️"
  if (code <= 48) return "🌫️"
  if (code <= 55) return "🌦️"
  if (code <= 65) return "🌧️"
  if (code <= 77) return "❄️"
  if (code <= 82) return "🌩️"
  return "⛈️"
}

export const formatDay = (dateStr: string): string => {
  const date = new Date(dateStr)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  if (date.toDateString() === today.toDateString()) return "Today"
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow"

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}