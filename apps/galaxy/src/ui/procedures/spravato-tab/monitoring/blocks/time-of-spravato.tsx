import { useEffect } from 'react'
import { Time } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  TimeInput,
} from '@/components'
import { UnitInput } from '@/ui/procedures/tms-tab/treatment-session/unit-input'

const TimeOfSpravatoBlock = () => {
  const form = useFormContext()
  const spravatoAdministrationTime = form.watch('spravatoAdministrationTime')
  const dischargeTime = form.watch('dischargeTime')

  useEffect(() => {
    if (spravatoAdministrationTime && dischargeTime) {
      const dateString = new Date().toISOString().split('T')[0]

      const totalTimeMonitored =
        (new Date(`${dateString}T${dischargeTime.replace(' ', '')}`).getTime() -
          new Date(
            `${dateString}T${spravatoAdministrationTime.replace(' ', '')}`,
          ).getTime()) /
        1000 /
        60
      if (totalTimeMonitored >= 0)
        form.setValue('totalTimeMonitored', `${totalTimeMonitored}`)
    }
  }, [spravatoAdministrationTime, dischargeTime])

  return (
    <FormFieldContainer className="flex-row items-center gap-4">
      <Flex direction="row" align="center" gap="1">
        <BlockLabel required>Time of Spravato Administration</BlockLabel>
        <TimeInput
          field="spravatoAdministrationTime"
          label=""
          hourCycle={24}
          dateInputClass="h-5"
          onChange={(value) =>
            form.setValue(
              'spravatoAdministrationTime',
              `${value.hour}:${value.minute}`,
            )
          }
          value={
            spravatoAdministrationTime
              ? ({
                  hour: spravatoAdministrationTime.split(':')[0],
                  minute: spravatoAdministrationTime.split(':')[1],
                  millisecond: 0,
                  second: 0,
                } as Time)
              : null
          }
        />
        <FormFieldError name="spravatoAdministrationTime" />
      </Flex>
      <Flex direction="row" align="center" gap="1">
        <BlockLabel required>Time of Discharge</BlockLabel>
        <TimeInput
          field="dischargeTime"
          label=""
          hourCycle={24}
          dateInputClass="h-5"
          onChange={(value) =>
            form.setValue('dischargeTime', `${value.hour}:${value.minute}`)
          }
          value={
            dischargeTime
              ? ({
                  hour: dischargeTime.split(':')[0],
                  minute: dischargeTime.split(':')[1],
                  millisecond: 0,
                  second: 0,
                } as Time)
              : null
          }
        />
        <FormFieldError name="dischargeTime" />
      </Flex>
      <Flex direction="row" align="center" gap="1">
        <BlockLabel required>Total Time Monitored</BlockLabel>
        <UnitInput symbol="min" field="totalTimeMonitored" />
      </Flex>
    </FormFieldContainer>
  )
}

export { TimeOfSpravatoBlock }
