import { Box, Tooltip } from '@radix-ui/themes'
import GoogleMapReact from 'google-map-react'
import { MapPinIcon } from 'lucide-react'
import { cn } from '@psychplus/ui/cn'
import { useSortedFilteredData } from '../../store/hooks'
import { AppointmentClinic } from '../../types'
import { getAllAvailabilityClinics } from '../../utils'

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
  const data = useSortedFilteredData()
  const allClinics = getAllAvailabilityClinics(data)

  return (
    <Box className={cn('bg-white', height, width)}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapKey }}
        defaultCenter={DefaultMapProps.center}
        defaultZoom={DefaultMapProps.zoom}
      >
        {allClinics.map((clinic: AppointmentClinic) => (
          <Tooltip key={clinic.id} content={clinic.name}>
            <MapPinIcon
              width={0}
              height={0}
              //@ts-ignore
              lat={clinic.contact.addresses?.[0].geoCoordinates?.latitude}
              lng={clinic.contact.addresses?.[0].geoCoordinates?.latitude}
            />
          </Tooltip>
        ))}
      </GoogleMapReact>
    </Box>
  )
}

export { ClinicsMapView }
