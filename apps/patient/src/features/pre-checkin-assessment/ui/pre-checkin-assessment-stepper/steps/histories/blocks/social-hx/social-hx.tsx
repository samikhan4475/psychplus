'use client'

import React from 'react'
import { SocialHxView } from '@/features/histories/ui'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import { NoteSectionItem } from '@/features/note/types'
import { NoteAccordion, NoteAccordionContentProps } from '@/features/note/ui'

const SocialHx = () => {
  const { getNoteData } = useNoteStore((state) => ({
    getNoteData: state.getNoteData,
  }))
  const data = getNoteData(NoteSectionName.NoteSectionSocialHx)

  return (
    <NoteAccordion
      title="Social Hx"
      data={data}
      content={renderSocialHx}
      sectionName={NoteSectionName.NoteSectionSocialHx}
    />
  )
}

const renderSocialHx = ({
  handleSave,
  isEdit,
}: NoteAccordionContentProps<NoteSectionItem>) => (
  <SocialHxView onSave={handleSave} isEdit={isEdit} />
)

export { SocialHx }
