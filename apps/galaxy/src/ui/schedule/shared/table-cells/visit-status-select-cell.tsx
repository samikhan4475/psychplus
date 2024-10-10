import { useState } from 'react'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { Appointment } from '@/types'
import { useStore as globalStore } from '@/store'

const VISIT_STATUS_PERMISSION =
  'You do not have permission to change the visit status to this. Please contact your supersvisor if you need any further assistance.'


const VisitStatusSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const [visitStatus, setVisitStatus] = useState<string>(
    appointment.visitStatus,
  )
  const user = globalStore(state => state.user)
  const userId = user.id

  const hasPermissionToChangeStatus = (status: string) => {
    if (status === 'CheckedIn' && userId !== appointment.providerId) {
      return false
    } else if (status === 'CheckedOut' && !appointment.isNoteSigned) {
      return false
    } else if (status === 'ConfirmedS') {
      return false
    } else if (status === 'CancelledS' && userId !== appointment.providerId) {
      return false
    }
    else return true
  }

  return (
    <CodesetSelectCell
      codeset={CODESETS.AppointmentStatus}
      value={visitStatus}
      onValueChange={(val) => {
        if (hasPermissionToChangeStatus(val)) setVisitStatus(val)
        else alert(VISIT_STATUS_PERMISSION)
      }}
    />
  )
}

export { VisitStatusSelectCell }
