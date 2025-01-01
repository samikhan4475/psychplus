import { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { StatusCode } from '../../constants'
import {
  useConfirmVisitUpdate,
  useInactiveRowStatus,
  useRefetchAppointments,
} from '../../hooks'
import { transformIn, updateVisit } from '../../utils'
import { UpdateVisitAlert } from '../update-visit-alert'

const InsuranceVerificationStatusCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const [verificationStatus, setVerificationStatus] = useState<string>(
    appointment.insuranceVerification,
  )
  const codes = useCodesetCodes(CODESETS.BillingVerificationStatus)

  const isInactiveVisit = useInactiveRowStatus(
    appointment.visitStatus,
    appointment.isServiceTimeDependent,
  )
  const { alertState, onUpdateVisitConfirm, onUpdateVisitError } =
    useConfirmVisitUpdate()
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
  const confirmVisitUpdate = (isConfirmed: boolean, status?: number) => {
    const isOverride = status === StatusCode.OverridePermission
    const transformedBody = {
      ...transformIn(appointment),
      isOverridePermissionProvided: isOverride,
      isProceedPermissionProvided: !isOverride,
      insuranceVerificationStatusCode: verificationStatus,
    }

    onUpdateVisitConfirm({
      isConfirmed,
      body: transformedBody,
      resetValue: () =>
        setVerificationStatus(appointment.insuranceVerification),
      status,
    })
  }

  const onChange = async (val: string) => {
    setVerificationStatus(val)
    const transformedBody = transformIn(appointment)
    transformedBody.insuranceVerificationStatusCode = val
    updateVisit(transformedBody, refetch, onUpdateVisitError)
  }

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      onClick={(e) => e.stopPropagation()}
    >
      <UpdateVisitAlert state={alertState} onConfirm={confirmVisitUpdate} />
      <SelectCell
        options={options}
        disabled={isInactiveVisit}
        value={verificationStatus}
        onValueChange={onChange}
      />
    </Flex>
  )
}

export { InsuranceVerificationStatusCell }
