'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { BlockHeading } from '../../block-heading'
import { DetailsField, RadioFieldWithError } from '../../components'
import { ALCOHOL_DRUGS_BLOCK_CONFIG } from '../../constant'
import { BlockProps } from '../../types'

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
      {ALCOHOL_DRUGS_BLOCK_CONFIG.map((item) => {
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
