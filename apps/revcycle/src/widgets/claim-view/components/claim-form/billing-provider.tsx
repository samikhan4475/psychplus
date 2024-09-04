'use client'

import { Grid } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { FormSelect, FormTextInput } from '@psychplus/form'
import { useStore } from '../../store'
import { SchemaType } from './add-claim-form'

const BillingProvider = ({ form }: { form: UseFormReturn<SchemaType> }) => {
  const posCodes = useStore((state) => state.posCodeSets)
  const staffCodeSets = useStore((state) => state.staffCodeSets)
  const locations = useStore((state) => state.locations)

  return (
    <Grid columns="5" gap="2" rows="repeat(2)" width="auto">
      <FormSelect
        label="Rendering Provider"
        placeholder="Default Value"
        required={true}
        {...form.register('renderingProviderId')}
        options={staffCodeSets}
      />

      <FormSelect
        label="Supervising Provider"
        placeholder="Default Value"
        required={false}
        {...form.register('supervisingProviderId')}
        options={staffCodeSets}
      />
      <FormSelect
        label="Attending Provider"
        placeholder="Default Value"
        required={false}
        {...form.register('attendingProviderId')}
        options={staffCodeSets}
      />

      <FormSelect
        label="Ordering Provider"
        placeholder="Default Value"
        required={false}
        {...form.register('orderingProviderId')}
        options={staffCodeSets}
      />

      <FormSelect
        label="Ref. Provider"
        placeholder="Default Value"
        required={false}
        {...form.register('referringProviderId')}
        options={staffCodeSets}
      />
      <FormSelect
        disabled={true}
        label="Service Location"
        placeholder="Default Value"
        required={true}
        {...form.register('locationId')}
        options={locations}
      />

      <FormSelect
        label="Billing Location"
        placeholder="Default Value"
        required={true}
        {...form.register('locationId')}
        options={locations}
      />

      {/* <FormTextInput
        disabled={true}
        type="text"
        label="Billing Location Address"
        placeholder="Shahbaz MD"
        data-testid="add-fee-schedule-name-input"
        
        value={"test"}
      /> */}

      <FormTextInput
        value={'Test'}
        name=""
        type="text"
        label="Billing Location Address"
        className="pointer-events-none border-0 outline-none"
        disabled={true}
      />
      <FormSelect
        label="POS"
        placeholder="Default Value"
        required={true}
        {...form.register('placeOfService')}
        options={posCodes.map((r) => ({
          label: r.display,
          value: r.code,
        }))}
      />
    </Grid>
  )
}

export { BillingProvider }
