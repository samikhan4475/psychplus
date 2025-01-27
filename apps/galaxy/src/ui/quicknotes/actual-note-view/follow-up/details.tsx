import { Text } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { formatDateCell, formatTimeCell } from '@/ui/schedule/utils'
import { BlockContainer } from '../shared'

const Details = ({ data }: { data: Appointment[] }) => {
  return (
    <BlockContainer heading="Follow Up in weeks">
      {data.map((row) => (
        <Text size="1" key={row.appointmentDate}>
          {formatDateCell(row.appointmentDate, row.locationTimezoneId)}{' '}
          {formatTimeCell(row.appointmentDate, row.locationTimezoneId)} |{' '}
          {row.providerName} | {row.locationName} | {row.visitType}
        </Text>
      ))}
    </BlockContainer>
  )
}

export { Details }
