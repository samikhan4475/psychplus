import { useMemo } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { ChipList } from '@/components/chip-list'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { UdsWidgetSchemaType } from '../uds-widget-schema'
import { OtherBlock } from './other-block'

const MedicalNecessityMultiSelectField = ({
  editable = true,
}: {
  editable?: boolean
}) => {
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
    <>
      <FormFieldContainer className="flex-row gap-x-2">
        <FormFieldLabel className="text-[12px]" required>
          The patient was administered a urine drug screen (UDS) for:
        </FormFieldLabel>
        <MultiSelectField
          disabled={!editable}
          options={options}
          className="min-w-60"
          onChange={(values) => setValue('medicalNecessity', values)}
          defaultValues={form.getValues('medicalNecessity') ?? []}
        />
        <FormFieldError name="medicalNecessity" />
      </FormFieldContainer>
      <Flex className="mt-2 w-full max-w-[700px] flex-wrap gap-1">
        <ChipList
          isDisable={!editable}
          data={form.watch('medicalNecessity')}
          field={'medicalNecessity'}
          chipClassName="self-center"
          options={options ?? []}
        />
      </Flex>
    </>
  )
}

const MedicalNecessityBlock = ({ editable = true }: { editable?: boolean }) => {
  const form = useFormContext()
  return (
    <Flex direction="column">
      <BlockLabel className="mb-1 text-3" required>
        UDS Medical Necessity
      </BlockLabel>
      <MedicalNecessityMultiSelectField editable={editable} />
      {form.watch('medicalNecessity')?.includes('Other') && (
        <OtherBlock editable={editable} />
      )}
    </Flex>
  )
}

export { MedicalNecessityBlock }
