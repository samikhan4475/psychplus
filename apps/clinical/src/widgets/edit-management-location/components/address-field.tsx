import { Flex, Grid, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormSelect } from '@psychplus/form'
import { useGooglePlacesContext } from '@/providers'
import { useUsStatesOptions } from '../hooks'
import { AddressTextField } from './address-text-field'
import { GooglePlacesAutocomplete } from './places-autocomplete/google-places-autocomplete'

const AddressComponent = ({
  title,
  isEdit,
}: {
  title?: string
  isEdit?: boolean
}) => {
  const { loaded } = useGooglePlacesContext()
  const usStates = useUsStatesOptions()
  const form = useFormContext()

  return (
    <Flex direction={'column'} gap={'3'} className="w-[600px] px-2 py-3 ">
      {title && (
        <Text weight={'medium'} className="text-[14px] text-[#1C2024]">
          {title}
        </Text>
      )}
      <Grid columns="1" gap="3">
        {loaded && <GooglePlacesAutocomplete required name={'address1'} />}

        <AddressTextField label="Address 2" name="address2" disabled={isEdit} />
      </Grid>
      <Grid columns="3" gap="3">
        <AddressTextField label="City" name="city" required disabled={isEdit} />

        <FormSelect
          label="State"
          size="2"
          placeholder="State"
          required
          options={usStates ?? []}
          {...form.register('state')}
        />

        <AddressTextField label="Zip" name={'zip'} required disabled={isEdit} />
      </Grid>
    </Flex>
  )
}

export default AddressComponent
