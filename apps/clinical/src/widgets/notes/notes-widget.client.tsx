'use client'

import { useRef } from 'react'
import { Flex } from '@radix-ui/themes'
import { NOTES_WIDGET } from '@psychplus/widgets'
import {
  usePublishClosePopover,
  usePublishLoaded,
  usePublishSize,
} from '@psychplus/widgets/hooks'
import { NotesHeader } from './components'
import { NotesLayout } from './layout'

const NotesWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)
  usePublishLoaded(NOTES_WIDGET)
  usePublishSize(NOTES_WIDGET, ref)
  usePublishClosePopover(NOTES_WIDGET)

  return (
    <Flex direction='column' className="h-screen min-h-[650px]" ref={ref}>
      <NotesHeader />
      <NotesLayout />
    </Flex>
  )
}

export { NotesWidgetClient }
