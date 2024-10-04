'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { WidgetFormContainer } from '@/components'
import {
  QuestionnairesFilledBy,
  QuestionnairesStatus,
  QuestionnaireTabs,
} from '../constants'
import { SNAP_IV_SECTIONS } from '../snap-iv-tab/constants'
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
          value: [
            {
              totalScore: 9,
              status: QuestionnairesStatus.Completed,
              filledBy: QuestionnairesFilledBy.Provider,
            },
            {
              totalScore: 21,
              status: QuestionnairesStatus.Completed,
              filledBy: QuestionnairesFilledBy.Patient,
            },
            {
              totalScore: 21,
              status: QuestionnairesStatus.Completed,
              filledBy: QuestionnairesFilledBy.Patient,
            },
            {
              totalScore: 21,
              status: QuestionnairesStatus.Completed,
              filledBy: QuestionnairesFilledBy.Patient,
            },
            {
              totalScore: 2,
              status: QuestionnairesStatus.Completed,
              filledBy: QuestionnairesFilledBy.Provider,
            },
            {
              totalScore: 9,
              status: QuestionnairesStatus.Completed,
              filledBy: QuestionnairesFilledBy.Patient,
            },
            {
              totalScore: 9,
              status: QuestionnairesStatus.Completed,
              filledBy: QuestionnairesFilledBy.Provider,
            },
            {
              totalScore: 14,
              status: QuestionnairesStatus.Completed,
              filledBy: QuestionnairesFilledBy.Patient,
            },
            {
              totalScore: 9,
              status: QuestionnairesStatus.Completed,
              filledBy: QuestionnairesFilledBy.Provider,
            },
          ],
        },
        {
          key: QuestionnaireTabs.GAD_7_TAB,
          value: [
            {
              totalScore: 13,
              status: QuestionnairesStatus.Completed,
              filledBy: QuestionnairesFilledBy.Provider,
            },
          ],
        },
        {
          key: QuestionnaireTabs.SNAP_IV_TAB,
          value: [
            {
              totalScore: 9,
              status: QuestionnairesStatus.Completed,
              filledBy: QuestionnairesFilledBy.Patient,
              sectionName: SNAP_IV_SECTIONS.Inattention,
            },
          ],
        },
        {
          key: QuestionnaireTabs.PCL_5_TAB,
          value: [
            {
              totalScore: 45,
              status: QuestionnairesStatus.Requested,
              reminderToCompleteQuestionnaireAlreadySent: true,
            },
          ],
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
