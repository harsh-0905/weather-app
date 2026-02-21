"use client"

import { useState } from "react"
import { CloudSun, AlertCircle } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { WeatherCard, type WeatherData } from "@/components/weather-card"
import { Loader } from "@/components/loader"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(city: string) {
    setIsLoading(true)
    setError(null)
    setWeather(null)

    try {
      console.log("[v0] Fetching weather for:", city)
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      console.log("[v0] Response status:", res.status)

      const data = await res.json()
      console.log("[v0] Response data:", data)

      if (!res.ok) {
        setError(data.error || "Something went wrong.")
        return
      }

      setWeather(data as WeatherData)
    } catch (err) {
      console.log("[v0] Fetch error:", err)
      setError("Unable to connect. Please check your internet and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <CloudSun className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Weather
          </span>
        </div>
        <DarkModeToggle />
      </header>

      {/* Content */}
      <div className="flex flex-col items-center px-4 pb-16 pt-8 md:pt-16">
        <div className="flex flex-col items-center gap-2 mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-balance text-center">
            Check the Weather
          </h1>
          <p className="text-muted-foreground text-sm md:text-base text-center text-pretty max-w-sm">
            Search any city to get real-time weather conditions, temperature, and more.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        <div className="mt-8 w-full flex justify-center">
          {isLoading && <Loader />}

          {error && (
            <div
              className="flex items-center gap-3 w-full max-w-md rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3"
              role="alert"
            >
              <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {weather && !isLoading && <WeatherCard data={weather} />}
        </div>

        {!weather && !isLoading && !error && (
          <div className="mt-16 flex flex-col items-center gap-3 text-muted-foreground/50">
            <CloudSun className="h-16 w-16" />
            <p className="text-sm">Enter a city name to get started</p>
          </div>
        )}
      </div>
    </main>
  )
}
