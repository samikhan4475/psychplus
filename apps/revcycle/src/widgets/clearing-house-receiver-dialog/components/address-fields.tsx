import { Grid, Text } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { SchemaType } from '.'
import TextFieldLabel from './text-field'

const AddressComponent = ({
  title,
  isEdit,
  form,
}: {
  title?: string
  form: UseFormReturn<SchemaType>
  isEdit: boolean
}) => {
  return (
    <>
      {title && <Text size="1">{title}</Text>}

      <Grid columns="5" gap="4">
        <TextFieldLabel
          label="Address 1"
          type="text"
          disabled={isEdit}
          error={form.formState?.errors?.address1?.message}
          onChange={(value: string) => {
            form.setValue(`address1`, value)
          }}
          required={true}
        />
        <TextFieldLabel
          label="Address 2"
          type="text"
          disabled={isEdit}
          error={form.formState?.errors?.address2?.message}
          onChange={(value: string) => {
            form.setValue(`address2`, value)
          }}
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
        />
        <TextFieldLabel
          type="text"
          label="State"
          disabled={isEdit}
          error={form.formState?.errors?.state?.message}
          onChange={(value: string) => {
            form.setValue(`state`, value)
          }}
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
        />
      </Grid>
    </>
  )
}

export default AddressComponent
