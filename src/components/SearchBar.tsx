import { useState } from "react"
import type { FormEvent } from "react"

interface Props {
  onSearch: (city: string) => void
  isLoading: boolean
}

const SearchBar = ({ onSearch, isLoading }: Props) => {
  const [value, setValue] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (value.trim()) onSearch(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && value.trim() && onSearch(value.trim())}
        placeholder="Search city e.g. London"
        disabled={isLoading}
        className="flex-1 bg-gray-800 border border-gray-700
                   text-white placeholder-gray-500 rounded-lg
                   px-4 py-3 text-sm focus:outline-none
                   focus:border-blue-500 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!value.trim() || isLoading}
        className="bg-blue-600 hover:bg-blue-500
                   disabled:bg-gray-700 disabled:cursor-not-allowed
                   text-white font-semibold px-6 py-3
                   rounded-lg text-sm transition-colors min-w-24"
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
    </form>
  )
}

export default SearchBar
