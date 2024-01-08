'use client'

import { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Flex } from '@radix-ui/themes'
import { NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN } from '@psychplus/utils/constants'
import { psychPlusBlueColor } from '@/components'
import { MapboxComponentProps } from '../../types'

const MapboxComponent: React.FC<MapboxComponentProps> = ({
  width,
  height,
  zoom,
  locations,
}) => {
  useEffect(() => {
    mapboxgl.accessToken = NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? ''
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.9903106, 40.7331154],
      zoom,
    })

    map.on('load', () => {
      locations.forEach((location) => {
        const { geoCoordinates } = location
        const { latitude, longitude } = geoCoordinates

        new mapboxgl.Marker({ color: psychPlusBlueColor })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`))
          .addTo(map)
      })
    })

    return () => {
      map.remove()
    }
  }, [locations, zoom])

  return <Flex id="map" style={{ width, height }} />
}

export { MapboxComponent }
