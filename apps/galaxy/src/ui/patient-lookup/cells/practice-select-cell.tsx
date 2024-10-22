'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { updatePatientProfileAction } from '@/actions'
import { PropsWithRow, SelectCell } from '@/components'
import { SelectOptionType } from '@/types'
import { Patient } from '../types'

interface PracticeSelectCellProps extends PropsWithRow<Patient> {
  practiceOptions: SelectOptionType[]
}
const PracticeSelectCell = ({
  row: { original: patient },
  practiceOptions,
}: PracticeSelectCellProps) => {
  const [selectedValue, setSelectedValue] = useState(patient?.contactMadeStatus)

  const updatePractice = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientProfileAction(patient.id, {
      ...patient,
      practice: value,
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
      <SelectCell
        options={practiceOptions}
        value={selectedValue}
        onValueChange={updatePractice}
        className="border-pp-gray-2 h-4 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </Flex>
  )
}

export { PracticeSelectCell }
