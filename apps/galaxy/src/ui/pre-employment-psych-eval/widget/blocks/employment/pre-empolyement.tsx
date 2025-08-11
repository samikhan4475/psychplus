'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { BlockHeading } from '@/ui/fit-for-duty-psych-eval/widget/block-heading'
import {
  DetailsField,
  RadioFieldWithError,
} from '@/ui/fit-for-duty-psych-eval/widget/components'
import { EMPLOYMENT_BLOCK_CONFIG } from '@/ui/fit-for-duty-psych-eval/widget/constant'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'
import { PreEmploymentInput } from './pre-employment-input'

const PreEmployement = ({ disabled = false }: BlockProps) => {
  const { watch, setValue } = useFormContext()

  const hasDisciplinaryActions = watch('hasDisciplinaryActions')
  useEffect(() => {
    if (hasDisciplinaryActions && hasDisciplinaryActions !== 'has') {
      setValue('disciplinaryIncidentDescription', '')
    }
  }, [hasDisciplinaryActions, setValue])

  return (
    <BlockHeading title="Employment">
      <PreEmploymentInput />
      {EMPLOYMENT_BLOCK_CONFIG?.map((item) => {
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
            className="min-h-20"
          />
        )
      })}
    </BlockHeading>
  )
}

export { PreEmployement }
