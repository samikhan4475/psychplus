'use client'

import { Flex, FlexProps, Grid, Text } from '@radix-ui/themes'
import { useGooglePlacesContext } from '@/providers/google-places-provider'
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
  addressFieldName?: string
  disabled?: boolean
  isFilter?: boolean
  fieldContainerClassName?: string
  stateFieldContainerClassName?: string
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
  addressFieldName,
  disabled,
  isFilter = false,
  fieldContainerClassName,
  stateFieldContainerClassName,
}: AddressProps) => {
  const { loaded } = useGooglePlacesContext()

  const zipFieldName = fieldName(
    addressFieldName ? 'postalCode' : 'zip',
    prefix,
  )
  const address2FieldName = fieldName(
    addressFieldName ? 'street2' : 'address2',
    prefix,
  )

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
            disabled={disabled}
            required={required}
            name={addressFieldName ?? 'address1'}
            zipFieldName={zipFieldName}
            address2FieldName={address2FieldName}
            placeholder="Enter Address 1"
            prefix={prefix}
            className={fieldClassName}
            labelClassName={fieldLabelClassName}
            isFilter={isFilter}
          />
        )}
        <AddressTextField
          label="Address 2"
          field={address2FieldName}
          placeholder="Enter Address 2"
          className={fieldClassName}
          disabled={disabled}
          labelClassName={fieldLabelClassName}
          fieldContainerClassName={fieldContainerClassName}
        />
      </Grid>
      <Grid columns="3" gap="3" className="flex-1">
        <AddressTextField
          label="City"
          field={fieldName('city', prefix)}
          placeholder="Enter City"
          required={required}
          disabled={disabled}
          className={fieldClassName}
          labelClassName={fieldLabelClassName}
          fieldContainerClassName={fieldContainerClassName}
        />
        <UsStateSelect
          required={required}
          prefix={prefix}
          className={fieldClassName}
          disabled={disabled}
          labelClassName={fieldLabelClassName}
          fieldContainerClassName={fieldContainerClassName}
          stateFieldContainerClassName={stateFieldContainerClassName}
        />

        <AddressTextField
          label="Zip"
          field={zipFieldName}
          placeholder="Zip"
          type="number"
          maxLength={5}
          required={required}
          disabled={disabled}
          className={fieldClassName}
          labelClassName={fieldLabelClassName}
          fieldContainerClassName={fieldContainerClassName}
        />
      </Grid>
    </Flex>
  )
}

export { AddressFieldsGroup }
