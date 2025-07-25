'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import {
  getCachedBlocksByVisitType,
  mapAppointmentDurationToData,
} from '../utils'
import { useAddOnWidgetForm } from './add-on-widget-form'
import { AddOnWidgetSchemaType } from './add-on-widget-schema'
import { transformOut } from './data'

interface AddOnWidgetProps {
  patientId: string
  appointment?: Appointment
  initialValue: AddOnWidgetSchemaType
  otherData?: QuickNoteSectionItem[]
}

interface Block {
  component: React.ComponentType<{
    isChecked?: boolean
    otherData?: QuickNoteSectionItem[]
    appointment?: Appointment
  }>
  id: string
  isChecked?: boolean
}

const AddOnWidget = ({
  patientId,
  initialValue,
  appointment,
  otherData = [],
}: AddOnWidgetProps) => {
  const searchParams = useSearchParams()
  const visitType = searchParams.get('visitType') || ''
  const visitSequence = searchParams.get('visitSequence') || ''
  const appointmentId = searchParams.get('id') as string
  const { isQuickNoteView } = useQuickNoteUpdate()

  const blocks: Block[] = (
    getCachedBlocksByVisitType(visitType, visitSequence) || []
  ).filter((block): block is Block => block !== undefined)

  const durationData =
    !initialValue.therapyTimeSpent &&
    initialValue.therapyPsychoanalysis === 'therapy'
      ? mapAppointmentDurationToData(appointment?.duration)
      : {}

  const form = useAddOnWidgetForm({
    ...initialValue,
    ...durationData,
  })

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.Addon}
        tags={[QuickNoteSectionName.Addon]}
        title="Add On"
        getData={transformOut(patientId, appointmentId, visitType)}
        headerRight={
          <WidgetSaveButton variant={isQuickNoteView ? 'outline' : 'filled'} />
        }
      >
        <Flex direction="column" gap="2">
          {blocks.map(({ component: BlockComponent, id, isChecked }) => (
            <BlockComponent
              key={id}
              isChecked={isChecked}
              otherData={otherData}
              appointment={appointment}
            />
          ))}
        </Flex>
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { AddOnWidget }
