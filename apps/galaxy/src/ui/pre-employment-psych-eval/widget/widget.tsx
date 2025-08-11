'use client'

import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { NeuroPsychWidgetHeader } from '@/ui/fit-for-duty-psych-eval/widget/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { Blocks } from './blocks'
import { ClearButton } from './clear-button'
import { transformOut } from './data'
import { usePreEmploymentPsychEvalForm } from './form'
import { type SchemaType } from './schema'
import { getInitialValues } from './utils'

interface Props {
  patientId: string
  initialValue?: SchemaType
  isHeader?: boolean
}
const PreEmploymentPsychEvalWidget = ({
  patientId,
  initialValue,
  isHeader,
}: Props) => {
  const form = usePreEmploymentPsychEvalForm(initialValue ?? getInitialValues())

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionPreEmployment}
        getData={transformOut(patientId)}
        title={!isHeader ? 'Pre-employment Psych Eval (Procedure)' : undefined}
        sticky
        className="p-2 pt-0"
        headerRight={
          !isHeader && (
            <>
              <ClearButton />
              <WidgetSaveButton shouldCheckPermission />
            </>
          )
        }
        topHeader={
          isHeader && (
            <NeuroPsychWidgetHeader heading="Pre-Employment Psych Eval" />
          )
        }
        formResetValues={getInitialValues()}
      >
        <Blocks />
      </WidgetFormContainer>
    </FormProvider>
  )
}
export { PreEmploymentPsychEvalWidget }
