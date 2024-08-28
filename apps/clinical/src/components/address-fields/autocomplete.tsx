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
import {
  getAddressFromPlacesResult,
  getInitialAutocompleteValue,
} from '../places-autocomplete'

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
}
const GooglePlacesAutocomplete = ({
  name,
  autoFocus,
  required,
  callbackAddress,
  disabled = false,
  label = 'Address 1',
  isFilter,
  placeholder,
}: PlacesAutocompleteProps) => {
  const form = useFormContext()

  const autocompleteFieldRef = useRef<HTMLInputElement | null>(null)
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
    defaultValue: getInitialAutocompleteValue({
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
    if (ready && autocompleteFieldRef.current && autoFocus) {
      setTimeout(() => {
        autocompleteFieldRef.current?.focus()
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

  return (
    <Flex direction="column" width="100%" gap="3">
      <Flex position="relative" direction={isFilter ? 'row' : 'column'} gap="1">
        <Text as="label" size="1" weight="bold" htmlFor={name} className="pt-1">
          {label} {required && <span className="text-[#FF0000]">*</span>}
        </Text>
        <TextField.Root
          size="2"
          id={name}
          disabled={disabled}
          ref={autocompleteFieldRef}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          onFocus={() => {
            setShowSuggestions(true)
          }}
          className="text-[12px]"
        />
        {status === 'OK' && showSuggestions ? (
          <ul className="bg-white absolute top-full z-50 w-full rounded-2 bg-[#FFF] shadow-3">
            {data.map((item) => {
              const {
                place_id,
                structured_formatting: { main_text, secondary_text },
              } = item

              return (
                <Button
                  key={place_id}
                  onClick={handleSelect(item)}
                  variant="ghost"
                  color="gray"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleSelect(item)
                  }}
                  tabIndex={0}
                  className="w-full cursor-pointer justify-start border-b border-b-gray-5 px-4 py-2 last:border-b-0 hover:bg-gray-2"
                >
                  <Text weight="bold" size="2">
                    {main_text}
                  </Text>

                  <Text size="1">{secondary_text}</Text>
                </Button>
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
