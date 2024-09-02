'use client'

import { useCallback, useState, type ChangeEvent } from 'react'
import { Box, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useFormContext, type FieldValues } from 'react-hook-form'
import useAlternativeAddressAutocomplete, {
  getDetails as getAddressDetails,
  type Suggestion,
} from 'use-places-autocomplete'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  getAddressFromPlacesResult,
  ZipcodeInput,
} from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'

interface AddressForm {
  street1?: string
  street2?: string
  street?: string
  streetNumber?: string
  city?: string
  postalCode?: string
}

interface AlternativeAddressAutocompleteProps {
  editable?: boolean
}

const AlternativeAddressAutocomplete = ({
  editable,
}: AlternativeAddressAutocompleteProps) => {
  const street1Field = `street1`
  const street2Field = `street2`
  const cityField = `city`
  const postalCodeField = `postalCode`

  const addressForm = useFormContext()
  const values = addressForm.getValues()
  const [isDirty, setIsDirty] = useState(false)
  const [displaySuggestions, setDisplaySuggestions] = useState(false)

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = useAlternativeAddressAutocomplete({
    defaultValue: getInitialAutocompleteValue({
      street1: values[street1Field],
      city: values[cityField],
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
      addressForm.setValue(street1Field, address?.street1)
      addressForm.trigger(street1Field)
      addressForm.setValue(street2Field, address?.street2)
      addressForm.setValue(cityField, address?.city)
      addressForm.trigger(cityField)
      addressForm.setValue(postalCodeField, address?.postalCode)
      addressForm.trigger(postalCodeField)
    },
    [addressForm, street1Field, street2Field, cityField, postalCodeField],
  )

  const outsideClickRef = useOnclickOutside(() => {
    if (!isDirty) return

    setDisplaySuggestions(false)

    if (!value) {
      addressForm.reset({ address: '' })
      addressForm.trigger('address')
    }
  })

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsDirty(true)
    addressForm.setValue(street1Field, e.target.value)
    addressForm.trigger(street1Field)
  }

  const handleSuggestionSelect = (suggestion: Suggestion) => () => {
    setValue(suggestion.description, false)
    clearSuggestions()
    setIsDirty(false)

    getAddressDetails({ placeId: suggestion.place_id })
      .then((details) => {
        const addr = getAddressFromPlacesResult(details)

        setFormValues(addr)

        if (!isCompleteAddress(addr)) {
          if (!addr?.street1 && addr?.street) {
            setFormValues({
              ...addr,
              [street1Field]: addr.street,
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
          onClick={handleSuggestionSelect(suggestion)}
          className="cursor-pointer border-b border-b-gray-5 px-4 py-2 last:border-b-0 hover:bg-gray-2"
          onKeyDown={(e) => e.stopPropagation()}
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
      <Flex ref={outsideClickRef} gap="3" className="w-full">
        <Box className="flex-1" position="relative">
          <FormFieldContainer>
            <FormFieldLabel required>Address Line 1</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...addressForm.register(street1Field)}
              value={value}
              onChange={handleInput}
              onFocus={() => {
                setDisplaySuggestions(true)
              }}
              className="text-[15px]"
              disabled={!ready || editable}
              placeholder={getPlaceholder(`address line 1`, !editable)}
            />
            <FormFieldError name={street1Field} />
          </FormFieldContainer>
          {status === 'OK' && displaySuggestions ? (
            <ul className="bg-white absolute top-full z-50 w-full rounded-2 shadow-3">
              {renderSuggestions()}
            </ul>
          ) : null}
        </Box>
        <FormFieldContainer className="flex-1">
          <FormFieldLabel>Address Line 2</FormFieldLabel>
          <TextFieldInput
            size="3"
            className="text-[15px]"
            {...addressForm.register(street2Field)}
            disabled={editable}
            placeholder={getPlaceholder(`address line 2`, !editable)}
          />
          <FormFieldError name={street2Field} />
        </FormFieldContainer>

        <FormFieldContainer className="flex-1">
          <FormFieldLabel required>City</FormFieldLabel>
          <TextFieldInput
            size="3"
            radius="full"
            {...addressForm.register(cityField)}
            disabled={editable}
            placeholder={getPlaceholder('city', !editable)}
          />
          <FormFieldError name={cityField} />
        </FormFieldContainer>
      </Flex>

      <Flex className="w-full" gap="4">
        <FormFieldContainer className="flex-1">
          <FormFieldLabel required>Zip</FormFieldLabel>
          <ZipcodeInput
            size="3"
            {...addressForm.register(postalCodeField)}
            value={addressForm.getValues(postalCodeField)}
            disabled={editable}
            placeholder={getPlaceholder('zip', !editable)}
          />
          <FormFieldError name={postalCodeField} />
        </FormFieldContainer>
      </Flex>
    </Flex>
  )
}

const getInitialAutocompleteValue = (address: FieldValues) => {
  if (!address.street1 || !address.city || !address.postalCode) {
    return undefined
  }

  return `${address.street1}, ${address.city}, ${address.postalCode}`
}

const isCompleteAddress = (address?: AddressForm) =>
  address?.street1 && address?.city && address?.postalCode

export { AlternativeAddressAutocomplete }
