'use client'

import { Box, Button, Flex, Popover } from '@radix-ui/themes'
import { History } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { ReferralsHistoryTable } from '../referrals-history-table'

const CollapseCell = ({
  row: {
    toggleSelected,
    getIsSelected,
    original: { id: referralId },
  },
}: PropsWithRow<PatientReferral>) => {
  return (
    <Flex justify="start">
      <Button
        className="text-black w-full !outline-none"
        type="button"
        variant="ghost"
        color="gray"
        size="1"
        onClick={() => toggleSelected()}
      >
        <History size={16} />
      </Button>
      <Flex
        justify="center"
        align="center"
        width="100%"
        height="100%"
        position="absolute"
        inset="0"
        className="-z-10"
      >
        <Popover.Root
          onOpenChange={toggleSelected}
          modal
          open={getIsSelected()}
        >
          <Popover.Trigger>
            <Box className="h-full w-full" />
          </Popover.Trigger>
          <Popover.Content
            className="min-h-28 -mb-2 -mt-2 flex items-center rounded-1 !p-0"
            align="start"
          >
            <ReferralsHistoryTable referralId={referralId?.toString()} />
          </Popover.Content>
        </Popover.Root>
      </Flex>
    </Flex>
  )
}

export { CollapseCell }
