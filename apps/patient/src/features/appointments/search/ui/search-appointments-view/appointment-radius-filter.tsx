import {
  AppointmentType,
  DISTANCE_IN_MILES_OPTIONS,
} from '@psychplus-v2/constants'
import { Flex, Select } from '@radix-ui/themes'
import { useStore } from '@/features/appointments/search/store'

const AppointmentRadiusFilter = () => {
  const { appointmentType, setMaxDistanceInMiles, maxDistanceInMiles } =
    useStore((state) => ({
      appointmentType: state.appointmentType,
      maxDistanceInMiles: state.maxDistanceInMiles,
      setMaxDistanceInMiles: state.setMaxDistanceInMiles,
    }))

  const triggerProps = {
    placeholder: 'Radius',
  }

  if (appointmentType !== AppointmentType.InPerson) return null

  return (
    <Flex direction="column" gap="1" className="flex-1">
      <Select.Root
        size={{ initial: '2' }}
        value={maxDistanceInMiles}
        onValueChange={setMaxDistanceInMiles}
      >
        <Select.Trigger {...triggerProps} className="text-accent-12" />
        <Select.Content highContrast position="popper" align="end">
          {DISTANCE_IN_MILES_OPTIONS.map((distance) => (
            <Select.Item key={distance} value={distance.toString()}>
              {distance} miles
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { AppointmentRadiusFilter }
