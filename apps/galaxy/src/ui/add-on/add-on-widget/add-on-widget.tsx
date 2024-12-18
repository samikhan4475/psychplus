'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCachedBlocksByVisitType } from '../utils'
import { useAddOnWidgetForm } from './add-on-widget-form'
import { AddOnWidgetSchemaType } from './add-on-widget-schema'
import { transformOut } from './data'

interface AddOnWidgetProps {
  patientId: string
  initialValue: AddOnWidgetSchemaType
}

interface Block {
  component: React.ComponentType<{ isChecked?: boolean }>
  id: string
  isChecked?: boolean
}

const AddOnWidget = ({ patientId, initialValue }: AddOnWidgetProps) => {
  const visitType = useSearchParams().get('visitType') || ''
  const visitSequence = useSearchParams().get('visitSequence') || ''
  const appointmentId = useSearchParams().get('id') as string

  const blocks: Block[] = (
    getCachedBlocksByVisitType(visitType, visitSequence) || []
  ).filter((block): block is Block => block !== undefined)

  const form = useAddOnWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.Addon}
        title="Add On"
        getData={transformOut(patientId, appointmentId, visitType)}
        headerRight={
          <>
            <WidgetSaveButton />
          </>
        }
      >
        <Flex direction="column" gap="2">
          {blocks.map(({ component: BlockComponent, id, isChecked }) => (
            <BlockComponent key={id} isChecked={isChecked} />
          ))}
        </Flex>
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { AddOnWidget }
