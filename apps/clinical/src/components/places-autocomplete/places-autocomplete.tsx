'use client'

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { Flex, Text, TextFieldInput } from '@radix-ui/themes'
import { useFormContext, type FieldValues } from 'react-hook-form'
import usePlacesAutocomplete, {
  getDetails,
  type DetailsResult,
  type Suggestion,
} from 'use-places-autocomplete'

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
  autoFocus?: boolean
  required?: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
}

const PlacesAutocomplete = ({
  name,
  autoFocus,
  required,
  disabled = false,
  label = 'Address 1',
  placeholder='',
}: PlacesAutocompleteProps) => {
  const autocompleteRef = useRef<HTMLInputElement | null>(null)

  const street1Field = `${name}.street1`
  const street2Field = `${name}.street2`
  const cityField = `${name}.city`
  const stateField = `${name}.state`
  const postalCodeField = `${name}.postalCode`
  const countryField = `${name}.country`

  const form = useFormContext()
  const state = form.getFieldState(street1Field, form.formState)
  const values = form.getValues()
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

  useEffect(() => {
    setValue(form.watch(`${name}.street1`))
  }, [form, setValue, name])

  useEffect(() => {
    if (ready && autocompleteRef.current && autoFocus) {
      setTimeout(() => {
        autocompleteRef.current?.focus()
      }, 0)
    }
  }, [ready, autoFocus])

  const setFormValues = useCallback(
    (address?: AddressForm) => {
      form.setValue(street1Field, address?.street1?? '')
      form.setValue(street2Field, address?.street2?? '')
      form.setValue(cityField, address?.city?? '')
      form.setValue(stateField, address?.state?? '')
      form.setValue(postalCodeField, address?.postalCode?? '')
      form.setValue(countryField, address?.country?? '')
      form.clearErrors(street1Field)
      form.clearErrors(cityField)
      form.clearErrors(stateField)
      form.clearErrors(postalCodeField)  
    },
    [
      form,
      street1Field,
      street2Field,
      cityField,
      stateField,
      postalCodeField,
      countryField,
    ],
  )

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    // set form value to an empty string if the text is removed
    if (!e.target.value) {
      form.setValue(street1Field, '')
    }
  }

  const handleSelect = (suggestion: Suggestion) => () => {
    clearSuggestions()

    getDetails({ placeId: suggestion.place_id })
      .then((details) => {
        const address = getAddressFromPlacesResult(details)
        setFormValues(address)
        setValue(address?.street1 ?? '')
        setShowSuggestions(false)

        if (!isCompleteAddress(address)) {
          if (!address?.street1 && address?.street) {
            setFormValues({
              ...address,
              [street1Field]: address.street,
            })
            setValue(address?.street ?? '')
          }
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLLIElement>, suggestions: Suggestion) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSelect(suggestions)()
    }
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
          onKeyDown={(e) => handleKeyPress(e, suggestion)}
          tabIndex={0}
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
      <Flex position="relative" direction="column" gap="1">
        <Text as="label" size="2" weight="bold" htmlFor={name}>
          {label} {required && <span className="text-[#FF0000]">*</span>}
        </Text>
        <TextFieldInput
          size="3"
          id={name}
          disabled={disabled}
          ref={autocompleteRef}
          placeholder={placeholder}
          value={value}
          onChange={handleInput}
          onFocus={() => {
            setShowSuggestions(true)
          }}
          className="h-7 text-[12px]"
        />
        {status === 'OK' && showSuggestions ? (
          <ul className="bg-white absolute top-full z-50 w-full rounded-2 bg-[#FFF] shadow-3">
            {renderSuggestions()}
          </ul>
        ) : null}
        {state.error? (
          <Text size="2" color="red">
            {state.error.message}
          </Text>
        ): null}
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
            postalCode ||= component.long_name || component.short_name;
            break

          case 'country':
            country ||= component.short_name || component.long_name
            break

          case 'administrative_area_level_1':
            state ||= component.short_name || component.long_name
            break

          case 'locality':
            city ||= component.long_name || component.short_name
            break

          case 'street_number':
            streetNumber ||= component.long_name || component.short_name
            break

          case 'route':
            street ||= component.short_name || component.long_name
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

export { PlacesAutocomplete }
