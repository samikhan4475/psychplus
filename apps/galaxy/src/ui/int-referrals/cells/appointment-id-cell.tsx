'use client'

import { useRouter } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { useStore as useRootStore } from '@/store'
import { PatientReferral } from '@/types'
import {
  capitalizeName,
  constructQuickNotesUrl,
  getPatientFullName,
  getPatientMRN,
} from '@/utils'

interface Props extends PropsWithRow<PatientReferral> {
  disabled?: boolean
}

const AppointmentIdCell = ({ row: { original: referral } }: Props) => {
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)

  const navigateToChart = () => {
    if (
      referral.appointmentId &&
      referral.appointment.visitSequence &&
      referral.appointment.patientId
    ) {
      const patientName = getPatientFullName(referral.patientName)
      const href = constructQuickNotesUrl(
        referral.appointment.patientId,
        parseInt(referral.appointmentId),
        referral.appointment.visitTypeCode,
        referral.appointment.visitSequence,
      )

      addTab({
        href,
        label: `${capitalizeName(patientName)}-${getPatientMRN(
          referral.patientId,
        )}-${referral.appointmentId}`,
      })
      router.push(href)
    }
  }

  return (
    <Text onClick={navigateToChart} className="cursor-pointer">
      {referral.appointmentId}
    </Text>
  )
}

export { AppointmentIdCell }
