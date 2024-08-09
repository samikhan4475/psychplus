import { Box, Flex, Text, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormSelect, FormTextInput } from '@psychplus/form'
import { PlacesAutocomplete } from '@/components/places-autocomplete'
import { useGooglePlacesContext } from '@/providers'
import { FORM_FIELD_CLASSES } from '../constants'
import { useUsStatesOptions } from '../hooks'
import { useEditModeContext } from '@psychplus/patient-info'

interface PlaceholderFieldProps {
  label: string
  required?: boolean
  className: string
}

const PlaceholderField = ({
  label,
  required,
  className,
}: PlaceholderFieldProps) => {
  return (
    <Flex direction="column" gap="1">
      <Text as="label" size="2" weight="medium">
        {label} {required && <span className="text-[#FF0000]">*</span>}
      </Text>
      <TextField.Input
        className={className}
        placeholder="Same as primary"
        disabled
      />
    </Flex>
  )
}

const PatientMailingAddress = () => {
  const { register, watch } = useFormContext()
  const { editable } = useEditModeContext()
  const { loaded } = useGooglePlacesContext()
  const usStates = useUsStatesOptions()
  const isMailingAddressSameAsPrimary = watch(
    'contactDetails.isMailingAddressSameAsPrimary',
  )

  if (isMailingAddressSameAsPrimary)
    return (
      <>
        <PlaceholderField className={FORM_FIELD_CLASSES} label="Address 1" />
        <PlaceholderField className={FORM_FIELD_CLASSES} label="Address 2" />
        <Flex className="bg-gray-200 gap-3">
          <Box className="flex-1">
            <PlaceholderField
              className={FORM_FIELD_CLASSES}
              required
              label="City"
            />
          </Box>
          <Box className="flex-1">
            <PlaceholderField
              className={FORM_FIELD_CLASSES}
              required
              label="State"
            />
          </Box>
          <Box className="flex-1">
            <PlaceholderField
              className={FORM_FIELD_CLASSES}
              required
              label="Zip"
            />
          </Box>
        </Flex>
      </>
    )

  return (
    <>
      {loaded && (
        <PlacesAutocomplete
          required
          disabled={!editable}
          placeholder="Address line 1"
          name={'contactDetails.mailingAddress'}
        />
      )}
      <FormTextInput
        className={FORM_FIELD_CLASSES}
        {...register(`contactDetails.mailingAddress.street2`)}
        disabled={!editable}
        placeholder="Address line 2"
        label="Address 2"
      />
      <Flex className="bg-gray-200 gap-3">
        <Box className="flex-1">
          <FormTextInput
            className={FORM_FIELD_CLASSES}
            {...register(`contactDetails.mailingAddress.city`)}
            disabled={!editable}
            required
            label="City"
            placeholder="City"
          />
        </Box>
        <Box className="flex-1">
          <FormSelect
            {...register(`contactDetails.mailingAddress.state`)}
            disabled={!editable}
            required
            buttonClassName={FORM_FIELD_CLASSES}
            contentClassName="max-h-[250px]"
            label="State"
            placeholder="Select state"
            options={usStates}
          />
        </Box>
        <Box className="flex-1">
          <FormTextInput
            className={FORM_FIELD_CLASSES}
            {...register(`contactDetails.mailingAddress.postalCode`)}
            disabled={!editable}
            placeholder="Zip code"
            required
            label="Zip"
          />
        </Box>
      </Flex>
    </>
  )
}

export { PatientMailingAddress }
