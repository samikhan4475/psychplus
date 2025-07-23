'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { cn, zipCodeSchema, zipLast4Schema } from '@psychplus-v2/utils'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import DatePicker from 'react-datepicker'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { usePubsub } from '@psychplus/utils/event'
import { clickTrack } from '@psychplus/utils/tracking'
import { SCHEDULE_APPOINTMENT_DIALOG } from '@psychplus/widgets'
import { enums, PSYCHPLUS_LIVE_URL } from '@/constants'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/navigation'
import { StorageType } from '@psychplus-v2/constants'
import { CodeWithDisplayName } from '@psychplus-v2/types'
import { getMonth, getYear } from 'date-fns'
import { isMobile } from '@psychplus/utils/client'
import { formatDateYmd } from '@psychplus/utils/time'
import { getZipcodeInfo } from '@/actions'
import { APPOINTMENTS_SEARCH_SESSION_PUBLIC_KEY } from '@/features/appointments/search/constants'
import {
  getStartOfWeek,
  prefetchProviders,
  updateStorage,
} from '@/features/appointments/search/utils'
import { StaffWithClinicsAndSlots } from '@/widgets/schedule-appointment-list/types'
import {
  getNormalizedAppointmentType,
  getNormalizedProviderType,
  transformStaffWithClinicsAndSlots,
} from '@/widgets/schedule-appointment-list/utils'

interface NewPatientProps {
  onclose?: () => void
  mapKey: string
}

const toggleGroupItemClasses =
  'bg-[#E8E8E8] text-2 lg:text-3 data-[state=on]:bg-[#24366B] data-[state=on]:text-accent-1 rounded-4'

interface ScheduledAppointment {
  providerType: 'Psychiatry' | 'Therapy' | 'unknown'
  appointmentType: 'In-Person' | 'Virtual' | 'unknown'
  dateOfBirth: string
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
    dateOfBirth: z.custom<Date>(
      (value) => value instanceof Date && !isNaN(value.getTime()),
      {
        message: 'Required',
      },
    ),
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
  .superRefine(({ dateOfBirth, zipCode }, ctx) => {
    const currentDate = new Date()
    const dob = new Date(dateOfBirth)

    if (dob) {
      const ageInYears = currentDate.getFullYear() - dob.getFullYear()

      if (ageInYears < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Age can't be less than 4 years!",
          path: ['dateOfBirth'],
        })
      }
      const zipCodePattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/

      if (!zipCodePattern.test(zipCode)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid zip code format!',
          path: ['zipCode'],
        })
      }
    }
  })

type SchemaType = z.infer<typeof schema>

const NewPatient = ({ onclose, mapKey }: NewPatientProps) => {
  const { publish } = usePubsub()
  const [prefetchPromise, setPrefetchPromise] = useState<Promise<void> | null>(
    null,
  )

  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | null>()

  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  const [schedule, setSchedule] = useState<ScheduledAppointment>({
    providerType: 'Psychiatry',
    appointmentType: 'In-Person',
    dateOfBirth: new Date().toISOString(),
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
  const getLocalDateWithoutTime = (date?: Date | null): string | undefined => {
    if (date) {
      const dateObj = date
      const utcDate = `${dateObj.getDate()}`.padStart(2, '0')
      const utcMonth = `${dateObj.getMonth() + 1}`.padStart(2, '0')
      const utcYear = `${dateObj.getFullYear()}`
      return `${utcYear}-${utcMonth}-${utcDate}`
    }
  }

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
      const options = states.map(() => {
        return {
          label: states[0]?.displayName,
          value: states[0]?.displayName,
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
          dateOfBirth: getLocalDateWithoutTime(form.getValues().dateOfBirth),
        }).then(() => void 0)
        setPrefetchPromise(promise)
      }
    }

    if (form.formState.isSubmitted) {
      form.trigger('zipCode')
      form.trigger('state')
    }
  }

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    const queryString = Object.entries({
      ...schedule,
      zipCode: form.getValues().zipCode,
      state: form.getValues().state,
      dateOfBirth: getLocalDateWithoutTime(form.getValues().dateOfBirth),
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
        dateOfBirth: getLocalDateWithoutTime(form.getValues().dateOfBirth),
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

    const url = `/schedule?${queryString}`

    router.push(`/widgets/schedule-appointment-list?${queryString}`)
    publish(`${SCHEDULE_APPOINTMENT_DIALOG}:appointment-search`, { url })
  }

  const years = Array.from(
    { length: 200 },
    (_, i) => new Date().getFullYear() - i,
  )
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <>
      <Flex
        className="gap-6 text-[#151B4A] max-md:w-full"
        direction="column"
        py="5"
        mt="5"
      >
        <Flex className="text-3 font-medium lg:text-5">
          Do you want to see a Psychiatrist or a Therapist?
        </Flex>

        <ToggleGroup.Root
          type="single"
          defaultValue="Psychiatry"
          value={schedule.providerType}
          onValueChange={(value) => {
            if (value) {
              onScheduleChange('providerType', value)
            }
          }}
        >
          <ToggleGroup.Item
            value="Psychiatry"
            className={cn(
              'mt-2 h-[40px] w-[200px] sm:mt-0 lg:h-[50px] lg:w-[292px]',
              toggleGroupItemClasses,
            )}
          >
            Psychiatry <Text size="1">(Diagnosis / Medications)</Text>
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="Therapy"
            className={cn(
              'mt-2 h-[40px] w-[190px] sm:ml-3 sm:mt-0 lg:h-[50px] lg:w-[207px]',
              toggleGroupItemClasses,
            )}
          >
            Therapy <Text size="1">(Counseling)</Text>
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </Flex>
      <Flex className="gap-6 max-md:w-full" direction="column" py="5">
        <Flex className="text-3 font-medium lg:text-5">
          Would you like to meet in-person or virtually?
        </Flex>
        <Flex className="">
          <ToggleGroup.Root
            type="single"
            defaultValue="In-Person"
            value={schedule.appointmentType}
            onValueChange={(value) => {
              if (value) {
                onScheduleChange('appointmentType', value)
              }
            }}
          >
            <ToggleGroup.Item
              value="In-Person"
              className={cn(
                'mt-2 h-[40px] w-[178px] sm:mt-0 lg:h-[50px] ',
                toggleGroupItemClasses,
              )}
            >
              In-Person
            </ToggleGroup.Item>

            <ToggleGroup.Item
              value="Virtual"
              className={cn(
                'mt-2 h-[40px] w-[178px] sm:ml-3 lg:h-[50px] ',
                toggleGroupItemClasses,
              )}
            >
              Virtual
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </Flex>
      </Flex>
      <Form form={form} onSubmit={onSubmit}>
        <Flex className="gap-6 max-md:w-full" direction="column" py="2">
          <Flex className="flex-col sm:flex-row" gap="3">
            <Flex direction="column" className="font-regular">
              <Text className="text-2 lg:text-4" mb="2" weight="medium">
                Date of Birth
              </Text>
              <FormField
                id="dateOfBirth"
                label=""
                {...form.register('dateOfBirth')}
              >
                <Flex className="h-[45px] w-full rounded-6 text-4 sm:w-[190px]">
                  <DatePicker
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => (
                      <Flex align={'center'} justify={'center'} gap={'1'}>
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                        >
                          {'<'}
                        </button>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value as unknown as number)
                          }
                        >
                          {years.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <select
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                        >
                          {'>'}
                        </button>
                      </Flex>
                    )}
                    selected={selectedDate}
                    className={cn(
                      'border-pp-gray-2 h-[35px] w-[195px] rounded-6 border-2 px-2 text-start text-4 lg:h-[45px]',
                    )}
                    onChange={(date) => {
                      if (date) {
                        form.setValue('dateOfBirth', date)
                        setSelectedDate(date)
                      }
                    }}
                    placeholderText="dd/mm/yyyy"
                  />
                </Flex>
              </FormField>
            </Flex>
            <Flex direction="column" className="font-regular">
              <Text className="text-2 lg:text-4" mb="2" weight="medium">
                Current ZIP Code
              </Text>
              <FormTextInput
                type="number"
                label=""
                placeholder="Current ZIP Code"
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
            <Flex direction="column" className="font-regular">
              <Text className="text-2 lg:text-4" mb="2" weight="medium">
                State
              </Text>
              <FormSelect
                label={''}
                required
                {...form.register('state')}
                disabled={stateOptions.length < 2}
                placeholder="Select state"
                buttonClassName="h-[35px] lg:h-[45px] w-[210px] text-4 rounded-6"
                options={stateOptions}
              />
              <TextField.Root />
            </Flex>
          </Flex>
        </Flex>
        <Flex className="gap-6 max-md:w-full" direction="column" mt="5">
          <Flex gap="3" direction="row">
            <Button
              radius="full"
              className="h-[30px] w-[100px] cursor-pointer items-center justify-center border-[#151B4A] bg-[white] px-4 text-[#151B4A] outline lg:h-[40px]"
              onClick={onclose}
            >
              <Text size="3">Cancel</Text>
            </Button>
            <FormSubmitButton
              radius="full"
              className="h-[30px] w-[112px] cursor-pointer items-center justify-center bg-[#151B4A] px-4 font-bold lg:h-[40px]"
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
