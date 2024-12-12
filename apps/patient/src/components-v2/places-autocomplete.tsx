'use client'

import { useCallback, useState, type ChangeEvent } from 'react'
import { Box, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useFormContext, type FieldValues } from 'react-hook-form'
import usePlacesAutocomplete, {
  getDetails,
  type DetailsResult,
  type Suggestion,
} from 'use-places-autocomplete'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  ZipcodeInput,
} from '@/components-v2'
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

interface PlacesAutocompleteProps {
  name: string
  editable?: boolean
  label?: string
  includeState?: boolean
}

const PlacesAutocomplete = ({
  name,
  editable,
  label,
  includeState = true,
}: PlacesAutocompleteProps) => {
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

  const setFormValues = useCallback(
    (address?: AddressForm) => {
      form.setValue(street1Field, address?.street1)
      form.trigger(street1Field)
      form.setValue(street2Field, address?.street2)
      form.setValue(streetField, address?.street)
      form.setValue(streetNumberField, address?.streetNumber)
      form.setValue(cityField, address?.city)
      form.trigger(cityField)
      form.setValue(stateField, address?.state)
      form.trigger(stateField)
      form.setValue(postalCodeField, address?.postalCode)
      form.trigger(postalCodeField)
      form.setValue(countryField, address?.country)
    },
    [
      form,
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

        if (!isCompleteAddress(address)) {
          if (!address?.street1 && address?.street) {
            setFormValues({
              ...address,
              [street1Field]: address.street,
            })
          }
        }
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
          onClick={handleSelect(suggestion)}
          className="cursor-pointer border-b border-b-gray-5 px-4 py-2 last:border-b-0 hover:bg-gray-2"
        >
          <Text weight="bold" size="2">
            {main_text}
          </Text>
          &nbsp;
          <Text size="1">{secondary_text}</Text>
        </li>
      )
    })

  return (
    <Flex direction="column" width="100%" gap="3">
      <Flex ref={ref} gap="3" className="w-full">
        <Box className="flex-1" position="relative">
          <FormFieldContainer>
            <FormFieldLabel required>{label || name} Address 1</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register(street1Field)}
              value={value}
              onChange={handleInput}
              onFocus={() => {
                setShowSuggestions(true)
              }}
              className="text-[15px]"
              disabled={!ready || editable}
              placeholder={getPlaceholder(
                `${label?.toLocaleLowerCase()}Address 1`,
                !editable,
              )}
            />
            <FormFieldError name={street1Field} />
          </FormFieldContainer>
          {status === 'OK' && showSuggestions ? (
            <ul className="bg-white absolute top-full z-50 w-full rounded-2 shadow-3">
              {renderSuggestions()}
            </ul>
          ) : null}
        </Box>
        <FormFieldContainer className="flex-1">
          <FormFieldLabel>{label || name} Address 2</FormFieldLabel>
          <TextFieldInput
            size="3"
            className="text-[15px]"
            {...form.register(street2Field)}
            disabled={editable}
            placeholder={getPlaceholder(
              `${label?.toLocaleLowerCase()}Address 2`,
              !editable,
            )}
          />
          <FormFieldError name={street2Field} />
        </FormFieldContainer>
      </Flex>

      <Flex className="w-full" gap="4">
        <FormFieldContainer className="flex-1">
          <FormFieldLabel required>City</FormFieldLabel>
          <TextFieldInput
            size="3"
            radius="full"
            {...form.register(cityField)}
            disabled={true}
            placeholder={getPlaceholder('city', !editable)}
          />
          <FormFieldError name={cityField} />
        </FormFieldContainer>

        {includeState && (
          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>State</FormFieldLabel>
            <TextFieldInput
              size="3"
              radius="full"
              {...form.register(stateField)}
              disabled={true}
              placeholder={getPlaceholder('state', !editable)}
            />
            <FormFieldError name={stateField} />
          </FormFieldContainer>
        )}

        <FormFieldContainer className="flex-1">
          <FormFieldLabel required>Zip</FormFieldLabel>
          <ZipcodeInput
            size="3"
            {...form.register(postalCodeField)}
            value={form.getValues(postalCodeField)}
            disabled={true}
            placeholder={getPlaceholder('zip', !editable)}
          />
          <FormFieldError name={postalCodeField} />
        </FormFieldContainer>
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

const getAddressFromPlacesResult = (
  result: Awaited<DetailsResult>,
): AddressForm | undefined => {
  if (
    !result ||
    typeof result === 'string' ||
    !Array.isArray(result.address_components)
  ) {
    return
  }

  let street1: string | undefined
  let street: string | undefined
  let streetNumber: string | undefined
  let city: string | undefined
  let state: string | undefined
  let postalCode: string | undefined
  let country: string | undefined

  for (const component of result.address_components) {
    if (component && Array.isArray(component.types)) {
      for (const t of component.types) {
        switch (t) {
          case 'postal_code':
            if (!postalCode) {
              if (component.long_name) {
                postalCode = component.long_name
              } else if (component.short_name) {
                postalCode = component.short_name
              }
            }
            break

          case 'country':
            if (!country) {
              if (component.short_name) {
                country = component.short_name
              } else if (component.long_name) {
                country = component.long_name
              }
            }
            break

          case 'administrative_area_level_1':
            if (!state) {
              if (component.short_name) {
                state = component.short_name
              } else if (component.long_name) {
                state = component.long_name
              }
            }
            break

          case 'locality':
            if (!city) {
              if (component.long_name) {
                city = component.long_name
              } else if (component.short_name) {
                city = component.short_name
              }
            }
            break

          case 'street_number':
            if (!streetNumber) {
              if (component.long_name) {
                streetNumber = component.long_name
              } else if (component.short_name) {
                streetNumber = component.short_name
              }
            }
            break

          case 'route':
            if (!street) {
              if (component.short_name) {
                street = component.short_name
              } else if (component.long_name) {
                street = component.long_name
              }
            }
            break
        }
      }
    }
  }

  if (street && streetNumber) {
    street1 = `${streetNumber} ${street}`
  }

  return {
    street1,
    street,
    streetNumber,
    city,
    state,
    postalCode,
    country,
  }
}

const isCompleteAddress = (address?: AddressForm) =>
  address?.street1 &&
  address?.city &&
  address?.state &&
  address?.postalCode &&
  address?.country

export {
  PlacesAutocomplete,
  getInitialAutocompleteValue,
  getAddressFromPlacesResult,
  isCompleteAddress,
  type AddressForm,
}
