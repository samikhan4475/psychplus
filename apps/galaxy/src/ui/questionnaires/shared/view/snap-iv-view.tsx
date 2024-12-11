'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import { SNAP_IV_LABELS } from '../../snap-iv-tab/constants'
import {
  QuestionnairesFormSnapIv,
  useQuestionnaireFormSnapIv,
} from '../../snap-iv-tab/form-snap-iv'
import { transformIn } from '../../snap-iv-tab/form-snap-iv/data'

const SnapIvView = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormSnapIv(initialValue)

  return (
    <FormProvider {...form}>
      <Flex maxWidth="100%" className="bg-white" px="3" py="1">
        <QuestionnairesFormSnapIv
          labels={SNAP_IV_LABELS}
          totalScore={totalScore}
          disabled
        />
      </Flex>
    </FormProvider>
  )
}

export { SnapIvView }
