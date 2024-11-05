'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { PatientAddress } from '@psychplus-v2/types'
import { zipCodeSchema } from '@psychplus-v2/utils'
import { Button, Flex, Heading } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { getZipcodeInfo } from '@/actions'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
  PlacesAutocomplete,
  ViewContainer,
  ZipcodeInput,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'
import { useGooglePlacesContext } from '@/providers'
import { APPOINTMENTS_SEARCH_SESSION_KEY } from '../../constants'
import { RadioGroupInput } from '../schedule-appointment-button/radio-group-input'
import { ZipCodeStateDropdown } from '../search-appointments-view/zipcode-state-dropdown'

const schema = z.object({
  providerType: z.custom<ProviderType>(),
  appointmentType: z.custom<AppointmentType>(),
  zipCode: zipCodeSchema.optional(),
  state: z.string().trim().min(1, 'Required'),
  primaryStreet1: z.string().min(1, 'Required'),
  primaryStreet2: z.string().optional(),
  primaryStreet: z.string().optional(),
  primaryStreetNumber: z.string().optional(),
  primaryCity: z.string().min(1, 'Required'),
  primaryState: z.string().min(1, 'Required'),
  primaryPostalCode: zipCodeSchema,
  primaryCountry: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

interface StateListType {
  long_name: string
  short_name: string
  types: string[]
}

const ScheduleVisitView = () => {
  const router = useRouter()

  const [zipStates, setZipStates] = useState<StateListType[]>([])

  const profile = useProfileStore((state) => state.profile)

  const updatedSchema = profile.contactDetails?.addresses
    ? schema.omit({
        primaryStreet1: true,
        primaryStreet2: true,
        primaryStreet: true,
        primaryStreetNumber: true,
        primaryCity: true,
        primaryState: true,
        primaryPostalCode: true,
        primaryCountry: true,
      })
    : schema

  const getZipCodeInfoApi = async (zipCode: string | undefined) => {
    setZipStates([])
    if (zipCode?.length === 5) {
      const zipCodeInfo = await getZipcodeInfo(zipCode)
      if (zipCodeInfo.state === 'error') {
        return
      }
      setZipStates(zipCodeInfo.data)
    }
  }

  const { loaded } = useGooglePlacesContext()

  const form = useForm<SchemaType>({
    resolver: zodResolver(updatedSchema),
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      providerType: ProviderType.Psychiatrist,
      appointmentType: AppointmentType.Virtual,
      zipCode: '',
      state: '',
      primaryStreet1: '',
      primaryStreet2: '',
      primaryCity: '',
      primaryState: '',
      primaryPostalCode: '',
    },
  })

  useEffect(() => {
    getZipCodeInfoApi(form.watch('zipCode'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, form.watch('zipCode')])

  useEffect(() => {
    const sessionData = sessionStorage.getItem(APPOINTMENTS_SEARCH_SESSION_KEY)
    if (sessionData) {
      try {
        const { state } = JSON.parse(sessionData)
        if (state?.appointmentType) {
          form.setValue(
            'appointmentType',
            state.appointmentType as AppointmentType,
          )
        }
      } catch (error) {
        console.error('Error parsing session storage data:', error)
      }
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (zipStates.length > 0) {
      form.setValue('state', zipStates[0].long_name)
    }
  }, [zipStates])

  const onSubmit = async (data: SchemaType) => {
    if (!profile.contactDetails?.addresses) {
      const primaryAddressData: PatientAddress = {
        type: 'Home',
        street1: data.primaryStreet1,
        street2: data.primaryStreet2,
        city: data.primaryCity,
        state: data.primaryState,
        postalCode: data.primaryPostalCode,
        country: 'US',
      }
      const res = await updateProfileAction({
        ...profile,
        contactDetails: {
          ...profile.contactDetails,
          addresses: [primaryAddressData],
        },
      })
      if (res.state === 'success') {
        const appointmentData = {
          providerType: data.providerType,
          appointmentType: data.appointmentType,
          zipCode: data.zipCode,
          state: data.state,
        }
        sessionStorage.setItem(
          APPOINTMENTS_SEARCH_SESSION_KEY,
          JSON.stringify({ state: appointmentData }),
        )
        router.push(`/appointments/search`)
      }
      if (res.state === 'error') {
        console.error(res.error)
        return
      }
    } else {
      const appointmentData = {
        providerType: data.providerType,
        appointmentType: data.appointmentType,
        zipCode: data.zipCode,
        state: data.state,
      }
      sessionStorage.setItem(
        APPOINTMENTS_SEARCH_SESSION_KEY,
        JSON.stringify({ state: appointmentData }),
      )
      router.push(`/appointments/search`)
    }
  }

  return (
    <ViewContainer className="flex items-center justify-center">
      <Flex direction="column" gap="4">
        <Heading size="8">Schedule an appointment</Heading>
        <FormContainer form={form} onSubmit={onSubmit}>
          <Flex direction="column" gap="5">
            <RadioGroupInput
              title="Do you want to see a Psychiatrist or a Therapist?"
              options={[
                {
                  value: ProviderType.Psychiatrist.toString(),
                  label: 'Psychiatrist',
                  description: 'Diagnosis / Medications',
                },
                {
                  value: ProviderType.Therapist.toString(),
                  label: 'Therapist',
                  description: 'Counseling',
                },
              ]}
              value={form.watch('providerType').toString()}
              onChange={(value) => {
                form.setValue('providerType', Number(value))
              }}
            />
            <RadioGroupInput
              title="Would you like to meet In-Person or Virtually?"
              options={[
                {
                  value: AppointmentType.Virtual,
                  label: 'Virtual',
                },
                {
                  value: AppointmentType.InPerson,
                  label: 'In-Person',
                },
              ]}
              value={form.watch('appointmentType')}
              onChange={(value) => {
                form.setValue('appointmentType', value as AppointmentType)
              }}
            />
            <Flex justify="between" gap="2">
              <FormFieldContainer className="w-1/3 gap-[3px]">
                <FormFieldLabel required>Enter ZIP Code</FormFieldLabel>
                <ZipcodeInput
                  className="h-[42px] font-[400]"
                  {...form.register('zipCode')}
                  placeholder="Enter ZIP"
                  value={form.watch('zipCode')}
                />
                <FormFieldError name="zipCode" />
              </FormFieldContainer>

              <FormFieldContainer className="w-3/4">
                <FormFieldLabel required>State</FormFieldLabel>
                <ZipCodeStateDropdown
                  size="3"
                  name="state"
                  value={form.watch('state') ?? ''}
                  onValueChange={(value) => {
                    form.setValue('state', value)
                    form.trigger('state')
                  }}
                  options={zipStates}
                />
                <FormFieldError name="state" />
              </FormFieldContainer>
            </Flex>
            {!profile.contactDetails?.addresses && loaded && (
              <PlacesAutocomplete
                name="primary"
                label="Primary"
                editable={false}
              />
            )}
          </Flex>
          <Flex gap="3" justify="start" mt="7">
            <Button
              size="4"
              variant="outline"
              highContrast
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <FormSubmitButton size="4" highContrast>
              Next
            </FormSubmitButton>
          </Flex>
        </FormContainer>
      </Flex>
    </ViewContainer>
  )
}

export default ScheduleVisitView
