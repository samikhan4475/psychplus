import React, { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { NoteFormContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import { ConditionsBlock, OtherBlock } from './blocks'
import { transformIn, transformOut } from './data'
import { useFamilyPsychHxForm } from './family-psych-hx-form'

interface FamilyPsychHxProps {
  onSave?: () => void
  isEdit?: boolean
}

const FamilyPsychHxView = ({ onSave, isEdit }: FamilyPsychHxProps) => {
  const getNoteData = useNoteStore((state) => state.getNoteData)
  const data = getNoteData(NoteSectionName.NoteSectionFamilyPsychHx)
  const initialValue = useMemo(() => transformIn(data), [data])
  const form = useFamilyPsychHxForm(initialValue)
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
          <ConditionsBlock />
          <OtherBlock />
        </Flex>
      </NoteFormContainer>
    </FormProvider>
  )
}

export { FamilyPsychHxView }
