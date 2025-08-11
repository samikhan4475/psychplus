'use client'

import { QuickNoteSectionItem } from '@/types'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { transformIn } from '../../aims-tab/form-aims/data'
import { useQuestionnaireFormVadprs } from '../../vadprs-tab/form-vadprs/use-vadprs-form'
import QuestionnairesFormVadprsTable from '../../vadprs-tab/form-vadprs/vadprs-table'

const VadprsView = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const initialValue = transformIn(data)
  const { ...form } = useQuestionnaireFormVadprs(initialValue)

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <QuestionnairesFormVadprsTable disabled />
      </Flex>
    </FormProvider>
  )
}

export { VadprsView } 
