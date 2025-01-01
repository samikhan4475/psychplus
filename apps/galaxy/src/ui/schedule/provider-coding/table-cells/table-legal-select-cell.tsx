import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { CHANGE_LEGAL_STATUS } from '../../constants'
import { useSchedulerPermissions } from '../../hooks'
import { PermissionAlert } from '../../shared'
import { updateVisit } from '../../utils'
import { MergedRecord } from '../types'
import { transformIn } from '../util'
import { useRefetchAppointments } from '../hooks'

const LegalSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<MergedRecord>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [legalStatus, setLegalStatus] = useState<string>(
    appointment.legalStatus,
  )
  const refetch = useRefetchAppointments()
  const { hasPermissionToChangeLegalStatus } = useSchedulerPermissions()

  const onChange = async (val: string) => {
    if (hasPermissionToChangeLegalStatus) {
      setLegalStatus(val)
      const transformedBody = transformIn(appointment)
      transformedBody.admissionLegalStatus = val
      updateVisit(transformedBody, refetch)
    } else setIsOpen(true)
  }

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      onClick={(e) => e.stopPropagation()}
    >
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={CHANGE_LEGAL_STATUS}
      />
      <CodesetSelectCell
        codeset={CODESETS.LegalStatus}
        value={legalStatus}
        onValueChange={onChange}
      />
    </Flex>
  )
}

export { LegalSelectCell }
