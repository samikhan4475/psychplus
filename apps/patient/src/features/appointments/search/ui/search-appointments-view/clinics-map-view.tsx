import { Box } from '@radix-ui/themes'
import GoogleMapReact from 'google-map-react'
import { cn } from '@psychplus/ui/cn'

interface ClinicsMapViewProps {
  mapKey: string
  width?: string
  height?: string
}

const DefaultMapProps = {
  center: {
    lat: 29.9811013,
    lng: -95.5675483,
  },
  zoom: 11,
}

const ClinicsMapView = ({
  mapKey,
  width = 'w-1/5',
  height = 'h-[900px]',
}: ClinicsMapViewProps) => {
  return (
    <Box className={cn('bg-white', height, width)}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapKey }}
        defaultCenter={DefaultMapProps.center}
        defaultZoom={DefaultMapProps.zoom}
      ></GoogleMapReact>
    </Box>
  )
}

export { ClinicsMapView }
