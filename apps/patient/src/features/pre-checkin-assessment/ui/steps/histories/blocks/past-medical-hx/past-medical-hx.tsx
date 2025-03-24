'use client'

import { PastMedicalHxView } from '@/features/histories/ui'
import { NoteAccordion, NoteAccordionContentProps } from '@/features/note/ui'

const PastMedicalHx = () => {
  return <NoteAccordion title="Medical Hx" content={renderPastMedicalHx} />
}

const renderPastMedicalHx = ({ handleSave }: NoteAccordionContentProps) => (
  <PastMedicalHxView onSave={handleSave} />
)

export { PastMedicalHx }
