'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { BlockHeading } from '@/ui/fit-for-duty-psych-eval/widget/block-heading'
import {
  DetailsField,
  RadioFieldWithError,
} from '@/ui/fit-for-duty-psych-eval/widget/components'
import {
  ALCOHOL_DRUGS_BLOCK_CONFIG,
  INCIDENT_RISK_OPTIONS,
} from '@/ui/fit-for-duty-psych-eval/widget/constant'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'

const AlcoholDrugs = ({ disabled = false }: BlockProps) => {
  const { watch, setValue } = useFormContext()
  const alcoholTreatmentHistory = watch('alcoholTreatmentHistory')
  useEffect(() => {
    if (alcoholTreatmentHistory && alcoholTreatmentHistory !== 'has') {
      setValue('alcoholTreatmentProgram', '')
    }
  }, [alcoholTreatmentHistory, setValue])
  return (
    <BlockHeading title="Alcohol and Drugs">
      {[...ALCOHOL_DRUGS_BLOCK_CONFIG, INCIDENT_RISK_OPTIONS].map((item) => {
        const isConditionalField =
          item.conditionalOn &&
          watch(item.conditionalOn.field) !== item.conditionalOn.value

        if (isConditionalField) return null

        if (item.options) {
          return (
            <RadioFieldWithError
              key={item.field}
              field={item.field}
              label={item.heading}
              options={item.options}
              disabled={disabled}
              required
            />
          )
        }

        return (
          <DetailsField
            key={item.field}
            field={item.field}
            label={item.heading}
            disabled={disabled}
            maxLength={item.maxLength}
            className="min-h-11"
          />
        )
      })}
    </BlockHeading>
  )
}

export { AlcoholDrugs }
