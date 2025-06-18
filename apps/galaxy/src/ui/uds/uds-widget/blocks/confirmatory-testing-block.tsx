import { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  MultiSelectField,
  YesNoSelect,
} from '@/components'
import { ChipList } from '@/components/chip-list'
import { CODESETS } from '@/constants'
import { useCodesetCodes, useCodesetOptions } from '@/hooks'
import { UdsWidgetSchemaType } from '../uds-widget-schema'

const ReasonOfConfirmationMultiSelectField = ({
  editable = true,
}: {
  editable?: boolean
}) => {
  const { setValue } = useFormContext<UdsWidgetSchemaType>()
  const form = useFormContext()

  const codes = useCodesetCodes(CODESETS.ConfirmatoryTesting)
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
          Reason for Confirmation:
        </FormFieldLabel>
        <MultiSelectField
          disabled={!editable}
          options={options}
          className="min-w-60"
          onChange={(values) => setValue('confirmationReasons', values)}
          defaultValues={form.getValues('confirmationReasons') ?? []}
        />
        <FormFieldError name={'confirmationReasons'} />
      </FormFieldContainer>
      <Flex className="mt-2 w-full max-w-[700px] flex-wrap gap-1">
        <ChipList
          isDisable={!editable}
          data={form.watch('confirmationReasons')}
          field={'confirmationReasons'}
          chipClassName="self-center"
          options={options ?? []}
        />
      </Flex>
    </>
  )
}

const ConfirmatoryTestingBlock = ({
  editable = true,
}: {
  editable?: boolean
}) => {
  const { watch } = useFormContext<UdsWidgetSchemaType>()
  const isConfirmatoryTesting = watch('confirmatoryTesting')

  return (
    <>
      <FormFieldContainer className="align-center flex-row gap-x-2">
        <BlockLabel required className="text-3">
          Confirmatory Testing
        </BlockLabel>
        <YesNoSelect field="confirmatoryTesting" disabled={!editable} />
        <FormFieldError name={'confirmatoryTesting'} />
      </FormFieldContainer>
      {isConfirmatoryTesting === 'yes' && (
        <ReasonOfConfirmationMultiSelectField editable={editable} />
      )}
    </>
  )
}

export { ConfirmatoryTestingBlock }
