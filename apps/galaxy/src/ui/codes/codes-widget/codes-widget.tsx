'use client'

import { ComponentType, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Box } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { Appointment, QuickNoteSectionItem } from '@/types'
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
import { CommonVisit, ReadOnlyVisit, Tcm } from './visits'

interface CodesWidgetProps {
  patientId: string
  appointmentId?: string
  isCodesHeader?: boolean
  initialValues: CodesWidgetSchemaType
  appointment: Appointment
  tcmData?: QuickNoteSectionItem[]
  questionairesCount?: number
}

const CodesWidget = ({
  patientId,
  isCodesHeader,
  appointmentId,
  initialValues,
  appointment,
  tcmData,
  questionairesCount,
}: CodesWidgetProps) => {
  const params = useSearchParams()
  const form = useCodesWidgetForm(initialValues)
  const visitType = params.get('visitType') ?? 'Common'
  const visitSequence = params.get('visitSequence') ?? ''
  const VisitComponent =
    visitsMap?.[visitType] ??
    visitsMap?.[`${visitType}${visitSequence}`] ??
    visitsMap['Common']

  useEffect(() => {
    const { isChanged, updatedCodes } = getModifiedCptCodes(
      initialValues,
      appointment,
      questionairesCount,
    )
    if (isChanged) {
      form.reset(updatedCodes)
      isCodesHeader &&
        handleDefaultSubmission(patientId, appointmentId, updatedCodes)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, appointmentId, appointment, initialValues, questionairesCount])

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
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionCodes}
        title="Codes"
        tags={isCodesHeader ? [QuickNoteSectionName.QuicknoteSectionCodes] : []}
        getData={transformOut(patientId, appointmentId)}
        headerRight={
          !isCodesHeader && <WidgetSaveButton shouldCheckPermission />
        }
        topHeader={isCodesHeader && <CodesHeader />}
        isResetDisabled
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
              tcmData={tcmData}
              isQuicknoteView={isCodesHeader ?? true}
            />
          )}
        </Box>
      </WidgetFormContainer>
    </FormProvider>
  )
}

const visitsMap: Record<string, ComponentType<VisitProps>> = {
  Common: CommonVisit,
  TransitionalCare: Tcm,
  Spravato: ReadOnlyVisit,
  IndividualPsychotherapyEstablished: ReadOnlyVisit,
  FamilyPsychotherapy: ReadOnlyVisit,
}
export { CodesWidget }
