import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex, TextField } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError, RadioSelectSection } from '@/components'
import { useBookedAppointmentsStore } from '@/ui/schedule/store'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'
import { EventResultedBlock } from './event-resulted-in-block'

const OCCURRANCE_DURATION = [
  {
    label: 'During This Treatment Session',
    value: 'During This Treatment Session',
  },
  {
    label: 'Since Last Treatment Session',
    value: 'Since Last Treatment Session',
  },
]

const OccurrenceBlock = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()
  const adverseEventQuestion = form.watch('adverseEventQuestion')
  const dateOfEvent = form.watch('dateOfEvent')

  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')

  const appointmentData = useBookedAppointmentsStore((state) => {
    if (appointmentId) {
      return state.listViewData.find(
        (item) => item.appointmentId === +appointmentId,
      )
    }
    return null
  })

  useEffect(() => {
    if (appointmentData && !dateOfEvent) {
      form.setValue(
        'dateOfEvent',
        format(new Date(appointmentData.appointmentDate), 'yyyy-MM-dd'),
      )
    }
  }, [appointmentData])

  return (
    adverseEventQuestion === 'yes' && (
      <Flex direction="row" gap="3" wrap="wrap" align="center">
        <RadioSelectSection
          field="occurrenceDuration"
          options={OCCURRANCE_DURATION}
          label="Occurrence"
          required
        />
        <Flex direction="row" gap="1" align="center">
          <BlockLabel required>Date of Event</BlockLabel>
          <TextField.Root
            type="date"
            size="1"
            {...form.register('dateOfEvent')}
            className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
          />
          <FormFieldError name="dateOfEvent" />
        </Flex>
        <EventResultedBlock />
      </Flex>
    )
  )
}

export { OccurrenceBlock }
