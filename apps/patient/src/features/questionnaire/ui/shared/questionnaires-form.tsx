import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { ToggleableForm } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { addNoteDetails } from '@/features/note/actions'
import { NoteSectionName } from '@/features/note/constants'
import { NoteData } from '@/features/note/types'
import { transformOut } from './data'
import { QuestionnaireSchemaType } from './questionnaires-schema'
import { QuestionnairesTable } from './questionnaires-table'

interface QuestionnairesFormProps {
  data: NoteData[]
  labels: string[]
  classNameHeaderCell?: string
  classNameCell?: string
  disabled?: boolean
  handleSave?: () => void
  sectionName: NoteSectionName
}

const QuestionnairesForm = ({
  data,
  labels,
  classNameHeaderCell,
  classNameCell,
  disabled = false,
  handleSave,
  sectionName,
}: QuestionnairesFormProps) => {
  const params = useSearchParams()
  const appointmentId = params.get('id')
  const form = useFormContext<QuestionnaireSchemaType>()
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))
  const submitAction = async (data: QuestionnaireSchemaType) => {
    const payload = await transformOut(
      String(profile.id),
      String(appointmentId),
      sectionName,
    )(data)

    return addNoteDetails(payload)
  }

  return (
    <ToggleableForm
      form={form}
      submitAction={submitAction}
      onSuccess={handleSave}
      onFormClose={handleSave}
      isEdit={true}
    >
      <QuestionnairesTable
        labels={labels}
        data={data}
        classNameHeaderCell={classNameHeaderCell}
        classNameCell={classNameCell}
        disabled={disabled}
      />
    </ToggleableForm>
  )
}

export { QuestionnairesForm }
