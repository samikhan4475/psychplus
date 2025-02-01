import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { Appointment } from '@/types'
import { CHANGE_LEGAL_STATUS, StatusCode } from '../../constants'
import {
  useConfirmVisitUpdate,
  useInactiveRowStatus,
  useRefetchAppointments,
  useSchedulerPermissions,
} from '../../hooks'
import { transformIn, updateVisit } from '../../utils'
import { PermissionAlert } from '../permission-alert'
import { UpdateVisitAlert } from '../update-visit-alert'

const LegalSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const [legalStatus, setLegalStatus] = useState<string>(
    appointment.legalStatus,
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const refetch = useRefetchAppointments()
  const { alertState, onUpdateVisitConfirm, onUpdateVisitError } =
    useConfirmVisitUpdate()
  const { hasPermissionToChangeLegalStatus } = useSchedulerPermissions()
  const isInactiveVisit = useInactiveRowStatus(
    appointment.visitStatus,
    appointment.isServiceTimeDependent,
  )

  const confirmVisitUpdate = (isConfirmed: boolean, status?: number) => {
    const isOverride = status === StatusCode.OverridePermission
    const transformedBody = {
      ...transformIn(appointment),
      isOverridePermissionProvided: isOverride,
      isProceedPermissionProvided: !isOverride,
      admissionLegalStatus: legalStatus,
    }

    onUpdateVisitConfirm({
      isConfirmed,
      body: transformedBody,
      resetValue: () => setLegalStatus(appointment.legalStatus),
      status,
    })
  }

  const onChange = async (val: string) => {
    if (hasPermissionToChangeLegalStatus) {
      setLegalStatus(val)
      const transformedBody = transformIn(appointment)
      transformedBody.admissionLegalStatus = val
      updateVisit({
        body: transformedBody,
        onSuccess: refetch,
        onError: onUpdateVisitError,
      })
    } else setIsOpen(true)
  }

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      onClick={(e) => e.stopPropagation()}
    >
      <UpdateVisitAlert state={alertState} onConfirm={confirmVisitUpdate} />
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={CHANGE_LEGAL_STATUS}
      />
      <CodesetSelectCell
        codeset={CODESETS.LegalStatus}
        disabled={appointment.isServiceTimeDependent || isInactiveVisit}
        value={legalStatus}
        exclude={[CODE_NOT_SET]}
        onValueChange={onChange}
      />
    </Flex>
  )
}

export { LegalSelectCell }
