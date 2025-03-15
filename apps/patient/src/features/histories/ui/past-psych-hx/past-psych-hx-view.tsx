import React, { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { NoteFormContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import {
  ConditionsBlock,
  PsychHospitalizationsBlock,
  SuicideAttemptsBlock,
} from './blocks'
import { transformIn, transformOut } from './data'
import { usePastPsychHxForm } from './past-psych-hx-form'

interface PastPsychHxProps {
  onSave?: () => Promise<void>
  isEdit?: boolean
}

const PastPsychHxView = ({ onSave, isEdit }: PastPsychHxProps) => {
  const getNoteData = useNoteStore((state) => state.getNoteData)
  const data = getNoteData(NoteSectionName.NoteSectionPastPsychHx)
  const initialValue = useMemo(() => transformIn(data), [data])
  const form = usePastPsychHxForm(initialValue)
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  return (
    <FormProvider {...form}>
      <NoteFormContainer
        getData={transformOut(String(profile.id))}
        onSave={onSave}
        isEdit={isEdit}
      >
        <Flex gap="2" wrap="wrap" direction="column">
          <Flex align="center" gap="2" justify={'start'}>
            <PsychHospitalizationsBlock />
            <SuicideAttemptsBlock />
          </Flex>
          <ConditionsBlock />
        </Flex>
      </NoteFormContainer>
    </FormProvider>
  )
}

export { PastPsychHxView }
