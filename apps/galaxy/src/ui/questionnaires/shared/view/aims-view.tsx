'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import { AIMS_LABELS } from '../../aims-tab/constants'
import { QuestionnairesFormAims } from '../../aims-tab/form-aims/aims-form'
import { transformIn } from '../../aims-tab/form-aims/data'
import { useQuestionnaireFormAims } from '../../aims-tab/form-aims/use-aims-form'

const AimsView = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormAims(initialValue)

  return (
    <FormProvider {...form}>
      <Flex maxWidth="100%" className="bg-white" px="3" py="1">
        <QuestionnairesFormAims labels={AIMS_LABELS} totalScore={totalScore} disabled />
      </Flex>
    </FormProvider>
  )
}

export { AimsView }
