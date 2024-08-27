'use client'

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { Flex, Text, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import usePlacesAutocomplete, {
  getDetails,
  type Suggestion,
} from 'use-places-autocomplete'
import { AddressForm, PlacesAutocompleteProps } from '../../types'
import {
  getAddressFromPlacesResults,
  getInitialAutocompleteValues,
} from './autocomplete-utils'

const GooglePlacesAutocomplete = ({
  name,
  autoFocus,
  required,
  callbackAddress,
  disabled = false,
  label = 'Address 1',
  isFilter,
}: PlacesAutocompleteProps) => {
  const form = useFormContext()

  const autocompleteRef = useRef<HTMLInputElement | null>(null)
  const state = form?.getFieldState('address1', form.formState)
  const values = form?.getValues()
  const [showSuggestions, setShowSuggestions] = useState(false)

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    defaultValue: getInitialAutocompleteValues({
      street1: values?.address1,
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
      form?.setValue('address1', address?.street || '')
      form?.setValue('address2', address?.street1 || '')
      form?.setValue('city', address?.city || '')
      form?.setValue('state', address?.state || '')
      form?.setValue('zip', address?.postalCode || '')
    },
    [form],
  )

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    // set form value to an empty string if the text is removed
    if (!e.target.value) {
      form?.setValue('address1', '')
    }
  }

  const handleSelect = (suggestion: Suggestion) => async () => {
    clearSuggestions()
    try {
      const response = await getDetails({ placeId: suggestion.place_id })
      const address = getAddressFromPlacesResults(response)
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

  return (
    <Flex direction="column" width="100%" gap="3">
      <Flex position="relative" direction={isFilter ? 'row' : 'column'} gap="1">
        <Text as="label" size="2" weight="bold" htmlFor={name}>
          {label} {required && <span className="text-[#FF0000]">*</span>}
        </Text>
        <TextField.Root
          size="2"
          id={name}
          disabled={disabled}
          ref={autocompleteRef}
          value={value}
          onChange={handleInput}
          onFocus={() => {
            setShowSuggestions(true)
          }}
          className="h-30 text-[12px]"
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
                  onClick={handleSelect(suggestion)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ')
                      handleSelect(suggestion)
                  }}
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

export { GooglePlacesAutocomplete }
