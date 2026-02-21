import { Loader2 } from "lucide-react"

export function Loader() {
  return (
    <div className="flex flex-col items-center gap-3 py-16" role="status">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Fetching weather data...</p>
      <span className="sr-only">Loading</span>
    </div>
  )
}
