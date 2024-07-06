import { Box } from '@radix-ui/themes'
import GoogleMapReact from 'google-map-react'

interface ClinicsMapViewProps {
  mapKey: string
}

const DefaultMapProps = {
  center: {
    lat: 29.9811013,
    lng: -95.5675483,
  },
  zoom: 11,
}

const ClinicsMapView = ({ mapKey }: ClinicsMapViewProps) => {
  return (
    <Box className="bg-white h-[900px] w-1/5">
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapKey }}
        defaultCenter={DefaultMapProps.center}
        defaultZoom={DefaultMapProps.zoom}
      ></GoogleMapReact>
    </Box>
  )
}

export { ClinicsMapView }
