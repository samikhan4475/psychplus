'use client'

import React, { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { FeatureCard, NoteFormContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import { useStore } from '@/features/pre-checkin-assessment/store'
import Complaints from './blocks/Complaints'
import Symptoms from './blocks/Symptoms'
import { transformIn, transformOut } from './data'
import { useHpiWidgetForm } from './hpi-widget-form'
import { getInitialValues } from './utils'

const PresentingSymptoms = () => {
  const { isSaveButtonPressed, save, resetSaveButtonState } = useStore()
  const profile = useProfileStore((state) => state.profile)
  const getNoteData = useNoteStore((state) => state.getNoteData)
  const data = getNoteData(NoteSectionName.NoteSectionHPI)
  const initialValue = useMemo(() => transformIn(data), [data])
  const form = useHpiWidgetForm(initialValue ?? getInitialValues())

  const onSave = async () => {
    const isCompleted =
      getNoteData(NoteSectionName.NoteSectionHPI).filter(
        (item) => !(item.sectionItem === '1' && item.sectionItemValue === '1'),
      ).length > 0

    save({ isTabCompleted: isCompleted, patientId: profile.id })
  }

  return (
    <FormProvider {...form}>
      <NoteFormContainer
        getData={transformOut(String(profile.id))}
        onSave={onSave}
        onError={resetSaveButtonState}
        isExternalSavePressed={isSaveButtonPressed}
        allowExternalSave
      >
        <FeatureCard
          title="Presenting Symptoms (HPI)"
          contentClassName="gap-3 relative"
          showTitleInsideCard
        >
          <Flex className="mt-2 w-full flex-col gap-1 lg:flex-row lg:items-center lg:justify-start lg:gap-3">
            <Complaints />
          </Flex>
          <Flex className="mt-3 w-full" direction="column" gap="5">
            <Symptoms />
          </Flex>
        </FeatureCard>
      </NoteFormContainer>
    </FormProvider>
  )
}

export { PresentingSymptoms }
