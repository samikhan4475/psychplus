import { IconButton, Switch, Text } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/types'

const RriCell = ({ row }: PropsWithRow<Relationship>) => {
  return (
    <>
      <IconButton type="button" variant="ghost" className="mx-1">
        <HistoryIcon color="black" width={15} height={15} strokeWidth={1.75} />
      </IconButton>
      <Switch
        checked={row.original.isAllowedToReleaseInformation}
        color="green"
        size={'1'}
      />
      <Text size="2">
        {row.original.isAllowedToReleaseInformation ? 'Yes' : 'No'}
      </Text>
    </>
  )
}

export { RriCell }
