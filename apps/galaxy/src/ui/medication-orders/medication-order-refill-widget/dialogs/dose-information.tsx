'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumericInput,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useDeepCompareMemo } from '@/hooks/use-deep-compare-memo'
import { UpdateMedicationSchema } from './schema'

interface DoseInformationProps {
  index: number
}

const DoseInformation = ({ index }: DoseInformationProps) => {
  const form = useFormContext<UpdateMedicationSchema>()
  const codes = useCodesetCodes(CODESETS.PrescriptionQuantityUnitOfMeasureList)
  const handleValueChange = (value: string) => {
    form.setValue(`drugList.${index}.quantityUnitOfMeasureCode`, value)
  }
  const qualityUnitsCodesets = useDeepCompareMemo(() => {
    return codes.map(({ display, value, attributes }) => {
      const submissionCode =
        attributes?.find((attr) => attr.name === 'SurescriptsCode')?.value ?? ''
      return {
        label: display,
        value: submissionCode,
      }
    })
  }, [codes])
  return (
    <Flex gap="2">
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Dose Strength</FormFieldLabel>
        <TextField.Root
          {...form.register(`drugList.${index}.doseStrength`)}
          className="h-6 w-full"
          size="1"
        />
      </FormFieldContainer>

      <FormFieldContainer className="flex-1">
        <FormFieldLabel required>Quantity Unit</FormFieldLabel>
        <SelectInput
          field={`drugList.${index}.quantityUnitOfMeasureCode`}
          options={qualityUnitsCodesets}
          onValueChange={handleValueChange}
          className=""
          buttonClassName="h-6 w-full"
          size="1"
          value={form.getValues(`drugList.${index}.quantityUnitOfMeasureCode`)}
        />
        <FormFieldError name={`drugList.${index}.quantityUnitOfMeasureCode`} />
      </FormFieldContainer>
      <FormFieldContainer className="flex-1">
        <FormFieldLabel required>Quantity</FormFieldLabel>
        <NumericInput
          placeholder="Quantity"
          field={`drugList.${index}.quantityValue`}
          className="h-6 w-full"
          prefix=""
          decimalScale={1}
          allowNegative={false}
        />
        <FormFieldError name={`drugList.${index}.quantityValue`} />
      </FormFieldContainer>
    </Flex>
  )
}

export { DoseInformation }
