'use client'

import { Button, Flex, Popover } from '@radix-ui/themes'
import { History } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { IntReferralsHistoryTable } from '../in-referrals-history-table'

const CollapseCell = ({
  row: {
    original: { id: referralId },
  },
}: PropsWithRow<PatientReferral>) => {
  return (
    <Flex justify="start">
      <Popover.Root modal>
        <Popover.Trigger>
          <Button
            className="text-black w-full !outline-none"
            type="button"
            variant="ghost"
            color="gray"
            size="1"
          >
            <History size={16} />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          className="min-h-28 -mb-2 -mt-2 flex min-w-[calc(100vw-20px)] items-center rounded-1 !p-0"
          align="start"
        >
          <IntReferralsHistoryTable referralId={referralId?.toString()} />
        </Popover.Content>
      </Popover.Root>
    </Flex>
  )
}

export { CollapseCell }
