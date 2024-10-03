'use client'

import { Flex, FlexProps, Grid, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useGooglePlacesContext } from '@/providers/google-places-provider'
import { cn } from '@/utils'
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
  fieldClassName?: string
  fieldLabelClassName?: string
}
const AddressFieldsGroup = ({
  title,
  columnsPerRow = '2',
  required = true,
  className,
  prefix,
  direction = 'column',
  fieldClassName,
  fieldLabelClassName,
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
            className={fieldClassName}
            labelClassName={fieldLabelClassName}
          />
        )}
        <AddressTextField
          label="Address 2"
          field={fieldName('address2', prefix)}
          placeholder="Enter Address 2"
          className={fieldClassName}
          labelClassName={fieldLabelClassName}
        />
      </Grid>
      <Grid columns="3" gap="3" className="flex-1">
        <AddressTextField
          label="City"
          field={fieldName('city', prefix)}
          placeholder="Enter City"
          required={required}
          className={fieldClassName}
          labelClassName={fieldLabelClassName}
        />
        <UsStateSelect
          required={required}
          prefix={prefix}
          className={fieldClassName}
          labelClassName={fieldLabelClassName}
        />

        <FormFieldContainer className="flex-1">
          <FormFieldLabel required className={fieldLabelClassName}>
            Zip Code
          </FormFieldLabel>
          <ZipcodeInput
            size="1"
            placeholder="Enter Zip"
            className={cn(
              'border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] data-[disabled]:bg-gray-3 data-[disabled]:text-gray-11',
              fieldClassName,
            )}
            {...form.register(zipFieldName, {
              onChange: () => form.trigger(zipFieldName),
            })}
            value={form.watch(zipFieldName)}
          />
          <FormFieldError name="zip" />
        </FormFieldContainer>
      </Grid>
    </Flex>
  )
}

export { AddressFieldsGroup }
