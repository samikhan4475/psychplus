'use client'

import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Button, Flex, Text } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { clickTrack } from '@psychplus/utils/tracking'
import { useStore } from '@/widgets/schedule-appointment-list/store'

interface NewPatientProps {
  onclose?: () => void
}

const toggleGroupItemClasses =
  'bg-[#E8E8E8] text-3 data-[state=on]:bg-[#151B4A] data-[state=on]:text-accent-1 rounded-4'

interface ScheduledAppointment {
  providerType: 'Psychiatrist' | 'Therapist' | 'unknown'
  appointmentType: 'Virtual' | 'In-Person' | 'unknown'
  dateOfBirth: string
  zipCode: string
}

const schema = z
  .object({
    dateOfBirth: validate.requiredString,
    zipCode: validate.requiredString,
  })
  .superRefine(({ dateOfBirth, zipCode }, ctx) => {
    const currentDate = new Date()
    const dob = new Date(dateOfBirth)

    if (dob) {
      const ageInYears = currentDate.getFullYear() - dob.getFullYear()

      if (ageInYears <= 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Age can't be less than 5 years!",
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

const NewPatient = ({ onclose }: NewPatientProps) => {
  const router = useRouter()

  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  //TODO: use react hook form to change this.
  const [schedule, setSchedule] = useState<ScheduledAppointment>({
    providerType: 'Psychiatrist',
    appointmentType: 'Virtual',
    dateOfBirth: new Date().toISOString(),
    zipCode: '',
  })

  const { setPatient } = useStore()

  const onScheduleChange = (key: keyof ScheduledAppointment, value: string) => {
    setSchedule((prev) => ({ ...prev, [key]: value }))
  }

  const handleZipCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const zipCode = event.target.value.slice(0, 5)
    form.setValue('zipCode', zipCode)

    if (form.formState.isSubmitted) form.trigger('zipCode')
  }

  const onSubmit: SubmitHandler<SchemaType> = () => {
    const queryString = Object.entries({
      ...schedule,
      zipCode: form.getValues().zipCode,
    })
      .filter((key) => key[0] !== 'dateOfBirth')
      .map((key) => `${key[0]}=${key[1]}`)
      .join('&')

    setPatient({
      dateOfBirth: form.getValues().dateOfBirth,
    })

    clickTrack({
      productArea: 'Patient',
      productPageKey: 'Search Schedule Appointment',
      clickAction: 'Navigation',
      clickActionData: 'Clicked Search',
    })

    router.push(`/schedule-appointment?${queryString}`)
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
          defaultValue="Psychiatrist"
          onValueChange={(value) => onScheduleChange('providerType', value)}
        >
          <ToggleGroup.Item
            value="Psychiatrist"
            className={
              toggleGroupItemClasses + ' h-[60px] w-[268px] sm:w-[292px]'
            }
          >
            Psychiatrist <Text size="1">(Diagnosis / Medications)</Text>
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="Therapist"
            className={
              toggleGroupItemClasses +
              ' mt-2 h-[60px] w-[207px] sm:ml-3 sm:mt-0'
            }
          >
            Therapist <Text size="1">(Counseling)</Text>
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
            defaultValue="Virtual"
            onValueChange={(value) =>
              onScheduleChange('appointmentType', value)
            }
          >
            <ToggleGroup.Item
              value="Virtual"
              className={'mr-3 h-[60px] w-[157px] ' + toggleGroupItemClasses}
            >
              Virtual
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="In-Person"
              className={
                'mt-2 h-[60px] w-[178px] sm:mt-0 ' + toggleGroupItemClasses
              }
            >
              In-Person
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </Flex>
      </Flex>
      <Form form={form} onSubmit={onSubmit}>
        <Flex className="gap-6 max-md:w-full" direction="column" py="2">
          <Flex className="flex-col sm:flex-row" gap="6">
            <Flex direction="column" className="font-regular">
              <Text size="4" mb="3">
                Date of Birth
              </Text>
              <FormTextInput
                type="date"
                max="9999-12-31"
                label=""
                data-testid="date-of-birth-input"
                {...form.register('dateOfBirth')}
                style={{ marginRight: 12 }}
                className="h-[56px] w-full rounded-2 text-4 sm:w-[300px]"
              />
            </Flex>
            <Flex direction="column" className="font-regular">
              <Text size="4" mb="3">
                Enter ZIP Code
              </Text>
              <FormTextInput
                type="number"
                label=""
                placeholder="ZIP Code"
                data-testid="zip-code-input"
                {...form.register('zipCode')}
                className="h-[56px] w-[300px] text-4"
                onChange={handleZipCodeChange}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex className="gap-6 max-md:w-full" direction="column" mt="5">
          <Flex gap="3" direction="row" className="sm:justify-end">
            <Button
              radius="full"
              className="h-[40px] w-[80px] cursor-pointer items-center justify-center border-[#151B4A] bg-[white] px-4 text-[#151B4A] outline"
              onClick={onclose}
            >
              <Text size="3">Cancel</Text>
            </Button>
            <FormSubmitButton
              radius="full"
              className="h-[40px] w-[100px] cursor-pointer items-center justify-center bg-[#151B4A] px-4 font-bold"
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
