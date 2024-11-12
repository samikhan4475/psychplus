import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, RadioGroup } from '@/components'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'

const EVENT_RESOLUTION_OPTIONS = [
  {
    label: 'No',
    value: 'no',
  },
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'Unknown',
    value: 'unknown',
  },
]

const EventResolutionBlock = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const adverseEventQuestion = form.watch('adverseEventQuestion')

  return (
    adverseEventQuestion === 'yes' && (
      <Flex direction="row" gap="1">
        <BlockLabel className="text-2 font-medium" required>
          Did the Event Resolve?
        </BlockLabel>
        <RadioGroup
          field="eventResolution"
          options={EVENT_RESOLUTION_OPTIONS}
        />
      </Flex>
    )
  )
}

export { EventResolutionBlock }
