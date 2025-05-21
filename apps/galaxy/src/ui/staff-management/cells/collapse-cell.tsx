'use client'

import { Button, Flex } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { StaffHistoryDialog } from '../dialogs'
import { Staff } from '../types'

const CollapseCell = ({ row: { original } }: PropsWithRow<Staff>) => {
  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      onClick={(e) => e.stopPropagation()}
    >
      <StaffHistoryDialog staffId={original.id}>
        <Button
          className="text-black !outline-none"
          type="button"
          variant="ghost"
          color="gray"
          size="1"
        >
          <HistoryIcon size="14" />
        </Button>
      </StaffHistoryDialog>
    </Flex>
  )
}

export { CollapseCell }
