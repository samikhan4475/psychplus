'use client'

import React from 'react'
import { SocialHxView } from '@/features/histories/ui'
import { NoteAccordion, NoteAccordionContentProps } from '@/features/note/ui'

const SocialHx = () => {
  return <NoteAccordion title="Social Hx" content={renderSocialHx} />
}

const renderSocialHx = ({ handleSave }: NoteAccordionContentProps) => (
  <SocialHxView onSave={handleSave} />
)

export { SocialHx }
