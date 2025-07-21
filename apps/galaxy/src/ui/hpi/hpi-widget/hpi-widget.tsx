'use client'

import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '@/ui/quicknotes/store'
import { useLayoutEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'
import AllBlocks from './blocks/all-blocks'
import { ClearButton } from './clear-button'
import { transformOut } from './data'
import { HistoryButton } from './history-button'
import { useHpiWidgetForm } from './hpi-widget-form'
import { HpiWidgetHeader } from './hpi-widget-header'
import { type HpiWidgetSchemaType } from './hpi-widget-schema'
import { getInitialValues } from './utils'

interface HpiWidgetProps {
  patientId: string
  initialValue?: HpiWidgetSchemaType
  isHpiHeader?: boolean
  otherData?: QuickNoteSectionItem[]
  appointment: Appointment
  readonly widgetsData?: QuickNoteSectionItem[]
  readonly appointmentId: string
}

const HpiWidget = ({
  patientId,
  initialValue,
  isHpiHeader,
  otherData,
  appointment,
  appointmentId,
  widgetsData
}: HpiWidgetProps) => {
  const { setWidgetsData, setActualNoteData } = useStore(
    useShallow((state) => ({
      setWidgetsData: state.setWidgetsData,
      setActualNoteData: state.setActualNoteWidgetsData,
    })),
  )
  const form = useHpiWidgetForm(initialValue ?? getInitialValues())

  useLayoutEffect(() => {
    setWidgetsData(widgetsData || [], true)
    setActualNoteData(widgetsData || [], true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentId])

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        tags={isHpiHeader ? [QuickNoteSectionName.QuicknoteSectionHPI] : []}
        widgetId={QuickNoteSectionName.QuicknoteSectionHPI}
        getData={transformOut(patientId)}
        title={!isHpiHeader ? 'HPI/Presenting Symptoms' : undefined}
        sticky
        className="p-2"
        headerRight={
          !isHpiHeader && (
            <>
              <HistoryButton patientId={patientId} appointment={appointment} />
              <ClearButton shouldCheckPermission />
              <WidgetSaveButton shouldCheckPermission />
            </>
          )
        }
        topHeader={isHpiHeader && <HpiWidgetHeader patientId={patientId} appointment={appointment} />}
        formResetValues={getInitialValues()}
      >
        <AllBlocks data={otherData} />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { HpiWidget }
