import { Switch, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/types'

const EmergencyContactCell = ({ row }: PropsWithRow<Relationship>) => {
  return (
    <>
      <Switch
        checked={row.original.isEmergencyContact}
        color="green"
        size={'1'}
      />
      <Text size="2">{row.original.isEmergencyContact ? 'Yes' : 'No'}</Text>
    </>
  )
}

export { EmergencyContactCell }
