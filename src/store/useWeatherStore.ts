import { create } from "zustand"
import type { WeatherStore } from "../types"

export const useWeatherStore = create<WeatherStore>((set) => ({

  // Starting values when app loads
  weatherData: null,
  isLoading: false,
  error: null,
  searchHistory: [],
  unit: "celsius",

  // Actions — functions that update state
  setWeatherData: (weatherData) => set({ weatherData }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  toggleUnit: () =>
    set((state) => ({
      unit: state.unit === "celsius" ? "fahrenheit" : "celsius",
    })),

  addToHistory: (city) =>
    set((state) => ({
      searchHistory: [
        city,
        ...state.searchHistory.filter((c) => c !== city),
      ].slice(0, 5),
    })),
}))