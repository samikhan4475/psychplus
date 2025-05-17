'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import {
  getDrugUnitOptions,
  getSurescriptsCode,
} from '@/ui/medications/patient-medications-widget/utils'
import { UpdateMedicationSchema } from './schema'

interface DoseInformationProps {
  index: number
}

const DoseInformation = ({ index }: DoseInformationProps) => {
  const form = useFormContext<UpdateMedicationSchema>()
  const codes = useCodesetCodes(CODESETS.PrescriptionUnitList)
  const handleValueChange = (value: string) => {
    form.setValue(`drugList.${index}.quantityUnitOfMeasureCode`, value)
  }
  return (
    <Flex gap="2">
      <FormFieldContainer>
        <FormFieldLabel>Dose Strength</FormFieldLabel>
        <TextField.Root
          {...form.register(`drugList.${index}.doseStrength`)}
          className="h-6 w-[155px]"
          size="1"
        />
      </FormFieldContainer>

      <FormFieldContainer>
        <FormFieldLabel>Dose Unit</FormFieldLabel>
        <SelectInput
          field={`drugList.${index}.quantityUnitOfMeasureCode`}
          options={getDrugUnitOptions(codes)}
          onValueChange={handleValueChange}
          className=""
          buttonClassName="h-6 w-[155px]"
          size="1"
          value={form.getValues(`drugList.${index}.quantityUnitOfMeasureCode`)}
        />
      </FormFieldContainer>

      <FormFieldContainer>
        <FormFieldLabel>Drug Form</FormFieldLabel>
        <CodesetSelect
          className="h-6 w-[155px]"
          name={`drugList.${index}.doseFormCode`}
          codeset={CODESETS.PrescriptionDosageFormList}
          size="1"
        />
      </FormFieldContainer>
    </Flex>
  )
}

export { DoseInformation }
