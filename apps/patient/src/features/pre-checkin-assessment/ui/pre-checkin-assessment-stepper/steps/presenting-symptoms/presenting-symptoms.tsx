'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { NoteFormContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import Complaints from './blocks/Complaints'
import Symptoms from './blocks/Symptoms'
import { transformIn, transformOut } from './data'
import { useHpiWidgetForm } from './hpi-widget-form'
import { getInitialValues } from './utils'

const PresentingSymptoms = () => {
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const { getNoteData } = useNoteStore((state) => ({
    getNoteData: state.getNoteData,
  }))
  const data = getNoteData(NoteSectionName.NoteSectionHPI)
  const initialValue = transformIn(data)

  const form = useHpiWidgetForm(initialValue ?? getInitialValues())
  return (
    <FormProvider {...form}>
      <NoteFormContainer
        getData={transformOut(String(profile.id))}
        isComponentClose={false}
      >
        <Box>
          <Flex
            className="bg-white rounded-[8px] border border-[#d9e2fc] px-5 pb-9 pt-7"
            gap="1"
            direction="column"
          >
            <Text className="mb-3 text-[18px] font-medium text-[#1C2024] lg:text-[24px]">
              Presenting Symptoms (HPI)
            </Text>
            <Flex className="mt-2 w-full flex-col gap-1 lg:flex-row lg:items-center lg:justify-start lg:gap-3">
              <Complaints />
            </Flex>
            <Flex className="mt-3 w-full" direction="column" gap="5">
              <Symptoms />
            </Flex>
          </Flex>
        </Box>
      </NoteFormContainer>
    </FormProvider>
  )
}

export { PresentingSymptoms }
