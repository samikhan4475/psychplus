'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { WidgetFormContainer } from '@/components'
import { QuestionnaireTabs } from '../constants'
import { QuestionnairesTabsBlock } from './blocks'

interface QuestionnairesWidgetProps {
  patientId: string
}

type QuestionnairesWidgetSchemaType = z.infer<typeof questionnairesWidgetSchema>

const questionnairesWidgetSchema = z.object({
  questionnairesTabs: z.array(
    z.object({
      key: z.string(),
      value: z.array(z.object({})),
    }),
  ),
})

const QuestionnairesWidget = ({ patientId }: QuestionnairesWidgetProps) => {
  const form = useForm<QuestionnairesWidgetSchemaType>({
    resolver: zodResolver(questionnairesWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      questionnairesTabs: [
        {
          key: QuestionnaireTabs.PHQ_9_TAB,
          value: [{}, {}, {}],
        },
        {
          key: QuestionnaireTabs.GAD_7_TAB,
          value: [{}],
        },
        {
          key: QuestionnaireTabs.PCL_5_TAB,
          value: [{}],
        },
        {
          key: QuestionnaireTabs.SNAP_IV_TAB,
          value: [{}],
        },
      ],
    },
  })

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="questionnaires"
        title=""
        getData={() => []}
      >
        <QuestionnairesTabsBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { QuestionnairesWidget }
