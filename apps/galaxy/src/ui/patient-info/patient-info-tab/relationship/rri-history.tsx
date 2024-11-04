'use client'

import { Heading, IconButton, Popover } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { ReleaseInformationHistory } from '@/types'
import { RRITable } from './rri-table'

interface RRIHistoryProps {
  data: ReleaseInformationHistory[]
}
const RRIHistory = ({ data }: RRIHistoryProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton type="button" color="gray" variant="ghost" className="!m-0">
          <HistoryIcon
            color="black"
            width={15}
            height={15}
            strokeWidth={1.75}
          />
        </IconButton>
      </Popover.Trigger>

      <Popover.Content className="w-72 px-0 py-2">
        <Heading size="2" weight="medium" className="px-2">
          RRI
        </Heading>
        <RRITable data={data ?? []} />
      </Popover.Content>
    </Popover.Root>
  )
}

export { RRIHistory }
