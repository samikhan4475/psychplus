'use client'

import { FamilyPsychHxView } from '@/features/histories/ui'
import { NoteAccordion, NoteAccordionContentProps } from '@/features/note/ui'

const FamilyPsychHx = () => {
  return <NoteAccordion title="Family Hx" content={renderFamilyPsychHx} />
}

const renderFamilyPsychHx = ({ handleSave }: NoteAccordionContentProps) => (
  <FamilyPsychHxView onSave={handleSave} />
)

export { FamilyPsychHx }
