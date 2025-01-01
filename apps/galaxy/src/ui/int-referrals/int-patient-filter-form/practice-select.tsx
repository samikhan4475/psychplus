'use client'

import { useEffect, useState } from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getPracticesOptionsAction } from '@/ui/patient-lookup/actions'

const PracticeSelect = () => {

  const [practicesOptions, setPracticesOptions] = useState<SelectOptionType[]>(
    [],
  )
  useEffect(() => {
    getPracticesOptionsAction().then((practiceResult) => {
      if (practiceResult.state === 'success') {
        setPracticesOptions(practiceResult.data)
      }
    })
  }, [])

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Practice</FormFieldLabel>
      <DropdownSelect field="practiceId" options={practicesOptions} />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
