'use client'

import { useFormContext } from 'react-hook-form'
import { BlockHeading } from '@/ui/fit-for-duty-psych-eval/widget/block-heading'
import {
  DetailsField,
  RadioFieldWithError,
} from '@/ui/fit-for-duty-psych-eval/widget/components'
import { LEGAL_BLOCK_CONFIG } from '@/ui/fit-for-duty-psych-eval/widget/constant'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'

const PreLegal = ({ disabled = false }: BlockProps) => {
  const { watch } = useFormContext()

  return (
    <BlockHeading title="Legal">
      {LEGAL_BLOCK_CONFIG.map((item) => {
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

export { PreLegal }
