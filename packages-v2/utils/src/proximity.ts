import { GeoCoordinates } from '@psychplus-v2/types'

async function getCoordinatesByPostalCode(
  postalCode: string,
  apiKey: string,
): Promise<GeoCoordinates | null> {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      postalCode,
    )}&key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()
    if (data.status === 'OK' && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location
      return {
        latitude: lat,
        longitude: lng,
      }
    }

    return null
  } catch {
    return null
  }
}

const toRadians = (deg: number): number => deg * (Math.PI / 180)

const getDistanceInMiles = (
  coord1: GeoCoordinates,
  coord2: GeoCoordinates,
): number => {
  const R = 3958.8 // Earth's radius in miles

  const dLat = toRadians(coord2.latitude - coord1.latitude)
  const dLon = toRadians(coord2.longitude - coord1.longitude)

  const lat1 = toRadians(coord1.latitude)
  const lat2 = toRadians(coord2.latitude)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return Number(distance.toFixed(2))
}

export { getCoordinatesByPostalCode, getDistanceInMiles }
