'use client'

import { Button, Flex, Popover } from '@radix-ui/themes'
import { History } from 'lucide-react'
import { PatientReferral, SelectOptionType } from '@/types'
import { IntReferralsHistoryContactStatusCellTable } from './in-referrals-history-contact-status-cell-table'
import { IntReferralsHistoryEducationCellTable } from './in-referrals-history-education-cell-table'
import { IntReferralsHistoryVisitTypeCellTable } from './in-referrals-history-visit-type-cell-table'

interface Props {
  referral: PatientReferral
  cellName: string
  visitTypes?: SelectOptionType[]
}

const HxCellButton = ({ referral, cellName, visitTypes }: Props) => {
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
          className="min-h-28 -mb-2 -mt-2 flex min-w-[500px] items-center rounded-1 !p-0"
          align="start"
        >
          {cellName === 'education' && (
            <IntReferralsHistoryEducationCellTable
              referralId={referral?.id?.toString()}
            />
          )}
          {cellName === 'visitType' && (
            <IntReferralsHistoryVisitTypeCellTable
              referralId={referral?.id?.toString()}
              visitTypes={visitTypes}
            />
          )}
          {cellName === 'contactStatus' && (
            <IntReferralsHistoryContactStatusCellTable
              referralId={referral?.id?.toString()}
            />
          )}
        </Popover.Content>
      </Popover.Root>
    </Flex>
  )
}

export { HxCellButton }
