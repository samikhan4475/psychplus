import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Box, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useFormContext } from 'react-hook-form'
import usePlacesAutocomplete, {
  getDetails,
  Suggestion,
} from 'use-places-autocomplete'
import {
  AddressForm,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  getAddressFromPlacesResult,
  getInitialAutocompleteValue,
} from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { getPlaceholder } from '@/features/account/profile/utils'

const AddressCard = () => {
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const homeAddress = profile.contactDetails?.addresses?.find(
    (addr) => addr.type === 'Home',
  )

  const mailingAddress = profile.contactDetails?.addresses?.find(
    (addr) => addr.type === 'Mailing',
  )

  const generateFields = (prefix: string) => ({
    street1Field: `${prefix}Street1`,
    street2Field: `${prefix}Street2`,
    streetField: `${prefix}Street`,
    streetNumberField: `${prefix}StreetNumber`,
    cityField: `${prefix}City`,
    stateField: `${prefix}State`,
    postalCodeField: `${prefix}PostalCode`,
    countryField: `${prefix}Country`,
  })

  const primaryFields = generateFields('primary')
  const secondaryFields = generateFields('secondary')

  const form = useFormContext()
  const values = form.getValues()
  const [isDirty, setIsDirty] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const {
    ready: primaryReady,
    value: primaryValue,
    suggestions: { data: primarySuggestions, status: primaryStatus },
    setValue: setPrimaryValue,
    clearSuggestions: clearPrimarySuggestions,
  } = usePlacesAutocomplete({
    defaultValue: getInitialAutocompleteValue({
      street1: values[primaryFields.street1Field],
      city: values[primaryFields.cityField],
      state: values[primaryFields.stateField],
      postalCode: values[primaryFields.postalCodeField],
    }),
    requestOptions: {
      types: ['address'],
      componentRestrictions: { country: ['us'] },
    },
    debounce: 300,
  })

  const {
    ready: secondaryReady,
    value: secondaryValue,
    suggestions: { data: secondarySuggestions, status: secondaryStatus },
    setValue: setSecondaryValue,
    clearSuggestions: clearSecondarySuggestions,
  } = usePlacesAutocomplete({
    defaultValue: getInitialAutocompleteValue({
      street1: values[secondaryFields.street1Field],
      city: values[secondaryFields.cityField],
      state: values[secondaryFields.stateField],
      postalCode: values[secondaryFields.postalCodeField],
    }),
    requestOptions: {
      types: ['address'],
      componentRestrictions: { country: ['us'] },
    },
    debounce: 300,
  })

  useEffect(() => {
    if (!form.watch('isMailingAddressSameAsPrimary')) {
      if (mailingAddress) {
        setSecondaryValue(
          `${mailingAddress.street1} ${mailingAddress.city}, ${mailingAddress.state} ${mailingAddress.postalCode}`,
          false,
        )
        form.setValue('secondaryStreet1', mailingAddress.street1)
        form.setValue('secondaryStreet2', mailingAddress.street2)
        form.setValue('secondaryCity', mailingAddress.city)
        form.setValue('secondaryState', mailingAddress.state)
        form.setValue('secondaryPostalCode', mailingAddress.postalCode)
      } else {
        setSecondaryValue('', false)
      }
    } else {
      setSecondaryValue(primaryValue, false)
    }
  }, [form.watch('isMailingAddressSameAsPrimary')])

  const setFormValues = useCallback(
    (type: 'primary' | 'secondary', address?: AddressForm) => {
      const fields = type === 'primary' ? primaryFields : secondaryFields

      form.setValue(fields.street1Field, address?.street1 || '')
      form.trigger(fields.street1Field)
      form.setValue(fields.street2Field, address?.street2 || '')
      form.setValue(fields.streetField, address?.street || '')
      form.setValue(fields.streetNumberField, address?.streetNumber || '')
      form.setValue(fields.cityField, address?.city || '')
      form.trigger(fields.cityField)
      form.setValue(fields.stateField, address?.state || '')
      form.trigger(fields.stateField)
      form.setValue(fields.postalCodeField, address?.postalCode || '')
      form.trigger(fields.postalCodeField)
      form.setValue(fields.countryField, address?.country || '')
    },
    [form],
  )

  useEffect(() => {
    if (homeAddress) setFormValues('primary', homeAddress)
    if (mailingAddress) setFormValues('secondary', mailingAddress)
  }, [homeAddress, mailingAddress])

  const ref = useOnclickOutside(() => {
    if (!isDirty) return

    setShowSuggestions(false)

    if (!primaryValue) {
      form.setValue(primaryFields.street1Field, '')
      form.trigger(primaryFields.street1Field)
    }

    if (!secondaryValue) {
      form.setValue(secondaryFields.street1Field, '')
      form.trigger(secondaryFields.street1Field)
    }
  })

  const handleInput =
    (type: 'primary' | 'secondary') => (e: ChangeEvent<HTMLInputElement>) => {
      const isPrimary = type === 'primary'

      if (isPrimary) {
        setPrimaryValue(e.target.value)
      } else {
        setSecondaryValue(e.target.value)
      }

      setIsDirty(true)

      const fields = isPrimary ? primaryFields : secondaryFields
      form.setValue(fields.street1Field, e.target.value)
      form.trigger(fields.street1Field)
    }

  const handleSelect =
    (type: 'primary' | 'secondary') => (suggestion: Suggestion) => {
      const isPrimary = type === 'primary'

      if (isPrimary) {
        setPrimaryValue(suggestion.description, false)
        clearPrimarySuggestions()
      } else {
        setSecondaryValue(suggestion.description, false)
        clearSecondarySuggestions()
      }

      setIsDirty(false)

      getDetails({ placeId: suggestion.place_id })
        .then((details) => {
          const address = getAddressFromPlacesResult(details)
          setFormValues(type, address)
        })
        .catch(console.error)
    }

  const renderSuggestions = ({
    suggestions,
    type,
  }: {
    suggestions: Suggestion[]
    type: 'primary' | 'secondary'
  }) =>
    suggestions.map((suggestion) => {
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
            onClick={() => handleSelect(type)(suggestion)}
            className="w-full cursor-pointer text-left hover:bg-gray-2"
          >
            <Text weight="bold" size="3">
              {main_text}
            </Text>
            &nbsp;
            <Text size="1">{secondary_text}</Text>
          </button>
        </li>
      )
    })

  return (
    <Flex
      width="100%"
      align="start"
      gap="4"
      className="bg-white mt-4 rounded-[8px] border border-gray-5 px-5 pb-9 pt-7"
      ref={ref}
    >
      <Flex direction="column" className="mb-3 flex-1">
        <Text
          className="h-[35px] text-[20px] font-medium text-black"
          mb="2"
        >
          Primary Address
        </Text>

        <Box className="flex-1" position="relative">
          <FormFieldContainer className="mb-4 w-full">
            <FormFieldLabel required>Address 1</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('primaryStreet1')}
              value={primaryValue}
              onChange={handleInput('primary')}
              onFocus={() => {
                setShowSuggestions(true)
              }}
              className="text-[15px]"
              disabled={!primaryReady}
              placeholder={getPlaceholder('primaryAddress 1')}
            />
            <FormFieldError name="primaryStreet1" />
          </FormFieldContainer>
          {primaryStatus === 'OK' && showSuggestions ? (
            <ul className="bg-white absolute top-full z-50 w-full rounded-2 shadow-3">
              {showSuggestions &&
                renderSuggestions({
                  suggestions: primarySuggestions,
                  type: 'primary',
                })}
            </ul>
          ) : null}
        </Box>

        <FormFieldContainer className="mb-4 w-full">
          <FormFieldLabel>Address 2</FormFieldLabel>
          <TextFieldInput
            {...form.register('primaryStreet2')}
            size="3"
            placeholder={getPlaceholder('primaryAddress 2')}
          />
          <FormFieldError name="primaryStreet2" />
        </FormFieldContainer>

        <Flex width="100%" gap="4">
          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>City</FormFieldLabel>
            <TextFieldInput
              {...form.register('primaryCity')}
              size="3"
              placeholder="Enter city"
              disabled
            />
            <FormFieldError name="primaryCity" />
          </FormFieldContainer>

          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>State</FormFieldLabel>
            <TextFieldInput
              {...form.register('primaryState')}
              size="3"
              placeholder="Enter state"
              disabled
            />
            <FormFieldError name="primaryState" />
          </FormFieldContainer>

          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>Zip Code</FormFieldLabel>
            <TextFieldInput
              {...form.register('primaryPostalCode')}
              size="3"
              placeholder="Enter ZIP code"
              disabled
            />
            <FormFieldError name="primaryPostalCode" />
          </FormFieldContainer>
        </Flex>
      </Flex>

      <Flex direction="column" className="flex-1">
        <Flex className="flex-1" gap="2" align="center" mb="2">
          <Text className="whitespace-nowrap text-[20px] font-medium text-[#1C2024]">
            Mailing Address
          </Text>

          <FormFieldContainer className="mr-auto flex-1">
            <Flex
              className="h-[35px] rounded-1 bg-[#f0f4ff] px-[6px]"
              align="center"
            >
              <FormFieldLabel className="whitespace-nowrap text-[12px] font-medium">
                Is your mailing address same as primary?
              </FormFieldLabel>

              <RadioGroup.Root
                name="isMailingAddressSameAsPrimary"
                value={String(form.watch('isMailingAddressSameAsPrimary'))}
                onValueChange={(value) => {
                  const isSame = value === 'true'
                  form.setValue('isMailingAddressSameAsPrimary', isSame)
                  if (isSame) {
                    setFormValues('secondary', values)
                  } else {
                    setFormValues('secondary', {})
                  }
                }}
              >
                <Flex gap="1" className="pt-1">
                  {['true', 'false'].map((option) => (
                    <>
                      <RadioGroup.Item
                        key={option}
                        className="size-[18px] rounded-full bg-white cursor-default border border-gray-6"
                        value={option}
                        id={option}
                      >
                        <RadioGroup.Indicator className="rounded-full border-1 relative flex h-full w-full items-center justify-center border-gray-4 bg-accent-11">
                          <div className="rounded-full bg-white h-1.5 w-1.5" />
                        </RadioGroup.Indicator>
                      </RadioGroup.Item>
                      <Text
                        className="leading-none text-[12px] font-medium"
                        id={option}
                      >
                        {option === 'true' ? 'Yes' : 'No'}
                      </Text>
                    </>
                  ))}
                </Flex>
              </RadioGroup.Root>
            </Flex>
            <FormFieldError name="isMailingAddressSameAsPrimary" />
          </FormFieldContainer>
        </Flex>

        <Box className="flex-1" position="relative">
          <FormFieldContainer className="mb-4 w-full">
            <FormFieldLabel required>Address 1</FormFieldLabel>
            <TextFieldInput
              {...form.register('secondaryStreet1')}
              size="3"
              value={secondaryValue}
              onChange={handleInput('secondary')}
              onFocus={() => {
                setShowSuggestions(true)
              }}
              className="text-[15px]"
              disabled={
                !secondaryReady || form.watch('isMailingAddressSameAsPrimary')
              }
              placeholder={getPlaceholder('mailingAddress 1')}
            />
            <FormFieldError name="secondaryStreet1" />
          </FormFieldContainer>
          {secondaryStatus === 'OK' && showSuggestions ? (
            <ul className="bg-white absolute top-full z-50 w-full rounded-2 shadow-3">
              {showSuggestions &&
                renderSuggestions({
                  suggestions: secondarySuggestions,
                  type: 'secondary',
                })}
            </ul>
          ) : null}
        </Box>

        <FormFieldContainer className="mb-4 w-full">
          <FormFieldLabel>Address 2</FormFieldLabel>
          <TextFieldInput
            {...form.register('secondaryStreet2')}
            size="3"
            disabled={form.watch('isMailingAddressSameAsPrimary')}
            placeholder={getPlaceholder('mailingAddress 2')}
          />
          <FormFieldError name="secondaryStreet2" />
        </FormFieldContainer>

        <Flex width="100%" gap="4">
          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>City</FormFieldLabel>
            <TextFieldInput
              {...form.register('secondaryCity')}
              size="3"
              placeholder="Enter city"
              disabled
            />
            <FormFieldError name="secondaryCity" />
          </FormFieldContainer>

          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>State</FormFieldLabel>
            <TextFieldInput
              {...form.register('secondaryState')}
              size="3"
              placeholder="Enter state"
              disabled
            />
            <FormFieldError name="secondaryState" />
          </FormFieldContainer>

          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>Zip Code</FormFieldLabel>
            <TextFieldInput
              {...form.register('secondaryPostalCode')}
              size="3"
              placeholder="Enter ZIP code"
              disabled
            />
            <FormFieldError name="secondaryPostalCode" />
          </FormFieldContainer>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AddressCard
