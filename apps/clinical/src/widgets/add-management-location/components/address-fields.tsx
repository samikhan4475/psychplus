import { Grid, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormSelect } from '@psychplus/form'
import { useGooglePlacesContext } from '@/providers'
import { useUsStatesOptions } from '../hooks'
import { PlacesAutocomplete } from './places-autocomplete/places-autocomplete'
import TextFieldLabel from './text-field'

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
    <>
      {title && <Text size="1">{title}</Text>}

      <Grid columns="2" gap="3">
        {loaded && <PlacesAutocomplete required name={'address1'} />}
        <TextFieldLabel
          label="Address 2"
          type="text"
          disabled={isEdit}
          placeholder="Enter address line 2"
          error={
            form.formState?.errors?.address2?.message as string | undefined
          }
          onChange={(value: string) => {
            form.setValue(`address2`, value)
          }}
          register={form.register('address2')}
        />
      </Grid>
      <Grid columns="3" gap="3">
        <TextFieldLabel
          label="City"
          type="text"
          disabled={isEdit}
          placeholder="Select city"
          error={form.formState?.errors?.city?.message as string | undefined}
          onChange={(value: string) => {
            form.setValue(`city`, value)
          }}
          required={true}
          register={form.register('city')}
        />
        <FormSelect
          label="State"
          size="2"
          placeholder="Select state"
          options={usStates ?? []}
          {...form.register('state')}
          required={true}
        />
        <TextFieldLabel
          type="text"
          label="Zip"
          disabled={isEdit}
          placeholder="Enter zip code"
          error={form.formState?.errors?.zip?.message as string | undefined}
          onChange={(value: string) => {
            form.setValue(`zip`, value)
          }}
          required={true}
          register={form.register('zip')}
        />
      </Grid>
    </>
  )
}

export default AddressComponent
