'use client'

import { PastPsychHxView } from '@/features/histories/ui/past-psych-hx'
import { NoteAccordion, NoteAccordionContentProps } from '@/features/note/ui'

const PastPsychHx = () => {
  return <NoteAccordion title="Past Psych Hx" content={renderPastPsychHx} />
}

const renderPastPsychHx = ({ handleSave }: NoteAccordionContentProps) => (
  <PastPsychHxView onSave={handleSave} />
)

export { PastPsychHx }
