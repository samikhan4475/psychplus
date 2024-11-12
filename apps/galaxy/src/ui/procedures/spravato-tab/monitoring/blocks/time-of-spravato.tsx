import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldContainer, FormFieldError } from '@/components'
import { UnitInput } from '@/ui/procedures/tms-tab/treatment-session/unit-input'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'
import { TimeSelectionBlock } from './time-selection-block'

const TimeOfSpravatoBlock = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()
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
        <BlockLabel>Time of Spravato Administration</BlockLabel>
        <TimeSelectionBlock field="spravatoAdministrationTime" label="" />
        <FormFieldError name="spravatoAdministrationTime" />
      </Flex>
      <Flex direction="row" align="center" gap="1">
        <BlockLabel>Time of Discharge</BlockLabel>
        <TimeSelectionBlock field="dischargeTime" label="" />
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
