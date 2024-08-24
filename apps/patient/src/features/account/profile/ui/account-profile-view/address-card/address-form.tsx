'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { PatientAddress, PatientProfile } from '@psychplus-v2/types'
import { areAddressesEqual } from '@psychplus-v2/utils'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  PlacesAutocomplete,
  RadioGroupToggle,
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
      isMailingAddressSameAsPrimary:
        profile.contactDetails.isMailingAddressSameAsPrimary || false,
    },
  })

  const mailingSameAsPrimary = form.watch('isMailingAddressSameAsPrimary')

  useEffect(() => {
    if (!mailingSameAsPrimary) {
      form.register('secondaryCity')
      form.register('secondaryState')
      form.register('secondaryPostalCode')
      form.register('secondaryStreet1')
      form.register('secondaryStreet2')
    } else {
      form.unregister('secondaryCity')
      form.unregister('secondaryState')
      form.unregister('secondaryPostalCode')
      form.unregister('secondaryStreet1')
      form.unregister('secondaryStreet2')
    }
    if (form.formState.isSubmitted)
      form.trigger([
        'secondaryCity',
        'secondaryState',
        'secondaryPostalCode',
        'secondaryStreet1',
        'secondaryStreet2',
      ])
  }, [form, mailingSameAsPrimary])

  console.log(form.getValues())
  console.log(form.formState.errors)
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

    const mailingAddressData = mailingSameAsPrimary
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
        addresses: [primaryAddressData, mailingAddressData as PatientAddress],
        isMailingAddressSameAsPrimary: data.isMailingAddressSameAsPrimary,
      },
    })
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
      <FormFieldContainer>
        <Flex align="center" mt="3" gap="3" className="col-span-2 py-4">
          <FormFieldLabel className="text-[17px]">
            Is your mailing address same as primary?
          </FormFieldLabel>

          <RadioGroup.Root
            name="isMailingAddressSameAsPrimary"
            value={String(mailingSameAsPrimary)}
            onValueChange={(value) =>
              form.setValue('isMailingAddressSameAsPrimary', value === 'true')
            }
            disabled={!isEdit}
          >
            <Flex gap="2">
              {['true', 'false'].map((option) => (
                <RadioGroupToggle
                  value={mailingSameAsPrimary}
                  option={option}
                  disabled={!isEdit}
                  key={option}
                />
              ))}
            </Flex>
          </RadioGroup.Root>
        </Flex>
      </FormFieldContainer>

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
