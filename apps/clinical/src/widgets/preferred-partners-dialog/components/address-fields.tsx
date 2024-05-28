import { Box, Text } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { SchemaType } from '.'
import TextFieldLabel from './text-field'

const AddressComponent = ({
  title,
  isProfileScreen = false,
  isMailingAddress = false,
  isEdit,
  form,
}: {
  title?: string
  form: UseFormReturn<SchemaType>
  isEdit: boolean
  isProfileScreen?: boolean
  isMailingAddress?: boolean
}) => {
  const addressType = isMailingAddress ? 'mailingAddress' : 'primaryAddress'
  return (
    <>
      {title && (
        <Text size="1">
          {title} <span className="text-[#FF0000]">*</span>
        </Text>
      )}
      <div className={`${isProfileScreen && 'grid grid-cols-2 gap-4'}`}>
        <Box>
          <TextFieldLabel
            label="Address 1"
            type="text"
            disabled={isEdit}
            error={form.formState?.errors?.[addressType]?.street1?.message}
            value={form.getValues(`${addressType}.street1`)}
            onChange={(value: string) => {
              form.setValue(`${addressType}.street1`, value)
            }}
          />
        </Box>
        <Box className={`${isProfileScreen ? '' : 'mt-4'}`}>
          <TextFieldLabel
            label="Address 2"
            type="text"
            disabled={isEdit}
            error={form.formState?.errors?.[addressType]?.street2?.message}
            value={form.getValues(`${addressType}.street2`)}
            onChange={(value: string) => {
              form.setValue(`${addressType}.street2`, value)
            }}
          />
        </Box>
      </div>

      <div className={`${isProfileScreen ? 'grid grid-cols-2 gap-4' : ''}`}>
        <div className="grid grid-cols-3 gap-4">
          <Box>
            <TextFieldLabel
              label="City"
              type="text"
              disabled={isEdit}
              error={form.formState?.errors?.[addressType]?.city?.message}
              value={form.getValues(`${addressType}.city`)}
              onChange={(value: string) => {
                form.setValue(`${addressType}.city`, value)
              }}
            />
          </Box>

          <Box>
            <TextFieldLabel
              type="text"
              label="State"
              disabled={isEdit}
              error={form.formState?.errors?.[addressType]?.state?.message}
              value={form.getValues(`${addressType}.state`)}
              onChange={(value: string) => {
                form.setValue(`${addressType}.state`, value)
              }}
            />
          </Box>

          <Box>
            <TextFieldLabel
              type="text"
              label="Zip"
              disabled={isEdit}
              data-testid="signup-first-name-input"
              error={form.formState?.errors?.[addressType]?.postalCode?.message}
              value={form.getValues(`${addressType}.postalCode`)}
              onChange={(value: string) => {
                form.setValue(`${addressType}.postalCode`, value)
              }}
            />
          </Box>
        </div>
      </div>
    </>
  )
}

export default AddressComponent
