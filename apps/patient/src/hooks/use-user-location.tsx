'use client'

import { useEffect, useState } from 'react'

interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

interface GeocodeResult {
  address_components: AddressComponent[]
}

interface GeocodeResponse {
  results: GeocodeResult[]
}

function useUserLocation(apiKey: string): {
  zip?: string
  state?: string
  loading: boolean
} {
  const [zip, setZip] = useState<string>()
  const [state, setState] = useState<string>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
          )
          const data = (await res.json()) as GeocodeResponse

          const components = data?.results?.[0]?.address_components

          const zipComp = components.find((c) =>
            c.types.includes('postal_code'),
          )
          if (zipComp) setZip(zipComp.short_name)

          const stateComp = components.find((c) =>
            c.types.includes('administrative_area_level_1'),
          )
          if (stateComp) setState(stateComp.short_name)
        } catch (err) {
          console.error('Error during geocoding:', err)
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            console.error(
              'Location permission is required to show nearby locations.',
            )
            break
          case err.POSITION_UNAVAILABLE:
            console.error('Unable to determine your location.')
            break
          case err.TIMEOUT:
            console.error('The request to get your location timed out.')
            break
        }
        setLoading(false)
      },
      { timeout: 10_000 },
    )
  }, [apiKey])

  return { zip, state, loading }
}

export { useUserLocation }
