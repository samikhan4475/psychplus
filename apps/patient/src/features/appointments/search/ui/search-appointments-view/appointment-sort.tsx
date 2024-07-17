import { AppointmentType } from '@psychplus-v2/constants'
import { Flex, Select } from '@radix-ui/themes'
import { AppointmentSortBy } from '@/features/appointments/search/constants'
import { useStore } from '@/features/appointments/search/store'

const AppointmentSort = () => {
  const { appointmentType, sortBy, setSortBy } = useStore((state) => ({
    appointmentType: state.appointmentType,
    sortBy: state.sortBy,
    setSortBy: state.setSortBy,
  }))

  return (
    <Flex direction="column" gap="1" className="flex-1">
      <Select.Root
        size={{ initial: '2' }}
        value={sortBy}
        onValueChange={setSortBy}
      >
        <Select.Trigger placeholder="Sort By" className="text-accent-12" />
        <Select.Content highContrast position="popper" align="end">
          {appointmentType === AppointmentType.InPerson ? (
            <Select.Item value={AppointmentSortBy.Nearest}>Nearest</Select.Item>
          ) : null}
          <Select.Item value={AppointmentSortBy.FirstAvailable}>
            First Available
          </Select.Item>
          <Select.Item value={AppointmentSortBy.Rating}>Rating</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { AppointmentSort }
