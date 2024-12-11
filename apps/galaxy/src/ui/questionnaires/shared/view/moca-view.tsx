'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import { MOCA_LABELS } from '../../moca-tab/constants'
import { QuestionnairesFormMoca } from '../../moca-tab/form-moca/aims-form'
import { transformIn } from '../../moca-tab/form-moca/data'
import { useQuestionnaireFormMoca } from '../../moca-tab/form-moca/use-moca-form'

const MocaView = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormMoca(initialValue)

  return (
    <FormProvider {...form}>
      <Flex maxWidth="100%" className="bg-white" px="3" py="1">
        <QuestionnairesFormMoca labels={MOCA_LABELS} totalScore={totalScore} disabled />
      </Flex>
    </FormProvider>
  )
}

export { MocaView }
