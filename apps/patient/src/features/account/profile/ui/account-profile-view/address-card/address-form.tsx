'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { PatientAddress, PatientProfile } from '@psychplus-v2/types'
import { areAddressesEqual } from '@psychplus-v2/utils'
import { Flex, RadioGroup, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import {
  FormFieldLabel,
  PlacesAutocomplete,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'
import { useGooglePlacesContext } from '@/providers'
import { addressSchema, AddressSchemaType } from './address-schema'

const AddressForm = ({
  isEdit,
  handleSave,
}: {
  isEdit: boolean
  handleSave: () => void
}) => {
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

    const mailingAddressData: PatientAddress = mailingSameAsPrimary
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
        addresses: [primaryAddressData, mailingAddressData],
        isMailingAddressSameAsPrimary: mailingSameAsPrimary,
      },
    })
  }

  const onCheckedChange = (checked: boolean) => {
    setMailingSameAsPrimary(checked)

    form.setValue('secondaryStreet1', form.getValues('primaryStreet1'))
    form.setValue('secondaryStreet2', form.getValues('primaryStreet2'))
    form.setValue('secondaryCity', form.getValues('primaryCity'))
    form.setValue('secondaryState', form.getValues('primaryState'))
    form.setValue('secondaryPostalCode', form.getValues('primaryPostalCode'))
  }

  const { loaded } = useGooglePlacesContext()

  const onSuccess = (data: PatientProfile) => {
    setProfile(data)
    handleSave()
  }

  return (
    <ToggleableForm
      form={form}
      submitAction={submitAction}
      onSuccess={onSuccess}
      isEdit={isEdit}
      onFormClose={handleSave}
    >
      {loaded ? (
        <PlacesAutocomplete name="primary" label="Primary" editable={!isEdit} />
      ) : null}

      <Flex align="center" mt="3" gap="3" className="col-span-2 py-4">
        <FormFieldLabel className="text-[17px]">
          Is your mailing address same as primary?
        </FormFieldLabel>

        <RadioGroup.Root
          size="3"
          color="indigo"
          disabled={!isEdit}
          highContrast
          onValueChange={(value) => {
            onCheckedChange(value === 'Yes')
          }}
          value={mailingSameAsPrimary ? 'Yes' : 'No'}
        >
          <Flex gap="3">
            <Text as="label" size="3">
              <Flex gap="1">
                <RadioGroup.Item className="text-[#151B4A]" value="Yes" />
                Yes
              </Flex>
            </Text>
            <Text as="label" size="3">
              <Flex gap="1">
                <RadioGroup.Item className="text-[#151B4A]" value="No" />
                No
              </Flex>
            </Text>
          </Flex>
        </RadioGroup.Root>
      </Flex>

      {loaded && !mailingSameAsPrimary ? (
        <PlacesAutocomplete
          name="secondary"
          label="Mailing"
          editable={!isEdit}
        />
      ) : null}
    </ToggleableForm>
  )
}

export { AddressForm }
