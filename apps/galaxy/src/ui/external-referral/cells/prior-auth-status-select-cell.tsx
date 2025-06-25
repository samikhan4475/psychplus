'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow, SelectCell } from '@/components'
import { updateExternalReferralAction } from '../actions'
import { PRIOR_AUTH_STATUS_OPTIONS } from '../constants'
import { Patient } from '../types'

const PriorAuthStatusSelectCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  const [selectedValue, setSelectedValue] = useState(patient?.authStatus ?? '')
  const updatePriorAuthStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updateExternalReferralAction(patient.id, {
      authStatus: value,
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setSelectedValue(patient?.authStatus ?? '')
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
        options={PRIOR_AUTH_STATUS_OPTIONS}
        onValueChange={updatePriorAuthStatus}
        className="border-pp-gray-2 h-4 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </Flex>
  )
}

export { PriorAuthStatusSelectCell }
