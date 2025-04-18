'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import { PSC_17_LABELS } from '../../psc-17-tab/constants'
import {
  QuestionnairesFormPsc17,
  useQuestionnaireFormPsc17,
} from '../../psc-17-tab/form-psc-17'
import { transformIn } from '../../psc-17-tab/form-psc-17/data'

const Psc17View = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormPsc17(initialValue)

  return (
    <FormProvider {...form}>
      <Flex maxWidth="100%" className="bg-white" px="3" py="1">
        <QuestionnairesFormPsc17
          labels={PSC_17_LABELS}
          totalScore={totalScore}
          disabled
        />
      </Flex>
    </FormProvider>
  )
}

export { Psc17View }
