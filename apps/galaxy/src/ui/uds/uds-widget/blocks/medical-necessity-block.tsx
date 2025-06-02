import { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes, useCodesetOptions } from '@/hooks'
import { UdsWidgetSchemaType } from '../uds-widget-schema'
import { OtherBlock } from './other-block'

const MedicalNecessityMultiSelectField = () => {
  const { setValue } = useFormContext<UdsWidgetSchemaType>()
  const form = useFormContext()

  const codes = useCodesetCodes(CODESETS.UDSMedicalNecessity)
  const options = useMemo(
    () =>
      codes
        .toSorted((a, b) => {
          const aValue =
            a.attributes?.find((attr) => attr.name === 'SortValue')?.value ?? 0
          const bValue =
            b.attributes?.find((attr) => attr.name === 'SortValue')?.value ?? 0
          return +aValue - +bValue
        })
        .map((item) => ({
          label: item.display,
          value: item.value,
        })),
    [codes],
  )

  return (
    <FormFieldContainer className="flex-row gap-x-2">
      <FormFieldLabel className="text-[12px]" required>
        The patient was administered a urine drug screen (UDS) for:
      </FormFieldLabel>
      <MultiSelectField
        options={options}
        className="min-w-60"
        onChange={(values) => setValue('medicalNecessity', values)}
        defaultValues={form.getValues('medicalNecessity') ?? []}
      />
      <FormFieldError name="medicalNecessity" />
    </FormFieldContainer>
  )
}

const MedicalNecessityBlock = () => {
  const form = useFormContext()
  return (
    <Flex direction="column">
      <BlockLabel className="mb-1 text-3" required>
        UDS Medical Necessity
      </BlockLabel>
      <MedicalNecessityMultiSelectField />
      {form.watch('medicalNecessity')?.includes('Other') && <OtherBlock />}
    </Flex>
  )
}

export { MedicalNecessityBlock }
