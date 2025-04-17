'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import { CSSRS_LABELS } from '../../c-ssrs-tab/constants'
import { QuestionnairesFormCssrs } from '../../c-ssrs-tab/form-c-ssrs/c-ssrs-form'
import { transformIn } from '../../c-ssrs-tab/form-c-ssrs/data'
import { useQuestionnaireFormCssrs } from '../../c-ssrs-tab/form-c-ssrs/use-c-ssrs-form'

interface CssrsViewProps {
  data: QuickNoteSectionItem[]
}

const CssrsView = ({ data }: CssrsViewProps) => {
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormCssrs(initialValue)

  return (
    <FormProvider {...form}>
      <Flex maxWidth="100%" className="bg-white" px="3" py="1">
        <QuestionnairesFormCssrs
          labels={CSSRS_LABELS}
          totalScore={totalScore}
          disabled
        />
      </Flex>
    </FormProvider>
  )
}

export { CssrsView }
