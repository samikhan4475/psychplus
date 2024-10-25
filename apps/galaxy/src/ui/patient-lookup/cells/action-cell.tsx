'use client'

import { Button, Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { AddVisit } from '@/ui/visit/add-visit'
import { transformOutPatientRow } from '../transform'
import { Patient } from '../types'

const ActionCell = ({ row: { original: patient } }: PropsWithRow<Patient>) => {
  return (
    <Flex onClick={(e) => e.stopPropagation()}>
      <AddVisit showAddUser={false} patient={transformOutPatientRow(patient)}>
        <Button
          highContrast
          size="1"
          className="h-full min-h-0 w-full min-w-0"
          onClick={(e) => e.stopPropagation()}
        >
          Book
        </Button>
      </AddVisit>
    </Flex>
  )
}

export { ActionCell }
