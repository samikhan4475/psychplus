'use client'

import { Button, Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { AddVisit } from '@/ui/visit/add-visit'
import { transformOutPatientRow } from '../transform'
import { Patient } from '../types'
import { LinkReferral } from './link-referral'

const ActionCell = ({ row }: PropsWithRow<Patient>) => {
  return (
    <Flex onClick={(e) => e.stopPropagation()} gap="1" className="w-full">
      <LinkReferral row={row} />
      <AddVisit
        showAddUser={false}
        patient={transformOutPatientRow(row.original)}
      >
        <Button
          size="1"
          variant="outline"
          disabled={!row.original.isLinked}
          className="text-black s h-full min-h-0 min-w-0 rounded-[4px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={(e) => e.stopPropagation()}
        >
          Book
        </Button>
      </AddVisit>
    </Flex>
  )
}

export { ActionCell }
