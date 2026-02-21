import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city")

  if (!city) {
    return NextResponse.json(
      { error: "City parameter is required" },
      { status: 400 }
    )
  }

  const apiKey = process.env.OPENWEATHER_API_KEY
  console.log("[v0] API key present:", !!apiKey)

  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenWeather API key is not configured. Please add OPENWEATHER_API_KEY in the Vars section of the sidebar." },
      { status: 500 }
    )
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    console.log("[v0] Fetching from OpenWeather for city:", city)
    const res = await fetch(url, { cache: "no-store" })

    console.log("[v0] OpenWeather response status:", res.status)

    if (!res.ok) {
      let errorBody: { message?: string } = {}
      try {
        errorBody = await res.json()
      } catch {
        // ignore parse errors
      }
      console.log("[v0] OpenWeather error body:", errorBody)

      if (res.status === 401) {
        return NextResponse.json(
          {
            error:
              "Invalid or inactive API key. New OpenWeather API keys can take up to 2 hours to activate. Please verify your OPENWEATHER_API_KEY in the Vars section of the sidebar.",
          },
          { status: 401 }
        )
      }
      if (res.status === 404) {
        return NextResponse.json(
          { error: "City not found. Please check the spelling and try again." },
          { status: 404 }
        )
      }
      return NextResponse.json(
        {
          error:
            errorBody.message ||
            `OpenWeather API error (${res.status}). Please try again later.`,
        },
        { status: res.status }
      )
    }

    const data = await res.json()

    return NextResponse.json({
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    })
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}
