'use client'

import { useState } from 'react'
import { Box } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { AddonsTable, ModifierTable, PrimaryCodeTable } from './blocks'
import { CodeHistory } from './code-history'
import { CodesHeader } from './codes-header'
import { useCodesWidgetForm } from './codes-widget-form'
import { transformOut } from './data'

interface CodesWidgetProps {
  patientId: string
  isCodesHeader?: boolean
}

const CodesWidget = ({ patientId, isCodesHeader }: CodesWidgetProps) => {
  const form = useCodesWidgetForm()
  const [dropdownValue, setDropdownValue] = useState('Outpatient Office Visit')

  const handleDropdownChange = (value: string) => {
    setDropdownValue(value)
  }

  return (
    <FormProvider {...form}>
      {isCodesHeader && (
        <CodesHeader
          patientId={patientId}
          getData={transformOut(patientId)}
          onDropdownChange={handleDropdownChange}
        />
      )}

      <WidgetFormContainer
        patientId={patientId}
        widgetId="codes"
        title={isCodesHeader ? `${dropdownValue}` : 'Codes'}
        getData={transformOut(patientId)}
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
          <CodeHistory form={form} />
          <PrimaryCodeTable />
          <ModifierTable />
          <AddonsTable />
        </Box>
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { CodesWidget }
