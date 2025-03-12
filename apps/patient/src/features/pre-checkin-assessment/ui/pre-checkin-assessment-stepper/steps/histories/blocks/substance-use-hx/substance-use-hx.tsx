'use client'

import { SubstanceUseHxView } from '@/features/histories/ui/substance-use-hx'
import { NoteAccordion, NoteAccordionContentProps } from '@/features/note/ui'

const SubstanceUseHx = () => {
  return (
    <NoteAccordion title="Substance Use Hx" content={renderSubstanceUseHx} />
  )
}

const renderSubstanceUseHx = ({ handleSave }: NoteAccordionContentProps) => (
  <SubstanceUseHxView onSave={handleSave} />
)

export { SubstanceUseHx }
