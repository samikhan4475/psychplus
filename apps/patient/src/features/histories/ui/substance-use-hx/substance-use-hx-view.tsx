import React, { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { NoteFormContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import { AlcoholBlock, DrugsBlock, TobaccoBlock } from './blocks'
import { transformIn, transformOut } from './data'
import { useSubstanceUseHxForm } from './substance-use-hx-form'

interface SubstanceUseHxProps {
  onSave?: () => void
  isEdit?: boolean
}

const SubstanceUseHxView = ({ onSave, isEdit }: SubstanceUseHxProps) => {
  const getNoteData = useNoteStore((state) => state.getNoteData)
  const data = getNoteData(NoteSectionName.NoteSectionSubstanceUseHx)
  const initialValue = useMemo(() => transformIn(data), [data])
  const form = useSubstanceUseHxForm(initialValue)
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
          <TobaccoBlock />
          <AlcoholBlock />
          <DrugsBlock />
        </Flex>
      </NoteFormContainer>
    </FormProvider>
  )
}

export { SubstanceUseHxView }
