import { Text } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { formatDateTime } from '@/utils'
import { BlockContainer } from '../shared'

const Details = ({ data }: { data: Appointment[] }) => {
  return (
    <BlockContainer heading="Follow Up in weeks">
      {data.map((row) => (
        <Text size="1" key={row.appointmentDate}>
          {formatDateTime(row.appointmentDate, false)} | {row.providerName} |{' '}
          {row.locationName} | {row.visitType}
        </Text>
      ))}
    </BlockContainer>
  )
}

export { Details }
