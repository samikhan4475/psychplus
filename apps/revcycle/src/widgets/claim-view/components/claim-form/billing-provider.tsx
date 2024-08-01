'use client'

import { Grid } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { FormTextInput } from '@psychplus/form'
import { SchemaType } from './add-claim-form'
import ClaimFormSelect from './claim-form-select'

const options = [
  { label: 'Shahbaz MD', value: 'Shahbaz MD' },
  { label: 'Willow Brook', value: 'Willow Brook2' },
]

const BillingProvider = ({ form }: { form: UseFormReturn<SchemaType> }) => {
  return (
    <Grid columns="5" gap="2" rows="repeat(2)" width="auto">
      <ClaimFormSelect
        label="Rendering Provider"
        options={options}
        defaultValue="Shahbaz MD"
      />

      <ClaimFormSelect
        label="Supervising Provider"
        options={options}
        defaultValue="Shahbaz MD"
      />

      <ClaimFormSelect
        label="Attending Provider"
        options={options}
        defaultValue="Shahbaz MD"
      />

      <ClaimFormSelect
        label="Ordering Provider"
        options={options}
        defaultValue="Shahbaz MD"
      />

      <ClaimFormSelect
        label="Ref. Provider"
        options={options}
        defaultValue="Shahbaz MD"
      />

      <ClaimFormSelect
        label="Service Location"
        options={options}
        defaultValue="Shahbaz MD"
      />

      <ClaimFormSelect
        label="Billing Location"
        options={options}
        defaultValue="Shahbaz MD"
      />

      <FormTextInput
        type="text"
        label="Billing Location Address"
        placeholder="Shahbaz MD"
        data-testid="add-fee-schedule-name-input"
        {...form.register('name')}
      />

      <ClaimFormSelect
        label="POS"
        options={options}
        defaultValue="Shahbaz MD"
      />
    </Grid>
  )
}

export { BillingProvider }
