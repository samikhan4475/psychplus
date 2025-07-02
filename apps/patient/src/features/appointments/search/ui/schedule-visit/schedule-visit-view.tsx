'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import {
  AppointmentType,
  ProviderType,
  StorageType,
} from '@psychplus-v2/constants'
import {
  AppointmentAvailability,
  CodeWithDisplayName,
  PatientAddress,
} from '@psychplus-v2/types'
import {
  transformLocationProvidersResponse,
  zipCodeSchema,
  zipLast4Schema,
} from '@psychplus-v2/utils'
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
import { getStartOfWeek, prefetchProviders, updateStorage } from '../../utils'
import { RadioGroupInput } from '../schedule-appointment-button/radio-group-input'
import { ZipCodeStateDropdown } from '../search-appointments-view/zipcode-state-dropdown'

const schema = z.object({
  providerType: z.custom<ProviderType>(),
  appointmentType: z.custom<AppointmentType>(),
  zipCode: zipCodeSchema.optional(),
  state: z.string().optional(),
  primaryStreet1: z.string().optional(),
  primaryStreet2: z.string().optional(),
  primaryStreet: z.string().optional(),
  primaryStreetNumber: z.string().optional(),
  primaryCity: z.string().optional(),
  primaryState: z.string().optional(),
  primaryPostalCode: zipCodeSchema.optional().or(z.literal('')),
  primaryPostalPlus4Code: zipLast4Schema.optional().or(z.literal('')),
  primaryCountry: z.string().optional(),
})


type SchemaType = z.infer<typeof schema>

interface ScheduleVisitViewProps {
  googleAPIkey: string
  isSchedulingOptimizationEnabled?: boolean
}

const ScheduleVisitView = ({
  googleAPIkey,
  isSchedulingOptimizationEnabled,
}: ScheduleVisitViewProps) => {
  const router = useRouter()

  const [prefetchPromise, setPrefetchPromise] = useState<Promise<void> | null>(
    null,
  )
  const [zipStates, setZipStates] = useState<CodeWithDisplayName[]>([])

  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const updatedSchema = profile.contactDetails?.addresses
    ? schema.omit({
        primaryStreet1: true,
        primaryStreet2: true,
        primaryStreet: true,
        primaryStreetNumber: true,
        primaryCity: true,
        primaryState: true,
        primaryPostalCode: true,
        primaryPostalPlus4Code: true,
        primaryCountry: true,
      })
    : schema.omit({
      primaryStreet2: true,
      primaryStreet: true,
      primaryStreetNumber: true,
      primaryCountry: true
    })

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
      primaryPostalPlus4Code: '',
    },
  })

  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleAPIkey}`,
          )
          const data = await response.json()
          const zipCodeComponent = data.results[0]?.address_components.find(
            (component: any) => component.types.includes('postal_code'),
          )
          const zipCode = zipCodeComponent?.long_name
          if (zipCode) {
            form.setValue('zipCode', zipCode)
            getZipCodeInfoApi(zipCode)
          }
        } catch (error) {
          console.error('Error fetching ZIP code:', error)
        }
      },
      (error) => {
        switch (error.code) {
          case 1:
            console.error(
              'Error: Permission denied. Please allow location access.',
            )
            break
          case 2:
            console.error(
              'Error: Position unavailable. Check your device or network.',
            )
            break
          case 3:
            console.error('Error: Timeout. Try again later.')
            break
          default:
            console.error('Error fetching location:', error.message)
        }
      },
      { timeout: 10000 }, // Timeout of 10 seconds
    )
  }

  useEffect(() => {
    getUserLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const zipcode = form.watch('zipCode')?.trim()
    getZipCodeInfoApi(zipcode)
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
    if (!zipStates.length) return
    const stateDisplayName = zipStates[0].displayName
    setTimeout(() => {
      form.setValue('state', stateDisplayName)
    }, 1700)
    if (!isSchedulingOptimizationEnabled) return
    const promise = prefetchProviders<AppointmentAvailability[]>({
      filters: {
        providerType: form.getValues().providerType,
        appointmentType: form.getValues().appointmentType,
        zipCode: form.getValues().zipCode,
        state: stateDisplayName,
        stateCode: zipStates[0]?.code,
        startingDate: getStartOfWeek(new Date()),
      },
      transformFn: transformLocationProvidersResponse,
      storageKey: APPOINTMENTS_SEARCH_SESSION_KEY,
      storageType: StorageType.Session,
    }).then(() => void 0)

    setPrefetchPromise(promise)
  }, [zipStates, isSchedulingOptimizationEnabled])

  const onSubmit = async (data: SchemaType) => {
    if (!profile.contactDetails?.addresses) {
      const hasAddressData = data.primaryStreet1 || data.primaryCity || data.primaryState || data.primaryPostalCode;
      
      let updatedProfile = profile;
      
      if (hasAddressData) {
        const primaryAddressData: PatientAddress = {
          type: 'Home',
          street1: data.primaryStreet1 || '',
          street2: data.primaryStreet2 || '',
          city: data.primaryCity || '',
          state: data.primaryState || '',
          postalCode: data.primaryPostalCode || '',
          postalPlus4Code: data?.primaryPostalPlus4Code ?? '',
          country: 'US',
        }
        
        updatedProfile = {
          ...profile,
          contactDetails: {
            ...profile.contactDetails,
            addresses: [primaryAddressData],
          },
        };
      }

      const res = await updateProfileAction(updatedProfile)

      if (res.state === 'success') {
        setProfile(res.data)
      }
      if (res.state === 'error') {
        console.error(res.error)
        return
      }
    }

    const appointmentData = {
      providerType: data.providerType,
      appointmentType: data.appointmentType,
      zipCode: data.zipCode,
      state: data.state,
      stateCode: zipStates?.[0]?.code,
    }

    if (prefetchPromise) {
      await prefetchPromise
    } else if (isSchedulingOptimizationEnabled) {
      const providers = await prefetchProviders<AppointmentAvailability[]>({
        filters: {
          ...appointmentData,
          startingDate: getStartOfWeek(new Date()),
        },
        transformFn: transformLocationProvidersResponse,
        storageKey: APPOINTMENTS_SEARCH_SESSION_KEY,
        storageType: StorageType.Session,
      })
      if (!providers.length) {
        sessionStorage.setItem(
          APPOINTMENTS_SEARCH_SESSION_KEY,
          JSON.stringify({ state: appointmentData }),
        )
      }
    }

    await updateStorage({
      filters: {
        ...appointmentData,
        startingDate: getStartOfWeek(new Date()),
      },
      storageKey: APPOINTMENTS_SEARCH_SESSION_KEY,
      storageType: StorageType.Session,
      isCacheNeeded: isSchedulingOptimizationEnabled,
    })

    router.push(`/appointments/search`)
  }

  return (
    <ViewContainer className="flex items-center justify-center">
      <Flex direction="column" gap="4" p="4">
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
            <Flex justify="between" gap="2" className='flex-col sm:flex-row'>
              <FormFieldContainer className="xs:w-full sm:w-1/3 gap-[3px]">
                <FormFieldLabel required>Enter ZIP Code</FormFieldLabel>
                <ZipcodeInput
                  className="h-[42px] font-[400]"
                  {...form.register('zipCode')}
                  placeholder="Enter ZIP"
                  value={form.watch('zipCode')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault() // Prevent default form submission on Enter
                    }
                  }}
                />
                <FormFieldError name="zipCode" />
              </FormFieldContainer>

              <FormFieldContainer className="xs:w-full sm:w-3/4">
                <FormFieldLabel required>State of Residence</FormFieldLabel>
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
                isFieldsRequired={false}
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
