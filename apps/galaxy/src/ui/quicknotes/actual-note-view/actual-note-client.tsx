'use client'

import React, { ReactNode } from 'react'
import { Flex } from '@radix-ui/themes'
import { useStore } from '../store'

interface ActualNoteViewProps {
  children?: ReactNode
}

const ActualNoteViewClient = ({ children }: ActualNoteViewProps) => {
  const { showActualNoteView } = useStore((state) => ({
    showActualNoteView: state.showActualNoteView,
  }))

  if (!showActualNoteView) return null
  return <Flex>{children}</Flex>
}

export { ActualNoteViewClient }
