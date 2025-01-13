import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Time } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  RadioSelectSection,
  TimeInput,
  YesNoSelect,
} from '@/components'
import { Appointment } from '@/types'

const DOSE_OPTIONS = [
  {
    label: '2mg',
    value: '2mg',
  },
  {
    label: '4mg',
    value: '4mg',
  },
  {
    label: '8mg',
    value: '8mg',
  },
  {
    label: '16mg',
    value: '16mg',
  },
  {
    label: '32mg',
    value: '32mg',
  },
]

const ZofranAdministratedBlock = ({
  appointmentData,
}: {
  appointmentData: Appointment | null
}) => {
  const form = useFormContext()
  const zofranAdministrated = form.watch('zofranAdministrated')
  const zofranAdministratedTime = form.watch('zofranAdministratedTime')

  useEffect(() => {
    if (
      appointmentData &&
      appointmentData.startDate &&
      !zofranAdministratedTime
    ) {
      form.setValue(
        'zofranAdministratedTime',
        format(new Date(appointmentData.startDate), 'HH:mm'),
      )
    }
  }, [appointmentData])

  return (
    <Flex
      direction="column"
      className="border-pp-gray-2 rounded-3 border border-solid"
      p="2"
      gap="2"
    >
      <Flex direction="row" gap="1">
        <BlockLabel required className="text-2 font-medium">
          Zofran Administered
        </BlockLabel>
        <YesNoSelect field="zofranAdministrated" isNoFirst label="" required />
      </Flex>
      {zofranAdministrated === 'yes' && (
        <Flex direction="row" gap="4">
          <FormFieldContainer className="flex-row items-center gap-1">
            <BlockLabel required>Time</BlockLabel>
            <TimeInput
              field="zofranAdministratedTime"
              label=""
              hourCycle={24}
              dateInputClass="h-5"
              onChange={(value) =>
                form.setValue(
                  'zofranAdministratedTime',
                  `${value.hour}:${value.minute}`,
                )
              }
              value={
                zofranAdministratedTime
                  ? ({
                      hour: zofranAdministratedTime.split(':')[0],
                      minute: zofranAdministratedTime.split(':')[1],
                      millisecond: 0,
                      second: 0,
                    } as Time)
                  : null
              }
            />
            <FormFieldError name="zofranAdministratedTime" />
          </FormFieldContainer>
          <RadioSelectSection
            field="dose"
            options={DOSE_OPTIONS}
            label="Dose"
            required
          />
        </Flex>
      )}
    </Flex>
  )
}

export { ZofranAdministratedBlock }
