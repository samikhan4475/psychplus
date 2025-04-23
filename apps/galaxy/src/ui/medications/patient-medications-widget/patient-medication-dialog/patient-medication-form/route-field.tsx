'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const RouteField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'doseRouteCode')

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Route</FormFieldLabel>
      <CodesetSelect
        name={field}
        codeset={CODESETS.PrescriptionRouteList}
        className="h-6 w-[120px]"
        size="1"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { RouteField }
