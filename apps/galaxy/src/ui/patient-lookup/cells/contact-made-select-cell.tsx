'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { updatePatientAction } from '../actions'
import { Patient } from '../types'

const ContactMadeSelectCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  const [selectedValue, setSelectedValue] = useState(patient?.contactMadeStatus)

  const updateContactMadeStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientAction(patient.id, {
      contactMadeStatus: value,
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setSelectedValue(patient?.contactMadeStatus ?? '')
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
      <CodesetSelectCell
        value={selectedValue}
        codeset={CODESETS.ContactMadeStatus}
        onValueChange={updateContactMadeStatus}
        className="border-pp-gray-2 h-4 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </Flex>
  )
}

export { ContactMadeSelectCell }
