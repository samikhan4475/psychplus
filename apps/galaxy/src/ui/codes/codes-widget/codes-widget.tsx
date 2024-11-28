'use client'

import { ComponentType, useEffect, useState } from 'react'
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
  getDefaultCptCodes,
  handleDefaultSubmission,
  hasInitialValues,
} from './utils'
import { OutpatientOffice } from './visits'

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
  const [dropdownValue, setDropdownValue] = useState('Outpatient Office Visit')
  const defaultCodes = getDefaultCptCodes(appointment)
  const form = useCodesWidgetForm(initialValues)
  const handleDropdownChange = (value: string) => {
    setDropdownValue(value)
  }
  const VisitComponent = visitsMap?.[params.get('visitType') ?? '']

  useEffect(() => {
    if (!hasInitialValues(initialValues) && defaultCodes?.length) {
      const mergedValues = { ...initialValues, cptPrimaryCodes: defaultCodes }
      form.reset(mergedValues)
      handleDefaultSubmission(patientId, appointmentId, mergedValues)
    }
  }, [appointmentId, patientId])

  const { primaryCodeOptions, addOnCodeOptions, cptCodesLookup } =
    getCptCodeOptions(appointment?.cptPrimaryCodes, appointment?.cptAddonCodes)

  return (
    <FormProvider {...form}>
      {isCodesHeader && (
        <CodesHeader
          patientId={patientId}
          getData={transformOut(patientId, appointmentId)}
          onDropdownChange={handleDropdownChange}
        />
      )}

      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionCodes}
        title={isCodesHeader ? `${dropdownValue}` : 'Codes'}
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
  Outpatient: OutpatientOffice,
}
export { CodesWidget }
