import { Switch, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/types'

const GuardianCell = ({ row }: PropsWithRow<Relationship>) => {
  return (
    <>
      <Switch checked={row.original.isGuardian} color="green" size={'1'} />
      <Text size="2">{row.original.isGuardian ? 'Yes' : 'No'}</Text>
    </>
  )
}

export { GuardianCell }
