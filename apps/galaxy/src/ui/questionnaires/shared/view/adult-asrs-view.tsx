'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import { Adult_ASRS_LABELS } from '../../adult-asrs-tab/constants'
import {
  QuestionnairesFormAdultAsrs,
  useQuestionnairesFormAdultAsrs,
} from '../../adult-asrs-tab/form-adult-asrs'
import { transformIn } from '../../adult-asrs-tab/form-adult-asrs/data'

const AdultAsrsView = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnairesFormAdultAsrs(initialValue)

  return (
    <FormProvider {...form}>
      <Flex maxWidth="100%" className="bg-white" px="3" py="1">
        <QuestionnairesFormAdultAsrs
          labels={Adult_ASRS_LABELS}
          totalScore={totalScore}
          disabled
        />
      </Flex>
    </FormProvider>
  )
}

export { AdultAsrsView }
