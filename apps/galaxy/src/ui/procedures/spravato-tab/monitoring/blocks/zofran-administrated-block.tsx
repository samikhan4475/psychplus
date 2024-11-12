import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  RadioSelectSection,
  YesNoSelect,
} from '@/components'
import { useBookedAppointmentsStore } from '@/ui/schedule/store'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'
import { TimeSelectionBlock } from './time-selection-block'

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

const ZofranAdministratedBlock = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()
  const zofranAdministrated = form.watch('zofranAdministrated')
  const zofranAdministratedTime = form.watch('zofranAdministratedTime')

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
    if (appointmentData && !zofranAdministratedTime) {
      form.setValue(
        'zofranAdministratedTime',
        format(new Date(appointmentData.appointmentDate), 'HH:mm'),
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
            <TimeSelectionBlock label="Time" field="zofranAdministratedTime" />
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
