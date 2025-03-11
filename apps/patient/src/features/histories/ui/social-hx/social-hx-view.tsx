import React from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { NoteFormContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import { ConditionsBlock } from './blocks'
import { TraumaHxBlock } from './blocks/trauma-hx-block'
import { transformIn, transformOut } from './data'
import { useSocialHxForm } from './social-hx-form'

interface SocialHxProps {
  onSave?: () => void
  isEdit?: boolean
}

const SocialHxView = ({ onSave, isEdit }: SocialHxProps) => {
  const getNoteData = useNoteStore((state) => state.getNoteData)
  const profile = useProfileStore((state) => state.profile)
  const data = getNoteData(NoteSectionName.NoteSectionSocialHx)
  const initialValue = transformIn(data)
  const form = useSocialHxForm(initialValue)

  return (
    <FormProvider {...form}>
      <NoteFormContainer
        getData={transformOut(String(profile.id))}
        onSave={onSave}
        isEdit={isEdit}
      >
        <Flex gap="2" wrap="wrap" direction="column">
          <ConditionsBlock />
          <TraumaHxBlock />
        </Flex>
      </NoteFormContainer>
    </FormProvider>
  )
}

export { SocialHxView }
