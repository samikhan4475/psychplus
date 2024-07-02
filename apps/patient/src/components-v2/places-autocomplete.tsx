'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import { Box, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useFormContext, type FieldValues } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import usePlacesAutocomplete, {
  getDetails,
  type DetailsResult,
  type Suggestion,
} from 'use-places-autocomplete'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'

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
}

const PlacesAutocomplete = ({ name, autoFocus }: PlacesAutocompleteProps) => {
  const autocompleteRef = useRef<HTMLInputElement | null>(null)

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
  const [showManualEntryHint, setShowManualEntryHint] = useState(false)
  const [manualEntryMode, setManualEntryMode] = useState(false)

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
    if (ready && autocompleteRef.current && autoFocus) {
      setTimeout(() => {
        autocompleteRef.current?.focus()
      }, 0)
    }
  }, [ready, autoFocus])

  const setFormValues = useCallback(
    (address?: AddressForm) => {
      form.setValue(street1Field, address?.street1)
      form.setValue(street2Field, address?.street2)
      form.setValue(streetField, address?.street)
      form.setValue(streetNumberField, address?.streetNumber)
      form.setValue(cityField, address?.city)
      form.setValue(stateField, address?.state)
      form.setValue(postalCodeField, address?.postalCode)
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
    if (manualEntryMode || !isDirty) {
      return
    }

    setShowSuggestions(false)

    // If user has not entered a value, do nothing.
    if (!value) {
      return
    }

    // If address is complete and user has not modified input after
    // selection, do nothing.
    if (!isDirty && isCompleteAddress(form.getValues())) {
      return
    }

    // If there are no suggestions or there is more than 1 suggestion,
    // then we cannot reliably set an address value; show the manual
    // entry hint.
    if (data.length === 0 || data.length > 1) {
      setShowManualEntryHint(true)
      setFormValues(undefined)
      return
    }

    // There is only 1 suggestion, use that to retrieve details
    // and attempt to set address using the result.
    getDetails({ placeId: data[0].place_id }).then((result) => {
      const address = getAddressFromPlacesResult(result)

      setFormValues(address)

      if (isCompleteAddress(address)) {
        setValue(data[0].description)
        setShowManualEntryHint(false)
      } else {
        if (!address?.street1 && address?.street) {
          setFormValues({
            ...address,
            [street1Field]: address.street,
          })
        }

        setShowManualEntryHint(true)
      }
    })
  })

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsDirty(true)
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

          setShowManualEntryHint(true)
        } else {
          setShowManualEntryHint(false)
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

  const manualEntryHint =
    showManualEntryHint && !manualEntryMode ? (
      <Flex align="center" gap="1">
        <Text className="text-[14px] text-tomato-11">Having trouble?</Text>
        <Text
          className="cursor-pointer text-[14px] text-accent-12 hover:underline"
          onClick={() => {
            form.clearErrors()
            setManualEntryMode(true)
          }}
        >
          Enter address manually
        </Text>
      </Flex>
    ) : null

  const { ref: postalCodeRef, ...postalCodeProps } =
    form.register(postalCodeField)

  return (
    <Flex direction="column" width="100%" gap="3">
      {!manualEntryMode ? (
        <Flex ref={ref} direction="column" gap="1">
          <Box position="relative">
            <FormFieldContainer>
              <FormFieldLabel>Address</FormFieldLabel>
              <TextFieldInput
                size="3"
                ref={autocompleteRef}
                value={value}
                onChange={handleInput}
                onFocus={() => {
                  setShowSuggestions(true)
                }}
                disabled={!ready}
                placeholder="Enter a location"
                className="text-[15px]"
              />
            </FormFieldContainer>
            {status === 'OK' && showSuggestions ? (
              <ul className="bg-white absolute top-full z-50 w-full rounded-2 shadow-3">
                {renderSuggestions()}
              </ul>
            ) : null}
          </Box>
          {manualEntryHint}
        </Flex>
      ) : null}
      {manualEntryMode ? (
        <FormFieldContainer>
          <FormFieldLabel>Address Line 1</FormFieldLabel>
          <TextFieldInput
            size="3"
            placeholder="Address Line 1"
            className="text-[15px]"
            {...form.register(street1Field)}
          />
          <FormFieldError name={street1Field} />
        </FormFieldContainer>
      ) : null}
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Address Line 2</FormFieldLabel>
        <TextFieldInput
          size="3"
          placeholder="Apt, Suite, Floor"
          className="text-[15px]"
          {...form.register(street2Field)}
        />
        <FormFieldError name={street2Field} />
      </FormFieldContainer>
      {manualEntryMode ? (
        <FormFieldContainer>
          <FormFieldLabel>City</FormFieldLabel>
          <TextFieldInput
            size="3"
            placeholder="City"
            className="text-[15px]"
            {...form.register(cityField)}
          />
          <FormFieldError name={cityField} />
        </FormFieldContainer>
      ) : null}
      {manualEntryMode ? (
        <Flex gap="4">
          <FormFieldContainer>
            <FormFieldLabel>State</FormFieldLabel>
            <CodesetFormSelect
              size="3"
              name={stateField}
              codeset={CODESETS.UsStates}
            />
            <FormFieldError name={stateField} />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel>Zip</FormFieldLabel>
            <PatternFormat
              size="3"
              type="text"
              inputMode="numeric"
              format="#####"
              placeholder="Zip"
              className="text-[15px]"
              customInput={TextFieldInput}
              getInputRef={postalCodeRef}
              {...postalCodeProps}
              value={form.getValues(postalCodeField)}
            />
            <FormFieldError name={postalCodeField} />
          </FormFieldContainer>
        </Flex>
      ) : null}
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
