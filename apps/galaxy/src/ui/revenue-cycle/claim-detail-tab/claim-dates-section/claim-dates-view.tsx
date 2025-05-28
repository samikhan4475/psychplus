import React from 'react'
import { Grid, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { ClaimUpdateSchemaType } from '../schema'
import { claimDateFields } from './claim-date-fields'

const ClaimDatesView = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  return (
    <Grid columns="4" gap="2">
      {claimDateFields.map(({ label, field, type }) => (
        <FormFieldContainer key={field as string} className="flex-1">
          <FormFieldLabel>{label}</FormFieldLabel>
          {type === 'date' ? (
            <DatePickerInput field={field} />
          ) : (
            <TextField.Root size="1" {...form.register(field)} />
          )}
        </FormFieldContainer>
      ))}
    </Grid>
  )
}

export { ClaimDatesView }
