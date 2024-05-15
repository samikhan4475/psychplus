'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { PatientAddress } from '@psychplus-v2/types'
import { areAddressesEqual } from '@psychplus-v2/utils'
import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import {
  EditableFieldValue,
  FieldPlaceholder,
  FormFieldContainer,
  FormFieldLabel,
  LabelAndValue,
  PlacesAutocomplete,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'
import { useGooglePlacesContext } from '@/providers'
import { addressSchema, type AddressSchemaType } from './address-schema'
import { renderAddressLabels } from './utils'

const AddressForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const homeAddress = profile.contactDetails?.addresses?.find(
    (addr) => addr.type === 'Home',
  )

  const mailingAddress = profile.contactDetails?.addresses?.find(
    (addr) => addr.type === 'Mailing',
  )

  const addressesEqual = areAddressesEqual(homeAddress, mailingAddress)

  const [mailingSameAsPrimary, setMailingSameAsPrimary] =
    useState(addressesEqual)

  const form = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      ...(homeAddress
        ? {
            primaryStreet1: homeAddress.street1,
            primaryStreet2: homeAddress.street2,
            primaryCity: homeAddress.city,
            primaryState: homeAddress.state,
            primaryPostalCode: homeAddress.postalCode,
          }
        : undefined),
      ...(mailingAddress
        ? {
            secondaryStreet1: mailingAddress.street1,
            secondaryStreet2: mailingAddress.street2,
            secondaryCity: mailingAddress.city,
            secondaryState: mailingAddress.state,
            secondaryPostalCode: mailingAddress.postalCode,
          }
        : undefined),
      primaryCountry: 'US',
      secondaryCountry: 'US',
    },
  })

  const submitAction = (data: AddressSchemaType) => {
    const primaryAddressData: PatientAddress = {
      type: 'Home',
      street1: data.primaryStreet1,
      street2: data.primaryStreet2,
      city: data.primaryCity,
      state: data.primaryState,
      postalCode: data.primaryPostalCode,
      country: 'US',
    }

    const secondaryAddressData: PatientAddress = mailingSameAsPrimary
      ? { ...primaryAddressData, type: 'Mailing' }
      : {
          type: 'Mailing',
          street1: data.secondaryStreet1,
          street2: data.secondaryStreet2,
          city: data.secondaryCity,
          state: data.secondaryState,
          postalCode: data.secondaryPostalCode,
          country: 'US',
        }

    return updateProfileAction({
      ...profile,
      contactDetails: {
        ...profile.contactDetails,
        addresses: [primaryAddressData, secondaryAddressData],
      },
    })
  }

  const addressLabel = renderAddressLabels(profile.contactDetails.addresses)

  const trigger = addressLabel ? (
    <EditableFieldValue textClassName="text-[14px]">
      {addressLabel}
    </EditableFieldValue>
  ) : (
    <FieldPlaceholder>+ add address info</FieldPlaceholder>
  )

  const onCheckedChange = (checked: boolean) => {
    setMailingSameAsPrimary(checked)
  }

  const { loaded } = useGooglePlacesContext()

  return (
    <LabelAndValue label="Address">
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
      >
        <Text trim="end" className="text-[18px] font-[600]">
          Primary Address
        </Text>
        {loaded ? <PlacesAutocomplete name="primary" autoFocus /> : null}
        <Flex direction="column">
          <Flex direction="column">
            <Text className="text-[18px] font-[600]">Mailing Address</Text>
            <FormFieldContainer className="mt-2 rounded-3 border border-gray-5 bg-gray-2 p-3">
              <Flex align="center" gap="2">
                <Checkbox
                  id="same-as-primary-checkbox"
                  size="3"
                  checked={mailingSameAsPrimary}
                  onCheckedChange={onCheckedChange}
                  highContrast
                />
                <FormFieldLabel id="same-as-primary-checkbox">
                  Same as my primary address
                </FormFieldLabel>
              </Flex>
            </FormFieldContainer>
          </Flex>
        </Flex>
        {loaded && !mailingSameAsPrimary ? (
          <PlacesAutocomplete name="secondary" />
        ) : null}
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { AddressForm }
