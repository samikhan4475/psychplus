'use client'

import { FamilyPsychHxView } from '@/features/histories/ui'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import { NoteSectionItem } from '@/features/note/types'
import { NoteAccordion, NoteAccordionContentProps } from '@/features/note/ui'

const FamilyPsychHx = () => {
  const getNoteData = useNoteStore((state) => state.getNoteData)
  const data = getNoteData(NoteSectionName.NoteSectionFamilyPsychHx)

  return (
    <NoteAccordion
      title="Family Psych Hx"
      data={data}
      content={renderFamilyPsychHx}
      sectionName={NoteSectionName.NoteSectionFamilyPsychHx}
    />
  )
}

const renderFamilyPsychHx = ({
  handleSave,
  isEdit,
}: NoteAccordionContentProps<NoteSectionItem>) => (
  <FamilyPsychHxView onSave={handleSave} isEdit={isEdit} />
)

export { FamilyPsychHx }
