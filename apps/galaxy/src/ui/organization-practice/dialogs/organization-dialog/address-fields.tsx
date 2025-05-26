'use client'

import { Flex, Grid } from '@radix-ui/themes'
import {
  AddressTextField,
  GooglePlacesAutocomplete,
  UsStateSelect,
} from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { useGooglePlacesContext } from '@/providers/google-places-provider'
import { EhrPartnerField } from './ehr-partner-field'

const AddressFields = () => {
  const { loaded } = useGooglePlacesContext()
  return (
    <FormFieldContainer className="flex-1 gap-0 pt-2">
      <FormFieldLabel className="pb-2 text-[14px]">
        Primary Address
      </FormFieldLabel>
      <Flex gap="2" direction="column">
        <Grid columns="2" gap="2" className="flex-1">
          {loaded && (
            <GooglePlacesAutocomplete
              required
              name="address1"
              zipFieldName="zip"
              address2FieldName="address2"
              placeholder="Enter Address 1"
            />
          )}
          <AddressTextField
            label="Address 2"
            field="address2"
            placeholder="Enter Address 2"
          />
        </Grid>
        <Grid columns="5" gap="3" className="flex-1">
          <AddressTextField
            label="City"
            field="city"
            placeholder="Enter City"
            required
          />
          <UsStateSelect required />

          <AddressTextField
            label="Zip"
            field="zip"
            placeholder="Zip"
            type="number"
            maxLength={5}
            required
          />
          <AddressTextField
            label="Area Code"
            field="zipLast4"
            placeholder="Area code"
            type="number"
            maxLength={4}
          />
          <EhrPartnerField />
        </Grid>
      </Flex>
    </FormFieldContainer>
  )
}

export { AddressFields }
