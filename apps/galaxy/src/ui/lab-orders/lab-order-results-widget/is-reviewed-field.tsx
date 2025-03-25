'use client'

import { Checkbox } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './inbox-lab-orders-filter-form'

const IsReviewedField = () => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const isChecked = watch('isResultSigned') 

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Is Reviewed</FormFieldLabel>
      <Checkbox
        checked={isChecked}
        onCheckedChange={(checked) => setValue('isResultSigned', !!checked)}
        color="indigo"
      />
    </FormFieldContainer>
  )
}

export { IsReviewedField }
