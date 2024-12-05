import React, { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SingleSelectChip, YesNoSelect } from '@/components'
import { SubstanceUseHxWidgetSchemaType } from '../substance-use-hx-schema'
import {
  DRUG_DETAILS_OPTIONS,
  DRUGS_DESCRIPTION,
  DRUGS_ID,
  DRUGS_LABEL,
} from './constants'

const DrugsBlock = () => {
  const form = useFormContext<SubstanceUseHxWidgetSchemaType>()
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
    <>
      <YesNoSelect
        label={DRUGS_LABEL}
        description={DRUGS_DESCRIPTION}
        field={DRUGS_ID}
        isNoFirst
      />
      {form.watch(DRUGS_ID) === 'yes' && (
        <Flex direction="column" gap="2" mt="1">
          <Flex align="center" gap="2" wrap="wrap">
            {DRUG_DETAILS_OPTIONS.map((option) => (
              <SingleSelectChip
                key={option.field}
                label={option.label}
                field={option.field}
                details={{
                  type: 'text',
                  label: 'Details',
                  field: option.detailsField,
                }}
              />
            ))}
            {error ? (
              <Text className="pl-1 text-[12px] text-tomato-11">
                {error.message}
              </Text>
            ) : null}
          </Flex>
        </Flex>
      )}
    </>
  )
}

export { DrugsBlock }
