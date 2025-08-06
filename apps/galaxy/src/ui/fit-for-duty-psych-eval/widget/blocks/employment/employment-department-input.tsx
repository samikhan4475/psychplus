'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { BlockProps } from '../../types'
import { MonthInput } from './month-input'
import { YearInput } from './year-input'

const EmploymentDepartmentInput = ({ disabled = false }: BlockProps) => {
  return (
    <FormFieldContainer className="flex flex-row gap-2">
      <FormFieldLabel required>
        Patient has worked for the state department since?
      </FormFieldLabel>
      <Flex gap="2">
        <MonthInput disabled={disabled} />
        <YearInput disabled={disabled} />
      </Flex>
    </FormFieldContainer>
  )
}

export { EmploymentDepartmentInput }
