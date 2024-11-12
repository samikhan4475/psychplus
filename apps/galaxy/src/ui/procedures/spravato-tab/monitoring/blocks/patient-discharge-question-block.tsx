import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, SelectInput, YesNoSelect } from '@/components'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'

const DISCHARGE_OPTIONS = (() => {
  const limit = 120
  const interval = 5
  const options: { label: string; value: string }[] = []
  for (let i = interval; i <= limit; i += interval) {
    options.push({ label: `${i} mins`, value: `${i}` })
  }
  return options
})()

const PatientDischargeQuestion = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const isPatientDischarge = form.watch('isPatientDischarge')

  return (
    <Flex
      direction="column"
      className="border-pp-gray-2 rounded-3 border border-solid"
      p="2"
      gap="2"
    >
      <Flex direction="row" gap="1">
        <BlockLabel required className="text-2 font-medium">
          Was the patient clinically ready for discharge prior to the required 2
          hours?
        </BlockLabel>
        <YesNoSelect isNoFirst field="isPatientDischarge" required />
      </Flex>
      {isPatientDischarge === 'yes' && (
        <Flex direction="row" gap="1">
          <BlockLabel required>
            When was the patient ready for discharge?
          </BlockLabel>
          <SelectInput
            field="timeForPatientReadyForDischarge"
            options={DISCHARGE_OPTIONS}
          />
          <BlockLabel>from start of administration.</BlockLabel>
        </Flex>
      )}
    </Flex>
  )
}

export { PatientDischargeQuestion }
