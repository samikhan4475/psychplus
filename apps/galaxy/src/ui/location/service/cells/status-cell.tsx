'use client'

import { Flex } from '@radix-ui/themes'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { StatusHistoryButton } from '../status-history-button'
import { LocationService } from '../types'

const StatusCell = ({ row: { original } }: PropsWithRow<LocationService>) => {
  return (
    <Flex gap="1" align="center">
      <StatusHistoryButton />
      <CodesetSelectCell
        value={original?.status}
        codeset={CODESETS.RecordStatus}
        exclude={['Deleted', 'Archived']}
        className="w-[100px]"
      />
    </Flex>
  )
}

export { StatusCell }
