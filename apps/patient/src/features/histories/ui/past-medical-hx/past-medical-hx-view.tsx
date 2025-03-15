import React, { useMemo } from 'react'
import { FormProvider } from 'react-hook-form'
import { NoteFormContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import { ConditionsBlock } from './blocks'
import { transformIn, transformOut } from './data'
import { usePastMedicalHxForm } from './past-medical-hx-form'

interface PastMedicalHxProps {
  onSave?: () => Promise<void>
  isEdit?: boolean
}

const PastMedicalHxView = ({ onSave, isEdit }: PastMedicalHxProps) => {
  const getNoteData = useNoteStore((state) => state.getNoteData)
  const data = getNoteData(NoteSectionName.NoteSectionPastMedicalHx)
  const initialValue = useMemo(() => transformIn(data), [data])
  const form = usePastMedicalHxForm(initialValue)
  const profile = useProfileStore((state) => state.profile)

  return (
    <FormProvider {...form}>
      <NoteFormContainer
        getData={transformOut(String(profile.id))}
        onSave={onSave}
        isEdit={isEdit}
      >
        <ConditionsBlock />
      </NoteFormContainer>
    </FormProvider>
  )
}

export { PastMedicalHxView }
