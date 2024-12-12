'use client'

import { useCallback, useState, type ChangeEvent } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useFormContext, type FieldValues } from 'react-hook-form'
import usePlacesAutocomplete, {
  getDetails,
  type DetailsResult,
  type Suggestion,
} from 'use-places-autocomplete'
import { FormTextInput } from '@psychplus/form'
import { FormFieldContainer, FormFieldLabel } from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'

interface AddressForm {
  street1?: string
  street2?: string
  street?: string
  streetNumber?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
}

interface WebPlacesAutocompleteProps {
  name: string
  editable?: boolean
  label?: string
  includeState?: boolean
}

const FormField = ({
  name,
  label,
  required = false,
  disabled = false,
  value,
  onChange,
  placeholder,
  onFocus,
}: {
  name: string
  label: string
  required?: boolean
  disabled?: boolean
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  onFocus?: () => void
}) => (
  <FormFieldContainer>
    <FormFieldLabel required={required}>{label}</FormFieldLabel>
    <FormTextInput
      name={name}
      label=""
      size="3"
      radius="full"
      onFocus={onFocus}
      {...(onChange ? { onChange } : {})}
      {...(value ? { value } : {})}
      disabled={disabled}
      placeholder={placeholder}
      className="text-[15px]"
    />
  </FormFieldContainer>
)

const WebPlacesAutocomplete = ({
  name,
  editable,
  label,
  includeState = true,
}: WebPlacesAutocompleteProps) => {
  const street1Field = `${name}Street1`
  const street2Field = `${name}Street2`
  const streetField = `${name}Street`
  const streetNumberField = `${name}StreetNumber`
  const cityField = `${name}City`
  const stateField = `${name}State`
  const postalCodeField = `${name}PostalCode`
  const countryField = `${name}Country`

  const form = useFormContext()
  const values = form.getValues()
  const [isDirty, setIsDirty] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    defaultValue: getInitialAutocompleteValue({
      street1: values[street1Field],
      city: values[cityField],
      state: values[stateField],
      postalCode: values[postalCodeField],
    }),
    requestOptions: {
      types: ['address'],
      componentRestrictions: {
        country: ['us'],
      },
    },
    debounce: 300,
  })

  const updateAndTriggerFields = (
    fields: string[],
    values: Record<string, string | undefined>,
  ) => {
    fields.forEach((field) => {
      form.setValue(field, values[field])
      form.trigger(field)
    })
  }

  const setFormValues = useCallback(
    (address?: AddressForm) => {
      const fields = [
        street1Field,
        street2Field,
        streetField,
        streetNumberField,
        cityField,
        stateField,
        postalCodeField,
        countryField,
      ]
      updateAndTriggerFields(fields, {
        [street1Field]: address?.street1,
        [street2Field]: address?.street2,
        [streetField]: address?.street,
        [streetNumberField]: address?.streetNumber,
        [cityField]: address?.city,
        [stateField]: address?.state,
        [postalCodeField]: address?.postalCode,
        [countryField]: address?.country,
      })
    },
    [
      street1Field,
      street2Field,
      streetField,
      streetNumberField,
      cityField,
      stateField,
      postalCodeField,
      countryField,
    ],
  )

  const ref = useOnclickOutside(() => {
    if (!isDirty) return

    setShowSuggestions(false)

    if (!value) {
      form.setValue(street1Field, '')
      form.trigger(street1Field)
      return
    }
  })

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsDirty(true)
    form.setValue(street1Field, e.target.value)
    form.trigger(street1Field)
  }

  const handleSelect = (suggestion: Suggestion) => () => {
    setValue(suggestion.description, false)
    clearSuggestions()
    setIsDirty(false)

    getDetails({ placeId: suggestion.place_id })
      .then((details) => {
        const address = getAddressFromPlacesResult(details)
        setFormValues(address)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li
          key={place_id}
          className="border-b border-b-gray-5 px-4 py-2 last:border-b-0"
        >
          <button
            type="button"
            onClick={handleSelect(suggestion)}
            className="w-full cursor-pointer text-left hover:bg-gray-2"
          >
            <Text weight="bold" size="2">
              {main_text}
            </Text>
            &nbsp;
            <Text size="1">{secondary_text}</Text>
          </button>
        </li>
      )
    })

  return (
    <Flex direction="column" width="100%" gap="3">
      <Flex ref={ref} gap="3" className="w-full">
        <Box className="w-full" position="relative">
          <FormField
            name={street1Field}
            label={`${label || name} Address 1`}
            required
            onFocus={() => {
              setShowSuggestions(true)
            }}
            value={value}
            onChange={handleInput}
            disabled={!ready || editable}
            placeholder={getPlaceholder(
              `${label?.toLocaleLowerCase()}Address 1`,
              !editable,
            )}
          />
          {status === 'OK' && showSuggestions ? (
            <ul className="bg-white absolute top-full z-50 w-full rounded-2 shadow-3">
              {renderSuggestions()}
            </ul>
          ) : null}
        </Box>
        <Box className="w-full">
          <FormField
            name={street2Field}
            label={`${label || name} Address 2`}
            disabled={editable}
            value={form.getValues(street2Field)}
            placeholder={getPlaceholder(
              `${label?.toLocaleLowerCase()}Address 2`,
              !editable,
            )}
          />
        </Box>
      </Flex>

      <Flex className="w-full" gap="4">
        <FormField
          name={cityField}
          label="City"
          value={form.getValues(cityField)}
          required
          disabled
          placeholder={getPlaceholder('city', !editable)}
        />
        {includeState && (
          <FormField
            name={stateField}
            label="State"
            value={form.getValues(stateField)}
            required
            disabled
            placeholder={getPlaceholder('state', !editable)}
          />
        )}
        <FormField
          name={postalCodeField}
          label="Zip"
          required
          disabled
          value={form.getValues(postalCodeField)}
          placeholder={getPlaceholder('zip', !editable)}
        />
      </Flex>
    </Flex>
  )
}

const getInitialAutocompleteValue = (address: FieldValues) => {
  if (
    !address.street1 ||
    !address.city ||
    !address.state ||
    !address.postalCode
  ) {
    return undefined
  }

  return `${address.street1}, ${address.city}, ${address.state} ${address.postalCode}`
}

const getComponentValue = (
  components: google.maps.GeocoderAddressComponent[],
  type: string,
): string | undefined => {
  const component = components.find((comp) => comp.types.includes(type))
  return component?.long_name || component?.short_name
}

const parseAddressComponents = (
  components: google.maps.GeocoderAddressComponent[],
): AddressForm => ({
  street1:
    getComponentValue(components, 'street_number') &&
    getComponentValue(components, 'route')
      ? `${getComponentValue(components, 'street_number')} ${getComponentValue(
          components,
          'route',
        )}`
      : undefined,
  street: getComponentValue(components, 'route'),
  streetNumber: getComponentValue(components, 'street_number'),
  city: getComponentValue(components, 'locality'),
  state: getComponentValue(components, 'administrative_area_level_1'),
  postalCode: getComponentValue(components, 'postal_code'),
  country: getComponentValue(components, 'country'),
})

const getAddressFromPlacesResult = (
  result: Awaited<DetailsResult>,
): AddressForm | undefined => {
  if (
    !result ||
    typeof result === 'string' ||
    !Array.isArray(result.address_components)
  ) {
    return undefined
  }
  return parseAddressComponents(result.address_components)
}

const isCompleteAddress = (address?: AddressForm) =>
  Boolean(
    address?.street1 &&
      address.city &&
      address.state &&
      address.postalCode &&
      address.country,
  )

export default WebPlacesAutocomplete
