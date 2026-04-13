import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import type { DailyForecast } from "../types"
import { useWeatherStore } from "../store/useWeatherStore"
import { formatDay, toFahrenheit } from "../utils/formatters"

interface Props {
  forecast: DailyForecast[]
}

const TemperatureChart = ({ forecast }: Props) => {
  const { unit } = useWeatherStore()

  const chartData = forecast.map((day) => ({
    day: formatDay(day.date),
    max: unit === "celsius"
      ? Math.round(day.maxTemp)
      : toFahrenheit(day.maxTemp),
    min: unit === "celsius"
      ? Math.round(day.minTemp)
      : toFahrenheit(day.minTemp),
  }))

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <h3 className="text-gray-400 text-sm font-medium mb-4">
        7-day temperature trend
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1f2937"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}°`}
            width={35}
          />
          <Tooltip
            contentStyle={{
              background: "#111827",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "12px",
            }}
            /*formatter={(value: number, name: string) => [
              formatTemp(
                unit === "celsius"
                  ? value
                  : ((value - 32) * 5) / 9,
                unit
              ),
              name === "max" ? "High" : "Low",
            ]}*/
          />
          <Line
            type="monotone"
            dataKey="max"
            stroke="#60a5fa"
            strokeWidth={2.5}
            dot={{ fill: "#60a5fa", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="min"
            stroke="#93c5fd"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={{ fill: "#93c5fd", r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-2 justify-center">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <div className="w-6 h-0.5 bg-blue-400 rounded" />
          High
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <div className="w-6 border-t border-dashed border-blue-300" />
          Low
        </div>
      </div>
    </div>
  )
}

export default TemperatureChart