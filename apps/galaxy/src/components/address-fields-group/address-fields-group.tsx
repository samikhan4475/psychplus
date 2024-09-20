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
            name={'address1'}
            placeholder={'Enter Address 1'}
            prefix={prefix}
          />
        )}
        <AddressTextField
          label="Address 2"
          field={fieldName('address2', prefix)}
        />
      </Grid>
      <Grid columns="3" gap="3" className="flex-1">
        <AddressTextField
          label="City"
          field={fieldName('city', prefix)}
          required={required}
        />
        <UsStateSelect required={required} prefix={prefix} />
        <AddressTextField
          label="Zip"
          field={fieldName('zip', prefix)}
          required={required}
        />
      </Grid>
    </Flex>
  )
}

export { AddressFieldsGroup }
