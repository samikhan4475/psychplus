import { Grid, Text } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { FormSelect } from '@psychplus/form'
import { useGooglePlacesContext } from '@/providers'
import { SchemaType } from '.'
import { StateOption } from '../types'
import { PlacesAutocomplete } from './places-autocomplete'
import TextFieldLabel from './text-field'

const AddressComponent = ({
  title,
  isEdit,
  form,
  usStatesCodeSets,
}: {
  title?: string
  form: UseFormReturn<SchemaType>
  isEdit: boolean
  usStatesCodeSets?: StateOption[]
}) => {
  const { loaded } = useGooglePlacesContext()

  return (
    <>
      {title && <Text size="1">{title}</Text>}

      <Grid columns="5" gap="4">
        {loaded && <PlacesAutocomplete required name={'address'} form={form} />}
        <TextFieldLabel
          label="Address 2"
          type="text"
          disabled={isEdit}
          error={form.formState?.errors?.address2?.message}
          onChange={(value: string) => {
            form.setValue(`address2`, value)
          }}
          register={form.register('address2')}
        />
        <TextFieldLabel
          label="City"
          type="text"
          disabled={isEdit}
          error={form.formState?.errors?.city?.message}
          onChange={(value: string) => {
            form.setValue(`city`, value)
          }}
          required={true}
          register={form.register('city')}
        />

        <FormSelect
          label="State"
          size="2"
          placeholder=""
          options={usStatesCodeSets ?? []}
          {...form.register('state')}
          required={true}
        />

        <TextFieldLabel
          type="text"
          label="Zip"
          disabled={isEdit}
          error={form.formState?.errors?.zip?.message}
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
