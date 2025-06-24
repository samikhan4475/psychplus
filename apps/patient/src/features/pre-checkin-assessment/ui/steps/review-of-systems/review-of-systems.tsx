'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { NoteFormContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import { useStore } from '@/features/pre-checkin-assessment/store'
import {
  CardiovascularBlock,
  ConstitutionalBlock,
  EntMouthBlock,
  EyesBlock,
  GastrointestinalBlock,
  GenitourinaryBlock,
  MusculoskeletalBlock,
  NeuroBlock,
  RespiratoryBlock,
  SkinBlock,
} from './blocks'
import { CheckAllNoConcernCell } from './blocks/check-all-no-concern-cell'
import { transformIn, transformOut } from './data'
import { useRosForm } from './review-of-systems-widget-form'

const ReviewOfSystems: React.FC = () => {
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const { getNoteData } = useNoteStore((state) => ({
    getNoteData: state.getNoteData,
  }))
  const data = getNoteData(NoteSectionName.NoteSectionReviewOfSystem)
  const initialValue = transformIn(data)

  const form = useRosForm(initialValue)
  const { isSaveButtonPressed, save, resetSaveButtonState } = useStore()

  const onSave = async () => {
    const isCompleted =
      getNoteData(NoteSectionName.NoteSectionReviewOfSystem).filter(
        (item) =>
          !(item.sectionItem === 'empty' && item.sectionItemValue === 'true'),
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
        <Box className="bg-white rounded-2 border border-gray-5 p-6 pb-8">
          <Flex align="center" className="mb-4 flex-col gap-[19px] sm:flex-row">
            <Text className="text-[18px] md:text-[22px] font-medium">Review of Systems</Text>

            <CheckAllNoConcernCell form={form} />
          </Flex>
          <Box className="gap:4 grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <ConstitutionalBlock />
            <EntMouthBlock />
            <EyesBlock />
            <CardiovascularBlock />
            <RespiratoryBlock />
            <GastrointestinalBlock />
            <GenitourinaryBlock />
            <SkinBlock />
            <MusculoskeletalBlock />
            <NeuroBlock />
          </Box>
        </Box>
      </NoteFormContainer>
    </FormProvider>
  )
}
export { ReviewOfSystems }
