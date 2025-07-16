'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { ContactMadeStatuses } from '@/types'
import { sortCodesetBySortAttribute } from '@/ui/patient-lookup/utils'
import { updateExternalReferralAction } from '../actions'
import { Patient } from '../types'

const ContactMadeSelectCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  const [selectedValue, setSelectedValue] = useState(
    patient?.contactStatus ?? '',
  )
  const codes = useCodesetCodes(CODESETS.ContactMadeStatus)
  const updateContactMadeStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updateExternalReferralAction(patient.id, {
      ...patient,
      contactStatus: value,
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setSelectedValue(patient?.contactStatus ?? '')
      toast.error(result.error ?? 'Failed to update!')
    }
  }
  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      onClick={(e) => e.stopPropagation()}
    >
      <SelectCell
        value={selectedValue}
        options={sortCodesetBySortAttribute(codes, { includeDisabled: true })}
        onValueChange={updateContactMadeStatus}
        disabled={[
          ContactMadeStatuses.Cancelled,
          ContactMadeStatuses.Scheduled,
        ].includes(selectedValue as ContactMadeStatuses)}
        className="border-pp-gray-2 h-4 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </Flex>
  )
}

export { ContactMadeSelectCell }
