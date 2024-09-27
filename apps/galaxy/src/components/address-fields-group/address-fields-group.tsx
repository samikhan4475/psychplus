'use client'

import { Flex, FlexProps, Grid, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useGooglePlacesContext } from '@/providers/google-places-provider'
import { FormFieldContainer, FormFieldError, FormFieldLabel } from '../form'
import { ZipcodeInput } from '../zipcode-input'
import { GooglePlacesAutocomplete } from './address-autocomplete'
import { AddressTextField } from './address-text-field'
import { UsStateSelect } from './usstate-select'
import { fieldName } from './utils'

interface AddressProps {
  title?: string
  columnsPerRow?: string
  required?: boolean
  className?: string
  prefix?: string
  direction?: FlexProps['direction']
}
const AddressFieldsGroup = ({
  title,
  columnsPerRow = '2',
  required = true,
  className,
  prefix,
  direction = 'column',
}: AddressProps) => {
  const { loaded } = useGooglePlacesContext()

  const form = useFormContext()

  const zipFieldName = fieldName('zip', prefix)

  return (
    <Flex gap="2" className={className} direction={direction}>
      {title && (
        <Text weight="medium" className="text-pp-black-3 text-[14px]">
          {title}
          {required ? (
            <Text className="ml-[2px] text-[12px] text-red-9">*</Text>
          ) : null}
        </Text>
      )}
      <Grid columns={columnsPerRow} gap="2" className="flex-1">
        {loaded && (
          <GooglePlacesAutocomplete
            required={required}
            name="address1"
            placeholder="Enter Address 1"
            prefix={prefix}
          />
        )}
        <AddressTextField
          label="Address 2"
          field={fieldName('address2', prefix)}
          placeholder="Enter Address 2"
        />
      </Grid>
      <Grid columns="3" gap="3" className="flex-1">
        <AddressTextField
          label="City"
          field={fieldName('city', prefix)}
          placeholder="Enter City"
          required={required}
        />
        <UsStateSelect required={required} prefix={prefix} />

        <FormFieldContainer className="flex-1">
          <FormFieldLabel required>Zip Code</FormFieldLabel>
          <ZipcodeInput
            size="1"
            placeholder="Enter Zip"
            className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] disabled:bg-gray-3 disabled:text-gray-11"
            {...form.register(zipFieldName)}
            value={form.watch(zipFieldName)}
          />
          <FormFieldError name="zip" />
        </FormFieldContainer>
      </Grid>
    </Flex>
  )
}

export { AddressFieldsGroup }
