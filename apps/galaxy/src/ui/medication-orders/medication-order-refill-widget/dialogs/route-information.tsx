'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldLabel,
  NumberInput,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { UpdateMedicationSchema } from './schema'

interface RouteInformationProps {
  index: number
}
const options = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
const RouteInformation = ({ index }: RouteInformationProps) => {
  const form = useFormContext<UpdateMedicationSchema>()

  const isSubstitutionsAllowed = !form.getValues(
    `drugList.${index}.isSubstitutionsAllowed`,
  )
  const handleValueChange = (value: string) => {
    form.setValue(`drugList.${index}.isSubstitutionsAllowed`, value !== 'yes')
  }
  return (
    <Flex gap="2">
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Route</FormFieldLabel>
        <CodesetSelect
          name={`drugList.${index}.doseRouteCode`}
          codeset={CODESETS.PrescriptionRouteList}
          className="h-6 w-full"
          size="1"
        />
      </FormFieldContainer>

      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Frequency</FormFieldLabel>
        <CodesetSelect
          placeholder="Select"
          name={`drugList.${index}.doseFrequencyCode`}
          codeset={CODESETS.PrescriptionFrequencyList}
          size="1"
          className="w-full"
        />
      </FormFieldContainer>
      <FormFieldContainer className="flex-1">
        <FormFieldLabel required>Substitution</FormFieldLabel>
        <SelectInput
          options={options}
          value={isSubstitutionsAllowed ? 'yes' : 'no'}
          buttonClassName="w-full h-6"
          onValueChange={handleValueChange}
        />
      </FormFieldContainer>
    </Flex>
  )
}

export { RouteInformation }
