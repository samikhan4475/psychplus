'use client'

import React, { ReactNode } from 'react'
import { Flex } from '@radix-ui/themes'
import { useStore } from '../quicknotes-store'

interface ActualNoteViewProps {
  children?: ReactNode
}

const ActualNoteViewClient = ({ children }: ActualNoteViewProps) => {
  const showActualNoteView = useStore((state) => state.showActualNoteView)

  if (!showActualNoteView) return null
  return <Flex id="actual-note-view">{children}</Flex>
}

export { ActualNoteViewClient }
