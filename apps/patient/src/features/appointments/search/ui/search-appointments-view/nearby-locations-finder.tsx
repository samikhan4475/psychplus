import { useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { NavigationIcon } from 'lucide-react'
import { useStore } from '../../store'

const NearbyLocationsFinder = () => {
  const [geoPosition, setGeoPosition] = useState<GeolocationPosition>()

  const { setLocation, setLoading } = useStore((state) => ({
    setLocation: state.setLocation,
    setLoading: state.setLoading,
  }))

  const geoLocate = () => {
    if (geoPosition) {
      setLocation({
        latitude: geoPosition.coords.latitude,
        longitude: geoPosition.coords.longitude,
      })

      return
    }

    if (navigator.geolocation) {
      setLoading(true)

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoPosition(position)

          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('Location permission is required to show nearby locations.')
              break
            case error.POSITION_UNAVAILABLE:
              alert('Unable to determine your location.')
              break
            case error.TIMEOUT:
              alert('The request to get your location timed out.')
              break
          }

          setLoading(false)
        },
      )
    } else {
      alert('Sorry, location features are not supported by your browser.')
    }
  }

  return (
    <Flex
      align="center"
      gap="1"
      className="group cursor-pointer"
      onClick={geoLocate}
    >
      <NavigationIcon width={15} height={15} strokeWidth={1.5} />
      <Text className="text-[13px] group-hover:underline">
        Find locations near me
      </Text>
    </Flex>
  )
}

export { NearbyLocationsFinder }
