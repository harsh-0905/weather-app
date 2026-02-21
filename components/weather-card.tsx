"use client"

import { Droplets, Wind, Thermometer, ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export interface WeatherData {
  city: string
  country: string
  temperature: number
  feelsLike: number
  tempMin: number
  tempMax: number
  humidity: number
  windSpeed: number
  condition: string
  description: string
  icon: string
}

interface WeatherCardProps {
  data: WeatherData
}

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card className="w-full max-w-md overflow-hidden border-border/50 shadow-lg">
      <CardContent className="p-0">
        {/* Main temperature section */}
        <div className="flex flex-col items-center gap-1 px-6 pt-8 pb-6">
          <div className="flex items-center gap-1">
            <h2 className="text-2xl font-semibold tracking-tight text-card-foreground">
              {data.city}
            </h2>
            <span className="text-sm font-medium text-muted-foreground mt-0.5">
              {data.country}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
              alt={data.description}
              width={80}
              height={80}
              className="drop-shadow-md"
            />
            <span className="text-6xl font-light tracking-tighter text-card-foreground">
              {data.temperature}&#176;
            </span>
          </div>

          <p className="text-base font-medium capitalize text-card-foreground/80">
            {data.description}
          </p>

          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3.5 w-3.5" />
              {data.tempMax}&#176;
            </span>
            <span className="flex items-center gap-1">
              <ArrowDown className="h-3.5 w-3.5" />
              {data.tempMin}&#176;
            </span>
          </div>
        </div>

        {/* Detail stats */}
        <div className="grid grid-cols-3 divide-x divide-border border-t border-border bg-secondary/50">
          <div className="flex flex-col items-center gap-1.5 py-5">
            <Thermometer className="h-5 w-5 text-primary" />
            <span className="text-xs text-muted-foreground">Feels Like</span>
            <span className="text-sm font-semibold text-card-foreground">
              {data.feelsLike}&#176;C
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 py-5">
            <Droplets className="h-5 w-5 text-accent" />
            <span className="text-xs text-muted-foreground">Humidity</span>
            <span className="text-sm font-semibold text-card-foreground">
              {data.humidity}%
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 py-5">
            <Wind className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Wind</span>
            <span className="text-sm font-semibold text-card-foreground">
              {data.windSpeed} km/h
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
