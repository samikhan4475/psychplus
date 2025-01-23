'use client'

import { Button, Flex } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { EditVisit } from '@/ui/visit/edit-visit'
import { Patient } from '../types'

const VisitHistoryCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  if (!patient?.mostRecentAppointmentId) {
    return <TextCell>{patient?.mostRecentAppointmentDate}</TextCell>
  }
  return (
    <Flex onClick={(e) => e.stopPropagation()} width="100%">
      <EditVisit
        appointmentId={patient?.mostRecentAppointmentId}
        isFormDisabled
      >
        <Button
          className="dialog-trigger-cell !m-0 w-[-webkit-fill-available] justify-start truncate px-1 py-0.5"
          type="button"
          radius="none"
          variant="ghost"
          color="gray"
          size="1"
          onClick={(e) => e.stopPropagation()}
          highContrast
        >
          {patient?.mostRecentAppointmentDate}
        </Button>
      </EditVisit>
    </Flex>
  )
}

export { VisitHistoryCell }
