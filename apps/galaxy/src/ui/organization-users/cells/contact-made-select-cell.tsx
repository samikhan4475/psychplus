'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { updatePatientAction } from '@/ui/patient-lookup/actions'
import { sortCodesetBySortAttribute } from '@/ui/patient-lookup/utils'
import { Users } from '../types'

const ContactMadeSelectCell = ({
  row: { original: user },
}: PropsWithRow<Users>) => {
  const [selectedValue, setSelectedValue] = useState(user?.contactMadeStatus)
  const codes = useCodesetCodes(CODESETS.ContactMadeStatus)
  const updateContactMadeStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientAction(user.id, {
      contactMadeStatus: value,
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setSelectedValue(user?.contactMadeStatus ?? '')
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
        className="border-pp-gray-2 h-4 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </Flex>
  )
}

export { ContactMadeSelectCell }
