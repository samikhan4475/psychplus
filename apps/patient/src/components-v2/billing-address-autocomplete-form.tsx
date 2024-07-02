'use client'

import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import { Box, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useFormContext } from 'react-hook-form'
import usePlacesAutocomplete, {
  getDetails,
  Suggestion,
} from 'use-places-autocomplete'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  getAddressFromPlacesResult,
  getInitialAutocompleteValue,
  ZipcodeInput,
  type AddressForm,
} from '@/components-v2'

const BillingAddressAutocompleteForm = () => {
  const autocompleteRef = useRef<HTMLInputElement>(null)
  const form = useFormContext()
  const values = form.getValues()
  const [isDirty, setIsDirty] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const initialAutocompleteValue = getInitialAutocompleteValue({
    street1: values['address'],
    city: values['city'],
    state: values['state'],
    postalCode: values['postalCode'],
  })

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    defaultValue: initialAutocompleteValue,
    requestOptions: {
      types: ['address'],
      componentRestrictions: { country: ['us'] },
    },
    debounce: 300,
  })

  const setFormValues = useCallback(
    (address: AddressForm | undefined) => {
      form.setValue('address', address?.street1 || address?.street || '')
      form.trigger('address')
      form.setValue('city', address?.city || '')
      form.trigger('city')
      form.setValue('state', address?.state || '')
      form.trigger('state')
      form.setValue('postalCode', address?.postalCode || '')
      form.trigger('postalCode')
    },
    [form],
  )

  const ref = useOnclickOutside(() => {
    if (!isDirty) return

    setShowSuggestions(false)

    if (!value) {
      form.reset({ address: '' })
      form.trigger('address')
      return
    }
  })

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsDirty(true)
    form.setValue('address', e.target.value)
    form.trigger('address')
  }

  const handleSelect = (suggestion: Suggestion) => () => {
    setValue(suggestion.description, false)
    clearSuggestions()
    setIsDirty(false)
    getDetails({ placeId: suggestion.place_id }).then((details) => {
      const address = getAddressFromPlacesResult(details)
      setFormValues(address)
    })
  }

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLLIElement>,
    suggestions: Suggestion,
  ) => {
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
    <Flex direction="column" width="100%">
      <Flex gap="3" direction="column">
        <Flex ref={ref} className="w-full">
          <Box position="relative" className="w-full">
            <FormFieldContainer className="w-full">
              <FormFieldLabel required>Address 1</FormFieldLabel>
              <TextFieldInput
                size="3"
                ref={autocompleteRef}
                value={value}
                radius="full"
                placeholder="Enter Complete Address..."
                onChange={handleInput}
                onFocus={() => setShowSuggestions(true)}
                disabled={!ready}
              />
              <FormFieldError name="address" />
            </FormFieldContainer>
            {status === 'OK' && showSuggestions && (
              <ul className="bg-white absolute top-full z-50 w-full rounded-2 shadow-3">
                {renderSuggestions()}
              </ul>
            )}
          </Box>
        </Flex>

        <Flex className="w-full" gap="4">
          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>Zip Code</FormFieldLabel>
            <ZipcodeInput
              size="3"
              placeholder="Zip"
              {...form.register('postalCode')}
              value={form.watch('postalCode')}
            />
            <FormFieldError name="postalCode" />
          </FormFieldContainer>
          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>City</FormFieldLabel>
            <TextFieldInput
              size="3"
              radius="full"
              {...form.register('city')}
              placeholder="City"
            />
            <FormFieldError name="city" />
          </FormFieldContainer>
          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>State</FormFieldLabel>
            <CodesetFormSelect
              size="3"
              name="state"
              codeset={CODESETS.UsStates}
            />
            <FormFieldError name="state" />
          </FormFieldContainer>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { BillingAddressAutocompleteForm }
