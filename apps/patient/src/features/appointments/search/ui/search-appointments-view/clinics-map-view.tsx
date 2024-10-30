import { Box, Tooltip } from '@radix-ui/themes'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { cn } from '@psychplus/ui/cn'
import { useSortedFilteredData } from '../../store/hooks'
import { AppointmentAvailability } from '../../types'

interface ClinicsMapViewProps {
  mapKey: string
  width?: string
  height?: string
  hide?: boolean
}

interface MapClinic {
  id: string
  name: string
  lat: number
  lng: number
}

const DefaultMapProps = {
  center: {
    lat: 29.9811013,
    lng: -95.5675483,
  },
  zoom: 11,
}

const getAllAvailabilityClinics = (
  data: AppointmentAvailability[],
): MapClinic[] => {
  const allClinics: MapClinic[] = []
  const seenClinics = new Set<string>()

  for (const availability of data) {
    for (const clinic of availability.clinics) {
      const key = `${clinic.id}`

      const coords = clinic.contact?.addresses?.[0].geoCoordinates

      if (!coords) {
        continue
      }
      if (seenClinics.has(key)) {
        continue
      }

      seenClinics.add(key)
      allClinics.push({
        id: clinic.id,
        name: clinic.name,
        lat: coords.latitude,
        lng: coords.longitude,
      })
    }
  }

  return allClinics
}

const ClinicsMapView = ({
  mapKey,
  width = 'w-1/5',
  hide = false,
  height = 'h-[900px]',
}: ClinicsMapViewProps) => {
  const data = useSortedFilteredData()
  const allClinics = getAllAvailabilityClinics(data)

  if (hide) {
    return <Box className={cn('bg-white', height, width)} />
  }

  return (
    <Box className={cn('bg-white', height, width)}>
      <APIProvider apiKey={mapKey}>
        <Map
          defaultCenter={DefaultMapProps.center}
          defaultZoom={DefaultMapProps.zoom}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {allClinics.map((clinic) => (
            <Tooltip key={clinic.id} content={clinic.name}>
              <Marker
                position={{
                  lat: clinic.lat,
                  lng: clinic.lng,
                }}
                title={clinic.name}
              />
            </Tooltip>
          ))}
        </Map>
      </APIProvider>
    </Box>
  )
}

export { ClinicsMapView }
