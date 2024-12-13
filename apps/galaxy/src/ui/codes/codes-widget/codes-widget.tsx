'use client'

import { ComponentType, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Box } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { Appointment } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { CodeHistory } from './code-history'
import { CodesHeader } from './codes-header'
import { useCodesWidgetForm } from './codes-widget-form'
import { CodesWidgetSchemaType } from './codes-widget-schema'
import { transformOut } from './data'
import { VisitProps } from './types'
import {
  getCptCodeOptions,
  getModifiedCptCodes,
  handleDefaultSubmission,
} from './utils'
import { CommonVisit, SpravatoVisit, Tcm } from './visits'

interface CodesWidgetProps {
  patientId: string
  appointmentId?: string
  isCodesHeader?: boolean
  initialValues: CodesWidgetSchemaType
  appointment: Appointment
}

const CodesWidget = ({
  patientId,
  isCodesHeader,
  appointmentId,
  initialValues,
  appointment,
}: CodesWidgetProps) => {
  const params = useSearchParams()
  const form = useCodesWidgetForm(initialValues)
  const VisitComponent =
    visitsMap?.[params.get('visitType') ?? ''] ?? visitsMap['common']

  useEffect(() => {
    const { isChanged, updatedCodes } = getModifiedCptCodes(
      initialValues,
      appointment,
    )
    if (isChanged) {
      form.reset(updatedCodes)
      handleDefaultSubmission(patientId, appointmentId, updatedCodes)
    }
  }, [appointmentId, patientId, initialValues, appointment])

  const {
    primaryCodeOptions,
    addOnCodeOptions,
    modifierCodeOptions,
    cptCodesLookup,
  } = getCptCodeOptions(
    appointment?.cptPrimaryCodes,
    appointment?.cptAddonCodes,
    appointment?.cptModifiersCodes,
    initialValues,
  )
  return (
    <FormProvider {...form}>
      {isCodesHeader && (
        <CodesHeader
          patientId={patientId}
          getData={transformOut(patientId, appointmentId)}
        />
      )}

      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionCodes}
        title="Codes"
        getData={transformOut(patientId, appointmentId)}
        headerRight={
          <>
            {!isCodesHeader && (
              <>
                <WidgetClearButton />
                <WidgetSaveButton />
              </>
            )}
          </>
        }
      >
        <Box className="border-pp-focus-bg relative w-full max-w-[580px] border p-1">
          <CodeHistory cptCodesLookup={cptCodesLookup} />
          {VisitComponent && (
            <VisitComponent
              cptPrimaryCodes={primaryCodeOptions}
              cptAddOnsCodes={addOnCodeOptions}
              cptmodifierCodes={modifierCodeOptions}
              appointment={appointment}
              patientId={patientId}
            />
          )}
        </Box>
      </WidgetFormContainer>
    </FormProvider>
  )
}

const visitsMap: Record<string, ComponentType<VisitProps>> = {
  common: CommonVisit,
  TransitionalCare: Tcm,
  SpravatoVisit: SpravatoVisit,
}
export { CodesWidget }
