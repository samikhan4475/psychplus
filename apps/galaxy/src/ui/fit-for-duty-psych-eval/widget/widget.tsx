'use client'

import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { Blocks } from './blocks'
import { ClearButton } from './components/clear-button'
import { NeuroPsychWidgetHeader } from './components/header'
import { transformOut } from './data'
import { useFitForDutyPsychEvalForm } from './form'
import { type SchemaType } from './schema'
import { getInitialValues } from './utils'

interface Props {
  patientId: string
  initialValue?: SchemaType
  isHeader?: boolean
}
const FitForDutyPsychEvalWidget = ({
  patientId,
  initialValue,
  isHeader,
}: Props) => {
  const form = useFitForDutyPsychEvalForm(initialValue ?? getInitialValues())

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionFitForDutyPsychEval}
        getData={transformOut(patientId)}
        title={!isHeader ? 'Fit-For-Duty Evaluation' : undefined}
        sticky
        className="p-2 pt-0"
        headerRight={
          !isHeader && (
            <>
              <ClearButton<SchemaType> getInitialValues={getInitialValues} />
              <WidgetSaveButton shouldCheckPermission />
            </>
          )
        }
        topHeader={
          isHeader && (
            <NeuroPsychWidgetHeader<SchemaType>
              heading="Fit-For-Duty Evaluation"
              getInitialValues={getInitialValues}
            />
          )
        }
        formResetValues={getInitialValues()}
      >
        <Blocks />
      </WidgetFormContainer>
    </FormProvider>
  )
}
export { FitForDutyPsychEvalWidget }
