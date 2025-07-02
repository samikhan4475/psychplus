'use client'

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { Button, Flex, Popover, Text, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import usePlacesAutocomplete, {
  getDetails,
  type Suggestion,
} from 'use-places-autocomplete'
import { cn } from '@/utils'
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
  postalPlus4Code?: string
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
  className?: string
  labelClassName?: string
  zipFieldName: string
  address2FieldName: string
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
  className,
  labelClassName,
  zipFieldName,
  address2FieldName,
}: PlacesAutocompleteProps) => {
  const form = useFormContext()
  const autocompleteFieldRef = useRef<HTMLInputElement | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const address1Field = fieldName(name, prefix)
  const address2Field = address2FieldName
  const cityField = fieldName('city', prefix)
  const stateField = fieldName('state', prefix)
  const zipField = zipFieldName
  const zipLast4Field = fieldName('postalPlus4Code', prefix)
  const countryField = fieldName('country', prefix)
  const suggestionsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        autocompleteFieldRef.current?.contains(target) ||
        suggestionsRef.current?.contains(target)
      ) {
        return
      }

      setShowSuggestions(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const state = form?.getFieldState(address1Field, form?.formState)
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    defaultValue: getInitialAutocompleteValue({
      street1: form.watch(address1Field),
      city: form.watch(cityField),
      state: form.watch(stateField),
      postalCode: form.watch(zipField),
      postalPlus4Code: form.watch(zipLast4Field),
    }),
    requestOptions: {
      types: ['address'],
      componentRestrictions: { country: ['us'] },
    },
    debounce: 300,
  })

  useEffect(() => {
    setValue(form.watch(address1Field))
  }, [address1Field, form, setValue])

  useEffect(() => {
    if (ready && autoFocus && autocompleteFieldRef.current) {
      setTimeout(() => autocompleteFieldRef.current?.focus(), 0)
    }
  }, [ready, autoFocus])

  const setFormValues = useCallback(
    (address?: AddressForm) => {
      if (form) {
        const { street1 = '', street = '' } = address || {}
        form.setValue(address1Field, street1 || street)
        form.setValue(address2Field, address?.street2 ?? '')
        form.setValue(cityField, address?.city ?? '')
        form.setValue(stateField, address?.state ?? '')
        form.setValue(zipField, address?.postalCode ?? '')
        form.setValue(zipLast4Field, address?.postalPlus4Code ?? '')
        form.setValue(countryField, address?.country ?? '')
        form.trigger([
          address1Field,
          address2Field,
          cityField,
          stateField,
          zipField,
          zipLast4Field,
          countryField,
        ])
      }
    },
    [form, name],
  )

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    form?.setValue(address1Field, e?.target?.value)
    setValue(e.target.value)
    if (!e.target.value) {
      form?.setValue(address1Field, '')
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
        <FormFieldLabel required={required} className={labelClassName}>
          {label}
        </FormFieldLabel>
        <Popover.Root open={status === 'OK' && showSuggestions}>
          <TextField.Root
            size="1"
            id={address1Field}
            disabled={disabled}
            ref={autocompleteFieldRef}
            value={value}
            onChange={handleInput}
            placeholder={placeholder}
            onFocus={() => setShowSuggestions(true)}
            className={cn(
              'border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]',
              className,
            )}
          />
          <Popover.Trigger>
            <Flex className="-mt-2 h-0 w-full" />
          </Popover.Trigger>
          <Popover.Content
            ref={suggestionsRef}
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="flex flex-col !rounded-1 !p-0"
            size="1"
          >
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
                  radius="none"
                  tabIndex={0}
                  className="hover:!text-white !m-0 cursor-pointer flex-wrap justify-start gap-y-0 border-b border-b-gray-5 p-2 last:border-b-0 hover:bg-indigo-12"
                >
                  <Text weight="medium" size="1" align="left">
                    {main_text}
                  </Text>
                  <Text size="1" align="left">
                    {secondary_text}
                  </Text>
                </Button>
              ),
            )}
          </Popover.Content>
        </Popover.Root>

        {state?.error && (
          <Text size="1" mt="2" color="red">
            {state.error.message}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export { GooglePlacesAutocomplete }
