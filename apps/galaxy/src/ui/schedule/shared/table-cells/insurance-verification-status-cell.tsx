import { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { useUpdateVisitInsuranceVerificationStatus } from '@/ui/visit/hooks/use-update-visit-insurance-verfication-status'
import { useInactiveRowStatus, useRefetchAppointments } from '../../hooks'

const successMessage = 'Insurance verification status updated successfully'

const InsuranceVerificationStatusCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const [verificationStatus, setVerificationStatus] = useState<string>(
    appointment.insuranceVerification,
  )
  const { loading, updateVisitInsuranceVerificationStatus } =
    useUpdateVisitInsuranceVerificationStatus()
  const codes = useCodesetCodes(CODESETS.BillingVerificationStatus)
  const isInactiveVisit = useInactiveRowStatus(
    appointment.visitStatus,
    appointment.isServiceTimeDependent,
  )

  const options = useMemo(
    () =>
      codes
        .toSorted((a, b) => {
          const aValue =
            a.attributes?.find((attr) => attr.name === 'SortValue')?.value ?? 0
          const bValue =
            b.attributes?.find((attr) => attr.name === 'SortValue')?.value ?? 0
          return +aValue - +bValue
        })
        .map((item) => ({
          label: item.display,
          value: item.value,
        })),
    [codes],
  )
  const refetch = useRefetchAppointments()

  const onChange = async (val: string) => {
    setVerificationStatus(val)
    updateVisitInsuranceVerificationStatus({
      appointmentId: appointment.appointmentId,
      newStatus: val,
      successMessage,
      onSuccess: () => refetch(),
      onError: () => setVerificationStatus(appointment.insuranceVerification),
    })
  }

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      onClick={(e) => e.stopPropagation()}
    >
      <SelectCell
        options={options}
        disabled={isInactiveVisit}
        value={verificationStatus}
        onValueChange={onChange}
        loading={loading}
      />
    </Flex>
  )
}

export { InsuranceVerificationStatusCell }
