'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { HistoryButton, SaveButton } from '@/ui/procedures/shared'
import { useSpravatoForm } from '@/ui/procedures/spravato-tab/form/use-spravato-form'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { ProcedureTabs } from '../constants'
import { DosingSection, PrecautionsAndWarningSection } from './sections'

interface SpravatoTabProps {
  patientId: string
}

const SpravatoTab = ({ patientId }: SpravatoTabProps) => {
  const form = useSpravatoForm({
    patientId,
    treatmentNumber: '01',
    medicationAssessment: true,
    benzodiazepines: 'no',
    nonBenzodiazepineSedativeHypnotic: 'no',
    psychostimulants: 'no',
    monoamineOxidaseInhibitors: 'no',
    aneurysmalVascularDisease: true,
    pregnancyStatus: true,
    adverseReactionsEducation: true,
    postTreatmentSafety: true,
  })

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          enableEvents={false}
          patientId={patientId}
          widgetId={ProcedureTabs.SPRAVATO}
          getData={() => []}
          title={ProcedureTabs.SPRAVATO}
          headerRight={
            <Flex gap="2">
              <HistoryButton />
              <SaveButton />
            </Flex>
          }
        />

        <DosingSection loading={false} />
        <PrecautionsAndWarningSection />
      </Flex>
    </FormProvider>
  )
}

export { SpravatoTab }
