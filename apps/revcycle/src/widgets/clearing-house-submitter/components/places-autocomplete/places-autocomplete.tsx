import { Flex, Text, TextFieldInput, Button } from '@radix-ui/themes'
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { type FieldValues } from 'react-hook-form'
import usePlacesAutocomplete, {
  getDetails,
  type DetailsResult,
  type Suggestion,
} from 'use-places-autocomplete'
import { AddressForm, PlacesAutocompleteProps } from '../types'

const PlacesAutocomplete = ({
  name,
  autoFocus,
  required,
  form,
  callbackAddress,
  disabled = false,
  label = 'Address 1',
  isFilter,
}: PlacesAutocompleteProps) => {
  const autocompleteRef = useRef<HTMLInputElement | null>(null)

  const state = form?.getFieldState('addressLine1', form.formState)
  const values = form?.getValues()
  const [showSuggestions, setShowSuggestions] = useState(false)

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    defaultValue: getInitialAutocompleteValue({
      street1: values?.addressLine1,
      city: values?.city,
      state: values?.state,
      postalCode: values?.zip,
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
    if (ready && autocompleteRef.current && autoFocus) {
      setTimeout(() => {
        autocompleteRef.current?.focus()
      }, 0)
    }
  }, [ready, autoFocus])

  const setFormValues = useCallback(
    (address?: AddressForm) => {
      form?.setValue('addressLine1', address?.street || '')
      form?.setValue('addressLine2', address?.street2 || '')
      form?.setValue('city', address?.city || '')
      form?.setValue('state', address?.state || '')
      form?.setValue('zip', address?.postalCode || '')
    },
    [form],
  )

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (!e.target.value) {
      form?.setValue('addressLine1', '')
    }
  }

  const handleSelect = (suggestion: Suggestion) => async () => {
    clearSuggestions()

    try {
      const response = await getDetails({ placeId: suggestion.place_id })
      const address = getAddressFromPlacesResult(response)
      setFormValues(address)
      setValue(address?.street ?? '')
      setShowSuggestions(false)
      if (callbackAddress && address) {
        callbackAddress(address)
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    suggestions: Suggestion,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSelect(suggestions)()
    }
  }

  return (
    <Flex direction="column" width="100%" gap="3">
      <Flex position="relative" direction={isFilter ? 'row' : 'column'} gap="1">
        <Text as="label" size="2" weight="bold" htmlFor={name} className="pt-1">
          {label} {required && <span className="text-[#FF0000]">*</span>}
        </Text>
        <TextFieldInput
          size="3"
          id={name}
          disabled={disabled}
          ref={autocompleteRef}
          value={value}
          onChange={handleInput}
          onFocus={() => {
            setShowSuggestions(true)
          }}
          className="text-[12px]"
        />
        {status === 'OK' && showSuggestions ? (
          <ul className="bg-white absolute top-full z-50 w-full rounded-2 bg-[#FFF] shadow-3">
            {data.map((suggestion) => {
              const {
                place_id,
                structured_formatting: { main_text, secondary_text },
              } = suggestion

              return (
                <li
                  key={place_id}
                  className="border-b border-b-gray-5 last:border-b-0"
                >
                  <Button
                    onClick={handleSelect(suggestion)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) =>
                      handleKeyPress(e, suggestion)
                    }
                    tabIndex={0}
                    className="w-full cursor-pointer bg-transparent p-8 text-left text-[#000] hover:bg-gray-2"
                  >
                    <Text weight="bold" size="2">
                      {main_text}
                    </Text>
                    &nbsp;
                    <Text size="1">{secondary_text}</Text>
                  </Button>
                </li>
              )
            })}
          </ul>
        ) : null}
        {state?.error && (
          <Text size="2" color="red">
            {state.error.message}
          </Text>
        )}
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

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

const isValidResult = (result: Awaited<DetailsResult>): result is { address_components: AddressComponent[] } =>
  !!result &&
  !Array.isArray(result) &&
  Array.isArray(result.address_components);

const processComponent = (
  component: AddressComponent,
  address: Partial<AddressForm>
): void => {
  for (const type of component.types) {
    const value = component.long_name || component.short_name;
    switch (type) {
      case 'postal_code':
        address.postalCode ||= value;
        break;
      case 'country':
        address.country ||= value;
        break;
      case 'administrative_area_level_1':
        address.state ||= value;
        break;
      case 'locality':
        address.city ||= value;
        break;
      case 'street_number':
        address.streetNumber ||= value;
        break;
      case 'route':
        address.street ||= value;
        break;
    }
  }
};

const getAddressFromPlacesResult = (
  result: Awaited<DetailsResult>
): AddressForm | undefined => {
  if (!isValidResult(result)) {
    return;
  }

  const address: Partial<AddressForm> = {};

  for (const component of result.address_components) {
    processComponent(component, address);
  }

  if (address.street && address.streetNumber) {
    address.street1 = `${address.streetNumber} ${address.street}`;
  }

  return address as AddressForm;
};

export { PlacesAutocomplete }
