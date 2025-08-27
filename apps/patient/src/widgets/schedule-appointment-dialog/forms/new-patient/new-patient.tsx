'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { zipCodeSchema, zipLast4Schema } from '@psychplus-v2/utils'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import { registerLocale } from 'react-datepicker'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { usePubsub } from '@psychplus/utils/event'
import { clickTrack } from '@psychplus/utils/tracking'
import { SCHEDULE_APPOINTMENT_DIALOG } from '@psychplus/widgets'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/navigation'
import { StorageType } from '@psychplus-v2/constants'
import { CodeWithDisplayName } from '@psychplus-v2/types'
import enUS from 'date-fns/locale/en-US'
import { isMobile } from '@psychplus/utils/client'
import { formatDateYmd } from '@psychplus/utils/time'
import { getZipcodeInfo } from '@/actions'
import { PillToggleGroup } from '@/components-v2/pill-toggle-group'
import { PillToggleList } from '@/components-v2/pill-toggle-list'
import { enums, PSYCHPLUS_TEST_SITE_URL } from '@/constants'
import {
  SERVICE_TYPE_OPTIONS,
  VISIT_TYPE_OPTIONS,
} from '@/constants/appointment'
import { APPOINTMENTS_SEARCH_SESSION_PUBLIC_KEY } from '@/features/appointments/search/constants'
import {
  getStartOfWeek,
  prefetchProviders,
  updateStorage,
} from '@/features/appointments/search/utils'
import { StaffWithClinicsAndSlots } from '@/widgets/schedule-appointment-list/types'
import {
  getLoginRedirectUrl,
  getNormalizedAppointmentType,
  getNormalizedProviderType,
  transformStaffWithClinicsAndSlots,
} from '@/widgets/schedule-appointment-list/utils'

registerLocale('en-US', enUS)

interface NewPatientProps {
  onclose?: () => void
  mapKey: string
  patientAppUrl: string
}

interface ScheduledAppointment {
  providerType: 'Psychiatry' | 'Therapy' | 'unknown'
  appointmentType: 'In-Person' | 'Virtual' | 'unknown'
  zipCode: string
  state: string
  primaryStreet1: string
  primaryStreet2: string
  primaryStreet: string
  primaryStreetNumber: string
  primaryCity: string
  primaryState: string
  primaryPostalCode: string
  primaryPostalPlus4Code: string
  primaryCountry: string
}

interface StateOptions {
  label: string
  value: string
}

const schema = z
  .object({
    zipCode: validate.requiredString,
    state: validate.requiredString,
    primaryStreet1: z.string().optional(),
    primaryStreet2: z.string().optional(),
    primaryStreet: z.string().optional(),
    primaryStreetNumber: z.string().optional(),
    primaryCity: z.string().optional(),
    primaryState: z.string().optional(),
    primaryPostalCode: zipCodeSchema.optional(),
    primaryPostalPlus4Code: zipLast4Schema.optional(),
    primaryCountry: z.string().optional(),
  })
  .superRefine(({ zipCode }, ctx) => {
    const zipCodePattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/

    if (!zipCodePattern.test(zipCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid zip code format!',
        path: ['zipCode'],
      })
    }
  })

type SchemaType = z.infer<typeof schema>

const NewPatient = ({ mapKey, patientAppUrl }: NewPatientProps) => {
  const { publish } = usePubsub()

  const [prefetchPromise, setPrefetchPromise] = useState<Promise<void> | null>(
    null,
  )

  const router = useRouter()

  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  const [schedule, setSchedule] = useState<ScheduledAppointment>({
    providerType: 'Psychiatry',
    appointmentType: 'In-Person',
    zipCode: '',
    state: '',
    primaryStreet1: '',
    primaryStreet2: '',
    primaryStreet: '',
    primaryStreetNumber: '',
    primaryCity: '',
    primaryState: '',
    primaryPostalCode: '',
    primaryPostalPlus4Code: '',
    primaryCountry: '',
  })

  const [stateOptions, setStateOptions] = useState<StateOptions[]>([])
  const [zipStates, setZipStates] = useState<CodeWithDisplayName[]>([])

  const onScheduleChange = (key: keyof ScheduledAppointment, value: string) => {
    setSchedule((prev) => ({ ...prev, [key]: value }))
  }
  const lastZipCode = useRef<string | null>(null)

  const handleZipCodeChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const zipCode = event.target.value.slice(0, 5)

    if (lastZipCode.current === zipCode) return

    form.setValue('zipCode', zipCode)
    form.setValue('state', '')

    if (zipCode.length === 5) {
      lastZipCode.current = zipCode
      const response = await getZipcodeInfo(zipCode)
      if (response.state === 'error') {
        return
      }
      const states = response.data
      const options = states.map((state) => {
        return {
          label: state?.displayName,
          value: state?.displayName,
        }
      })

      setStateOptions(options)
      setZipStates(states)
      if (options.length) {
        const newState = options[0].value
        setTimeout(() => {
          form.setValue('state', newState)
          form.trigger('state')
        }, 1700)

        const promise = prefetchProviders<StaffWithClinicsAndSlots[]>({
          filters: {
            providerType: getNormalizedProviderType(schedule.providerType),
            appointmentType: getNormalizedAppointmentType(
              schedule.appointmentType,
            ),
            zipCode: form.getValues().zipCode,
            state: newState,
            stateCode: states[0]?.code,
            startingDate: isMobile()
              ? formatDateYmd(new Date())
              : getStartOfWeek(new Date()),
          },
          transformFn: transformStaffWithClinicsAndSlots,
          storageKey: APPOINTMENTS_SEARCH_SESSION_PUBLIC_KEY,
          storageType: StorageType.Local,
          gMapKey: mapKey,
        }).then(() => void 0)
        setPrefetchPromise(promise)
      }
    }

    if (form.formState.isSubmitted) {
      form.trigger('zipCode')
      form.trigger('state')
    }
  }

  const onLoginClick = () => {
    const mid = localStorage.getItem('mid')

    const url = mid
      ? `${getLoginRedirectUrl(patientAppUrl)}?mid=${mid}`
      : getLoginRedirectUrl(patientAppUrl)

    publish(`${SCHEDULE_APPOINTMENT_DIALOG}:existing-login`, {
      url: url,
    })

    clickTrack({
      productArea: 'Patient',
      productPageKey: 'Search Schedule Appointment',
      clickAction: 'Navigation',
      clickActionData: 'Click Existing User',
    })
  }

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    const queryString = Object.entries({
      ...schedule,
      zipCode: form.getValues().zipCode,
      state: form.getValues().state,
    })
      .map((key) => `${key[0]}=${key[1]}`)
      .join('&')

    if (prefetchPromise) {
      await prefetchPromise
    } else {
      await prefetchProviders<StaffWithClinicsAndSlots[]>({
        filters: {
          providerType: getNormalizedProviderType(schedule.providerType),
          appointmentType: getNormalizedAppointmentType(
            schedule.appointmentType,
          ),
          zipCode: form.getValues().zipCode,
          state: form.getValues().state,
          stateCode: zipStates[0]?.code,
          startingDate: isMobile()
            ? formatDateYmd(new Date())
            : getStartOfWeek(new Date()),
        },
        transformFn: transformStaffWithClinicsAndSlots,
        storageKey: APPOINTMENTS_SEARCH_SESSION_PUBLIC_KEY,
        storageType: StorageType.Local,
        gMapKey: mapKey,
        dateOfBirth: '',
      })

      await updateStorage({
        filters: {
          providerType: getNormalizedProviderType(schedule.providerType),
          appointmentType: getNormalizedAppointmentType(
            schedule.appointmentType,
          ),
          zipCode: form.getValues().zipCode,
          state: form.getValues().state,
          stateCode: zipStates[0]?.code,
          startingDate: isMobile()
            ? formatDateYmd(new Date())
            : getStartOfWeek(new Date()),
        },
        storageKey: APPOINTMENTS_SEARCH_SESSION_PUBLIC_KEY,
        storageType: StorageType.Local,
      })
    }

    clickTrack({
      productArea: 'Patient',
      productPageKey: 'Search Schedule Appointment',
      clickAction: 'Navigation',
      clickActionData: 'Clicked Search',
    })

    parent.postMessage(
      {
        event: enums.SCHEDULE_START,
        user_data: {
          state: form.getValues().primaryState,
          zip_code: form.getValues().zipCode,
        },
      },
      PSYCHPLUS_TEST_SITE_URL,
    )

    const url = `/schedule?${queryString}`

    router.push(`/widgets/schedule-appointment-list?${queryString}`)
    publish(`${SCHEDULE_APPOINTMENT_DIALOG}:appointment-search`, { url })
  }

  return (
    <>
      <Flex
        className="text-pp-blue-8 gap-4 max-md:w-full"
        direction="column"
        py="3"
        mt="3"
      >
        <Flex className="text-3 font-medium lg:text-5">Choose one</Flex>

        <PillToggleList
          options={SERVICE_TYPE_OPTIONS}
          value={schedule.providerType}
          onChange={(value) => {
            if (value) {
              onScheduleChange('providerType', value)
            }
          }}
          orientation="horizontal"
          itemClassName="lg:h-[45px]"
        />
      </Flex>
      <Flex className="gap-4 max-md:w-full" direction="column" py="3">
        <Flex className="text-3 font-medium lg:text-5">
          Virtual / In-Person
        </Flex>
        <Flex className="">
          <PillToggleGroup
            options={VISIT_TYPE_OPTIONS}
            value={schedule.appointmentType}
            onChange={(value) => {
              if (value) {
                onScheduleChange('appointmentType', value)
              }
            }}
            itemClassName="lg:h-[45px]"
          />
        </Flex>
      </Flex>
      <Form form={form} onSubmit={onSubmit}>
        <Flex className="gap-6 max-md:w-full" direction="column" py="2">
          <Flex className="flex-col sm:flex-row" gap="3">
            <Flex direction="column" className="font-regular">
              <Text className="text-2 lg:text-4" mb="2" weight="medium">
                ZIP Code <Text color="red">*</Text>
              </Text>
              <FormTextInput
                size="3"
                radius="full"
                type="number"
                label=""
                placeholder="ZIP Code"
                autoComplete="off"
                data-testid="zip-code-input"
                {...form.register('zipCode')}
                onChange={(e) => {
                  if (e.target.value.length <= 5) {
                    handleZipCodeChange(e)
                  }
                }}
                className="h-[35px] w-[200px] rounded-6 text-4 lg:h-[45px]"
                value={form.watch('zipCode')}
                maxLength={5}
              />
            </Flex>

            <Flex direction="column" className="rounded-full font-regular">
              <Text className=" text-2 lg:text-4" mb="2" weight="medium">
                Residing State <Text color="red">*</Text>
              </Text>

              <FormSelect
                size="3"
                label={''}
                required
                {...form.register('state')}
                disabled={stateOptions.length < 2}
                placeholder="Select state"
                buttonClassName="h-[35px] lg:h-[45px] w-[210px] text-4"
                options={stateOptions}
                selectProps={{ Trigger: { radius: 'full' } }}
              />
              <TextField.Root />
            </Flex>
          </Flex>
        </Flex>
        <Flex className="gap-6 max-md:w-full " direction="column" mt="5">
          <Flex gap="3" direction="row" justify={'between'}>
            <Button
              size="3"
              type="button"
              radius="full"
              variant="outline"
              className="border-indigo-500 text-pp-blue-8 h-[35px] w-[296px] cursor-pointer items-center justify-center border-4 bg-[white] px-4 lg:h-[45px]"
              onClick={onLoginClick}
            >
              <Text size="3">Existing Patient</Text>
            </Button>
            <FormSubmitButton
              size="3"
              radius="full"
              className="border-pp-blue-8 bg-pp-blue-8 h-[35px] w-[296px] cursor-pointer items-center justify-center px-4 font-bold outline-none lg:h-[45px]"
            >
              <Text size="3">Search</Text>
            </FormSubmitButton>
          </Flex>
        </Flex>
      </Form>
    </>
  )
}

export { NewPatient }
