'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const RouteField = () => {

  return (
    <FormFieldContainer>
      <FormFieldLabel>Route</FormFieldLabel>
      <CodesetSelect
        className="h-6"
        name="routeCode"
        codeset={CODESETS.ImmunizationRouteOfAdministration}
        size="1"
      />
      <FormFieldError name="routeCode" />
    </FormFieldContainer>
  )
}

export { RouteField }
