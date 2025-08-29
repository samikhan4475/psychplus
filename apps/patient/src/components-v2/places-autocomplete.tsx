'use client'

import { useCallback, useState, type ChangeEvent } from 'react'
import { cn } from '@psychplus-v2/utils'
import { Box, Flex, Responsive, Text, TextFieldInput } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import {
  useFormContext,
  UseFormReturn,
  type FieldValues,
} from 'react-hook-form'
import usePlacesAutocomplete, {
  getDetails,
  type DetailsResult,
  type Suggestion,
} from 'use-places-autocomplete'
import { FormTextInput } from '@psychplus/form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  ZipcodeInput,
  ZipLast4Input,
} from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'

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
  editable?: boolean
  label?: string
  includeState?: boolean
  direction?: Responsive<'column' | 'row' | 'row-reverse' | 'column-reverse'>
  className?: string
  containerClassName?: string
  isSelfScheduling?: boolean
  isFieldsRequired?: boolean
  showPostal?:boolean
  isCall?: boolean
}

const PlacesAutocomplete = ({
  name,
  editable,
  label,
  includeState = true,
  direction = 'column',
  className,
  containerClassName,
  isSelfScheduling = false,
  isFieldsRequired = true,
  showPostal = true,
  isCall = false
}: PlacesAutocompleteProps) => {
  const street1Field = `${name}Street1`
  const street2Field = `${name}Street2`
  const streetField = `${name}Street`
  const streetNumberField = `${name}StreetNumber`
  const cityField = `${name}City`
  const stateField = `${name}State`
  const postalCodeField = `${name}PostalCode`
  const zipLast4Field = `${name}PostalPlus4Code`
  const countryField = `${name}Country`

  const form = useFormContext()
  const values = form.getValues()
  const [isDirty, setIsDirty] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const required = !isSelfScheduling && isFieldsRequired

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

  const InputComponent = isSelfScheduling ? FormTextInput : TextFieldInput
  const ZipCodeInputComponent = isSelfScheduling ? FormTextInput : ZipcodeInput

  const setFormValues = useCallback(
    (address?: AddressForm) => {
      form.setValue(street1Field, address?.street1)
      form.trigger(street1Field)
      form.setValue(street2Field, address?.street2)
      form.setValue(streetField, address?.street)
      form.setValue(streetNumberField, address?.streetNumber)
      form.setValue(cityField, address?.city)
      form.trigger(cityField)
      form.setValue(stateField, address?.state)
      form.trigger(stateField)
      form.setValue(postalCodeField, address?.postalCode)
      form.trigger(postalCodeField)
      form.setValue(zipLast4Field, address?.postalPlus4Code ?? '')
      form.trigger(zipLast4Field)
      form.setValue(countryField, address?.country)
      form.trigger(countryField)
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
      zipLast4Field,
      countryField,
    ],
  )

  const ref = useOnclickOutside(() => {
    if (!isDirty) return

    setShowSuggestions(false)

    if (!value) {
      form.setValue(street1Field, '')
      form.trigger(street1Field)
      return
    }
  })

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsDirty(true)
    form.setValue(street1Field, e.target.value)
    form.trigger(street1Field)
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
          className="px-4 py-2 border-b cursor-pointer border-b-gray-5 last:border-b-0 hover:bg-gray-2"
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
    <Flex
      direction="column"
      width="100%"
      gap="3"
      className={containerClassName}
    >
      <Flex
        ref={ref}
        gap="3"
        direction={{ initial: 'column', sm: isCall ? "column" : 'row' }}
        className={cn('w-full')}
      >
        <Box className="flex-1" position="relative">
          <FormFieldContainer>
            <FormFieldLabel required={required}>
              {!isCall && label} Address 1
            </FormFieldLabel>
            <InputComponent
              label=""
              size={{ initial: '2', sm: '3' }}
              {...form.register(street1Field)}
              onChange={handleInput}
              onFocus={() => {
                setShowSuggestions(true)
              }}
              className={cn('text-[13px] sm:text-[14px]', className)}
              disabled={!ready || editable}
              placeholder={getPlaceholder(
                `${label?.toLocaleLowerCase() ?? ''}Address 1`,
                !editable,
              )}
            />
            {required && <FormFieldError name={street1Field} />}
          </FormFieldContainer>
          {status === 'OK' && showSuggestions ? (
            <ul className="absolute top-full z-50 w-full bg-white rounded-2 shadow-3">
              {renderSuggestions()}
            </ul>
          ) : null}
        </Box>
        <FormFieldContainer className="flex-1">
          <FormFieldLabel>{!isCall && label} Address 2</FormFieldLabel>
          <InputComponent
            label=""
            size={{ initial: '2', sm: '3' }}
            className={cn('text-[13px] sm:text-[14px]', className)}
            {...form.register(street2Field)}
            disabled={editable}
            placeholder={getPlaceholder(
              `${label?.toLocaleLowerCase() ?? ''}Address 2`,
              !editable,
            )}
          />
          {!isSelfScheduling && <FormFieldError name={street2Field} />}
        </FormFieldContainer>
      </Flex>

      <Flex className="w-full" gap="4">
        <FormFieldContainer className="flex-1">
          <FormFieldLabel required={required}>City</FormFieldLabel>
          <InputComponent
            label=""
            size={{ initial: '2', sm: '3' }}
            className={cn('text-[13px] sm:text-[14px]', className)}
            {...form.register(cityField)}
            disabled={true}
            placeholder={getPlaceholder('city', !editable)}
          />
          {required && <FormFieldError name={cityField} />}
        </FormFieldContainer>

        {includeState && (
          <FormFieldContainer className="flex-1">
            <FormFieldLabel required={required}>State</FormFieldLabel>
            <InputComponent
              label=""
              size={{ initial: '2', sm: '3' }}
              className={cn('text-[13px] sm:text-[14px]', className)}
              {...form.register(stateField)}
              disabled={true}
              placeholder={getPlaceholder('state', !editable)}
            />
            {required && <FormFieldError name={stateField} />}
          </FormFieldContainer>
        )}

        <FormFieldContainer className="flex-1">
          <FormFieldLabel required={required}>Zip</FormFieldLabel>
          <ZipCodeInputComponent
            label=""
            size={{ initial: '2', sm: '3' }}
            {...form.register(postalCodeField)}
            value={form.getValues(postalCodeField)}
            disabled={true}
            placeholder={getPlaceholder('zip', !editable)}
            className={cn('text-[13px] sm:text-[14px]', className)}
          />
          {required && <FormFieldError name={postalCodeField} />}
        </FormFieldContainer>
        {!includeState && showPostal &&
          renderZipLast4Field(
            form,
            zipLast4Field,
            !editable,
            isSelfScheduling,
            className,
            required,
          )}
      </Flex>
      {includeState && showPostal && (
        <Flex className="w-full">
          {renderZipLast4Field(
            form,
            zipLast4Field,
            !editable,
            isSelfScheduling,
            className,
          )}
        </Flex>
      )}
    </Flex>
  )
}

const getInitialAutocompleteValue = (
  address: FieldValues,
  includeState?: boolean,
) => {
  const { street1, city, state, postalCode, postalPlus4Code } = address
  if (!street1 || !city || !postalCode || (includeState && !state)) {
    return undefined
  }
  const parts = [street1, city]
  if (includeState) parts.push(state)
  parts.push(postalCode)
  if (postalPlus4Code) parts.push(postalPlus4Code)
  return parts.join(', ')
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
  let postalPlus4Code: string | undefined
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
          case 'postal_code_suffix':
            if (!postalPlus4Code) {
              if (component.long_name) {
                postalPlus4Code = component.long_name
              } else if (component.short_name) {
                postalPlus4Code = component.short_name
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
    postalPlus4Code,
    country,
  }
}

const renderZipLast4Field = (
  form: UseFormReturn,
  zipLast4Field: string,
  editable: boolean,
  isSelfScheduling: boolean,
  className?: string,
  required?: boolean,
) => {
  const ZipLast4InputComponent = isSelfScheduling
    ? FormTextInput
    : ZipLast4Input

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Postal+4</FormFieldLabel>
      <ZipLast4InputComponent
        label=""
        size={{ initial: '2', sm: '3' }}
        className={cn('text-[13px] sm:text-[14px]', className)}
        {...form.register(zipLast4Field)}
        value={form.getValues(zipLast4Field)}
        disabled
        placeholder={getPlaceholder('areaCode', editable)}
      />
      {required && <FormFieldError name={zipLast4Field} />}
    </FormFieldContainer>
  )
}

const isCompleteAddress = (address?: AddressForm) =>
  address?.street1 &&
  address?.city &&
  address?.state &&
  address?.postalCode &&
  address?.country

export {
  getAddressFromPlacesResult,
  getInitialAutocompleteValue,
  isCompleteAddress,
  PlacesAutocomplete,
  type AddressForm,
}
