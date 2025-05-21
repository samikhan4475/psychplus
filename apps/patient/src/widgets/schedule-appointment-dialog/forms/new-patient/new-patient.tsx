'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { zipLast4Schema, zipCodeSchema } from '@psychplus-v2/utils'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
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
import { getZipcodeInfo } from '@psychplus/utils/map'
import { clickTrack } from '@psychplus/utils/tracking'
import { SCHEDULE_APPOINTMENT_DIALOG } from '@psychplus/widgets'
import { PlacesAutocomplete } from '@/components-v2'
import { useGooglePlacesContext } from '@/providers'
import { useStore } from '@/widgets/schedule-appointment-list/store'
import { enums, PSYCHPLUS_LIVE_URL } from '@/constants'

interface NewPatientProps {
  onclose?: () => void
  mapKey: string
}

const toggleGroupItemClasses =
  'bg-[#E8E8E8] text-3 data-[state=on]:bg-[#24366B] data-[state=on]:text-accent-1 rounded-4'

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
  primaryZipLast4: string
  primaryCountry: string
}

interface StateOptions {
  label: string
  value: string
}

const schema = z
  .object({
    dateOfBirth: validate.requiredString,
    zipCode: validate.requiredString,
    state: validate.requiredString,
    primaryStreet1: z.string().optional(),
    primaryStreet2: z.string().optional(),
    primaryStreet: z.string().optional(),
    primaryStreetNumber: z.string().optional(),
    primaryCity: z.string().optional(),
    primaryState: z.string().optional(),
    primaryPostalCode: zipCodeSchema.optional(),
    primaryZipLast4: zipLast4Schema.optional(),
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

  const { loaded } = useGooglePlacesContext()

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
    primaryZipLast4: '',
    primaryCountry: '',
  })

  const [stateOptions, setStateOptions] = useState<StateOptions[]>([])

  const { setPatient, setAddress,setGMapKey } = useStore()

  const onScheduleChange = (key: keyof ScheduledAppointment, value: string) => {
    setSchedule((prev) => ({ ...prev, [key]: value }))
  }

  const getDobMaxDate = () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 4)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`
  }

  const lastZipCode = useRef<string | null>(null)

  const handleZipCodeChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const zipCode = event.target.value.slice(0, 5)

    if (lastZipCode.current === zipCode) return

    form.setValue('zipCode', zipCode)
    form.setValue('state', '')

    if (zipCode.length === 5) {
      lastZipCode.current = zipCode
      const response = await getZipcodeInfo(zipCode, mapKey)
      const states = response.data
      const options = states.map((state) => {
        return {
          label: state.long_name,
          value: state.long_name,
        }
      })

      setStateOptions(options)

      if (options.length) {
        const newState = options[0].value
        setTimeout(() => {
          form.setValue('state', newState)
          form.trigger('state')
        }, 100)
      }
    }

    if (form.formState.isSubmitted) {
      form.trigger('zipCode')
      form.trigger('state')
    }
  }

  const onSubmit: SubmitHandler<SchemaType> = () => {
    const queryString = Object.entries({
      ...schedule,
      zipCode: form.getValues().zipCode,
      state: form.getValues().state,
    })
      .filter((key) => key[0] !== 'dateOfBirth')
      .map((key) => `${key[0]}=${key[1]}`)
      .join('&')

    setPatient({
      dateOfBirth: form.getValues().dateOfBirth,
    })

    setAddress({
      primaryStreet1: form.getValues().primaryStreet1,
      primaryStreet2: form.getValues().primaryStreet2,
      primaryCity: form.getValues().primaryCity,
      primaryState: form.getValues().primaryState,
      primaryPostalCode: form.getValues().primaryPostalCode,
      primaryZipLast4: form.getValues().primaryZipLast4 ?? '',
    })

    setGMapKey(mapKey)

    parent.postMessage(
      {
        event: enums.SCHEDULE_START,
        user_data: {
          date_of_birth: form.getValues().dateOfBirth,
          city: form.getValues().primaryCity,
          state: form.getValues().primaryState,
          zip_code: form.getValues().zipCode,
        },
      },
      PSYCHPLUS_LIVE_URL,
    )

    clickTrack({
      productArea: 'Patient',
      productPageKey: 'Search Schedule Appointment',
      clickAction: 'Navigation',
      clickActionData: 'Clicked Search',
    })

    const url = `/schedule?${queryString}`
    publish(`${SCHEDULE_APPOINTMENT_DIALOG}:appointment-search`, { url })
  }

  return (
    <>
      <Flex
        className="gap-6 text-[#151B4A] max-md:w-full"
        direction="column"
        py="5"
        mt="5"
      >
        <Flex className="text-5 font-medium">
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
            className={
              toggleGroupItemClasses + ' h-[50px] w-[268px] sm:w-[292px]'
            }
          >
            Psychiatry <Text size="1">(Diagnosis / Medications)</Text>
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="Therapy"
            className={
              toggleGroupItemClasses +
              ' mt-2 h-[50px] w-[207px] sm:ml-3 sm:mt-0'
            }
          >
            Therapy <Text size="1">(Counseling)</Text>
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </Flex>
      <Flex className="gap-6 max-md:w-full" direction="column" py="5">
        <Flex className="text-5 font-medium">
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
              className={
                'mt-2 h-[50px] w-[178px] sm:mt-0 ' + toggleGroupItemClasses
              }
            >
              In-Person
            </ToggleGroup.Item>

            <ToggleGroup.Item
              value="Virtual"
              className={'ml-3 h-[50px] w-[157px] ' + toggleGroupItemClasses}
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
              <Text size="4" mb="2" weight="medium">
                Date of Birth
              </Text>
              <FormField
                id="dateOfBirth"
                label=""
                {...form.register('dateOfBirth')}
              >
                <Flex className="rt-TextFieldRoot rt-r-size-3 rt-variant-surface h-[45px] w-full rounded-6 text-4 sm:w-[190px]">
                  <input
                    type="date"
                    max={getDobMaxDate()}
                    onChange={(e) => {
                      form.setValue('dateOfBirth', e.target.value)
                      form.trigger('dateOfBirth')
                    }}
                    data-testid="date-of-birth-input"
                    className="rt-TextFieldInput rt-reset block w-[98%]"
                  />
                </Flex>
              </FormField>
            </Flex>
            <Flex direction="column" className="font-regular">
              <Text size="4" mb="2" weight="medium">
                ZIP Code
              </Text>
              <FormTextInput
                type="number"
                label=""
                placeholder="ZIP Code"
                data-testid="zip-code-input"
                {...form.register('zipCode')}
                onChange={(e) => {
                  if (e.target.value.length <= 5) {
                    handleZipCodeChange(e)
                  }
                }}
                className="h-[45px] w-[200px] rounded-6 text-4"
                value={form.watch('zipCode')}
                maxLength={5}
              />
            </Flex>
            <Flex direction="column" className="font-regular">
              <Text size="4" mb="2" weight="medium">
                State
              </Text>
              <FormSelect
                label={''}
                required
                {...form.register('state')}
                disabled={stateOptions.length < 2}
                placeholder="Select state"
                buttonClassName="h-[45px] w-[210px] text-4 rounded-6"
                options={stateOptions}
              />
              <TextField.Root />
            </Flex>
          </Flex>
          {loaded && (
            <PlacesAutocomplete
              name="primary"
              label="Primary"
              className="h-[45px] rounded-6 text-4"
              isSelfScheduling
            />
          )}
        </Flex>
        <Flex className="gap-6 max-md:w-full" direction="column" mt="5">
          <Flex gap="3" direction="row">
            <Button
              radius="full"
              className="h-[40px] w-[100px] cursor-pointer items-center justify-center border-[#151B4A] bg-[white] px-4 text-[#151B4A] outline"
              onClick={onclose}
            >
              <Text size="3">Cancel</Text>
            </Button>
            <FormSubmitButton
              radius="full"
              className="h-[40px] w-[112px] cursor-pointer items-center justify-center bg-[#151B4A] px-4 font-bold"
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
