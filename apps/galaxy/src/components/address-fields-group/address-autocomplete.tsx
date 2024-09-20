'use client'

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import usePlacesAutocomplete, {
  getDetails,
  type Suggestion,
} from 'use-places-autocomplete'
import { FormFieldLabel } from '../form'
import {
  fieldName,
  getAddressFromPlacesResult,
  getInitialAutocompleteValue,
} from './utils'

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
  callbackAddress?: (address: AddressForm | undefined) => void
  isFilter?: boolean
  placeholder?: string
  prefix?: string
}

const GooglePlacesAutocomplete = ({
  name = '',
  autoFocus = false,
  required = false,
  callbackAddress,
  disabled = false,
  label = 'Address 1',
  isFilter = false,
  placeholder = '',
  prefix = '',
}: PlacesAutocompleteProps) => {
  const form = useFormContext()
  const autocompleteFieldRef = useRef<HTMLInputElement | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const state = form?.getFieldState(
    fieldName('address1', prefix),
    form?.formState,
  )
  const values = form?.getValues()

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    defaultValue: getInitialAutocompleteValue({
      street1: values?.[fieldName('address1', prefix)],
      city: values?.[fieldName('city', prefix)],
      state: values?.[fieldName('state', prefix)],
      postalCode: values?.[fieldName('zip', prefix)],
    }),
    requestOptions: {
      types: ['address'],
      componentRestrictions: { country: ['us'] },
    },
    debounce: 300,
  })

  useEffect(() => {
    if (ready && autoFocus && autocompleteFieldRef.current) {
      setTimeout(() => autocompleteFieldRef.current?.focus(), 0)
    }
  }, [ready, autoFocus])

  const setFormValues = useCallback(
    (address?: AddressForm) => {
      if (form) {
        form.setValue(fieldName('address1', prefix), address?.street ?? '')
        form.setValue(fieldName('address2', prefix), address?.street1 ?? '')
        form.setValue(fieldName('city', prefix), address?.city ?? '')
        form.setValue(fieldName('state', prefix), address?.state ?? '')
        form.setValue(fieldName('zip', prefix), address?.postalCode ?? '')
      }
    },
    [form, name],
  )

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (!e.target.value) {
      form?.setValue(fieldName('address1', prefix), '')
    }
  }

  const handleSelect = useCallback(
    (suggestion: Suggestion) => async () => {
      clearSuggestions()
      try {
        const response = await getDetails({ placeId: suggestion.place_id })
        const address = getAddressFromPlacesResult(response)
        setFormValues(address)
        setValue(address?.street ?? '')
        setShowSuggestions(false)
        callbackAddress?.(address)
      } catch (error) {
        alert(error)
      }
    },
    [clearSuggestions, setFormValues, setValue, callbackAddress],
  )

  return (
    <Flex direction="column" width="100%" gap="3">
      <Flex
        direction={isFilter ? 'row' : 'column'}
        className="gap-[2px]"
        position="relative"
      >
        <FormFieldLabel required={required}>{label}</FormFieldLabel>
        <TextField.Root
          size="1"
          id={fieldName('address1', prefix)}
          disabled={disabled}
          ref={autocompleteFieldRef}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          onFocus={() => setShowSuggestions(true)}
          className={textFieldClassName}
        />
        {status === 'OK' && showSuggestions && (
          <ul className="bg-white absolute top-full z-50 w-full overflow-x-clip rounded-2 shadow-3">
            {data.map(
              ({
                place_id,
                structured_formatting: { main_text, secondary_text },
              }) => (
                <Button
                  key={place_id}
                  onClick={handleSelect({ place_id })}
                  variant="ghost"
                  color="gray"
                  tabIndex={0}
                  className="hover:!text-white w-full cursor-pointer justify-start border-b border-b-gray-5 px-4 py-2 last:border-b-0 hover:bg-indigo-12"
                >
                  <Text weight="medium" size="1">
                    {main_text}
                  </Text>
                  <Text size="1">{secondary_text}</Text>
                </Button>
              ),
            )}
          </ul>
        )}
        {state?.error && (
          <Text size="2" color="red">
            {state.error.message}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'

export { GooglePlacesAutocomplete }
