'use client'

import { useFormContext } from 'react-hook-form'
import { FormFieldError, MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchemaType } from '../filter-actions-group'

const VisitTypeMultiSelect = () => {
  const form = useFormContext<SchemaType>()
  const options = useCodesetOptions(CODESETS.VisitType)

  return (
    <FormFieldContainer>
      <FieldLabel>Visit Type</FieldLabel>
      <MultiSelectField
        defaultValues={form.watch('visitTypeCode')}
        options={options}
        className="flex-1"
        onChange={(values) =>
          form.setValue('visitTypeCode', values, { shouldDirty: true })
        }
        menuClassName="w-[155px]"
      />
      <FormFieldError name="visitTypeCode" />
    </FormFieldContainer>
  )
}

export { VisitTypeMultiSelect }
