import React, { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SelectableChip, SingleSelectChip } from '@/components-v2'
import {
  DRUG_DETAILS_OPTIONS,
  DRUGS_DESCRIPTION,
  DRUGS_ID,
  DRUGS_LABEL,
  YES_NO_OPTIONS,
} from '../constants'
import { SubstanceUseSchemaType } from '../substance-use-hx-schema'

const DrugsBlock = () => {
  const form = useFormContext<SubstanceUseSchemaType>()
  const error = form.getFieldState(DRUGS_ID, form.formState).error
  const checkedDrugs = form.watch([
    'opioids',
    'sedative',
    'cocaine',
    'amphetamine',
    'pcp',
    'inhalants',
  ])

  useEffect(() => {
    form.clearErrors(DRUGS_ID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(checkedDrugs)])

  return (
    <Flex gap={'2'} align={'center'} wrap={'wrap'}>
      <Text weight="medium" className="line-clamp-1 text-[16px]">
        {DRUGS_LABEL}:
      </Text>
      <Text weight={'regular'} className="line-clamp-1 text-[14px]">
        {DRUGS_DESCRIPTION}
      </Text>
      {YES_NO_OPTIONS.map((option) => (
        <SelectableChip
          key={option.value}
          label={option.label}
          selected={form.watch(DRUGS_ID) === option.value}
          onClick={() => {
            form.clearErrors(DRUGS_ID)
            form.setValue(DRUGS_ID, option.value)
          }}
        />
      ))}
      {form.watch(DRUGS_ID) === 'yes' && (
        <Flex gap="2" direction="column" mt="1">
          <Flex gap="2" align="center" wrap="wrap">
            {DRUG_DETAILS_OPTIONS.map((option) => (
              <SingleSelectChip
                key={option.field}
                label={option.label}
                field={option.field}
                details={{
                  label: 'Details',
                  type: 'text',
                  field: option.detailsField,
                }}
              />
            ))}
            {error ? (
              <Text className=" pl-1 text-[12px] text-tomato-11">
                {error.message}
              </Text>
            ) : null}
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export { DrugsBlock }
