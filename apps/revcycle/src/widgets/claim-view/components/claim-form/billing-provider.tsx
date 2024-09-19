'use client'

import { Grid } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { FormSelect, FormTextInput } from '@psychplus/form'
import { useStore } from '../../store'
import { SchemaType } from './add-claim-form'

interface Address {
  type: string
  street1: string
  street2?: string
  city: string
  state: string
  postalCode: string
  timeZoneId?: string
}

interface Contact {
  addresses: Address[]
}

interface LocationOption {
  value: string
  label: string
  contact?: Contact 
}

type Locations = LocationOption[] 

const BillingProvider = ({ form }: { form: UseFormReturn<SchemaType> }) => {
  const locationId = form.getValues('locationId')
  const posCodes = useStore((state) => state.posCodeSets)
  const staffCodeSets = useStore((state) => state.staffCodeSets)
  const locations = useStore((state) => state.locations) as Locations 
  const locationOptions = locations.map((location) => ({
    label: location.label, 
    value: location.value,
    disabled: false, 
  }))
  const getBusinessAddress = (
    locations: LocationOption[],
    locationId?: string,
  ): Address | null => {
    if (!locationId) {
      return null
    }

    const location = locations.find((item) => item.value === locationId)
    if (location?.contact?.addresses) {
      const businessAddresses = location.contact.addresses.filter(
        (address) => address.type === 'Business',
      )
      if (businessAddresses.length > 0) {
        return businessAddresses[0]
      }
    }

    return null
  }

  const businessAddress = getBusinessAddress(locations, locationId)

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
        options={locationOptions}
      />

      <FormSelect
        label="Billing Location"
        placeholder="Default Value"
        required={true}
        {...form.register('locationId')}
        options={locationOptions}
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
        value={businessAddress?.street1}
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
