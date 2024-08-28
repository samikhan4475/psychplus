import { Grid, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormSelect } from '@psychplus/form'
import { useGooglePlacesContext } from '@/providers'
import AddressTextField from './address-text-field'
import { GooglePlacesAutocomplete } from './autocomplete'

interface UsState {
  label: string
  value: string
}

interface AddressProps {
  title?: string
  isEdit?: boolean
  usStates: UsState[]
  columnsPerRow?: string
}
const AddressComponent = ({
  title,
  isEdit,
  usStates,
  columnsPerRow = '2',
}: AddressProps) => {
  const { loaded } = useGooglePlacesContext()

  const form = useFormContext()
  return (
    <>
      {title && (
        <Text weight={'medium'} className="text-[14px] text-[#1C2024]">
          {title}
        </Text>
      )}

      <Grid columns={columnsPerRow} gap="3">
        {loaded && (
          <GooglePlacesAutocomplete
            required
            name={'address1'}
            placeholder={'Enter Address 1'}
          />
        )}
        <AddressTextField
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
        <AddressTextField
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
        <AddressTextField
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

export { AddressComponent }
