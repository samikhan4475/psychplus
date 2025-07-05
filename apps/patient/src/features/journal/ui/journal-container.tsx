'use client'

import { ViewContainer } from '@/components-v2'
import { Box, Heading } from '@radix-ui/themes'
import React from 'react'
import { WeekView } from './week-view'

interface JournalContainerProps {
  children: React.ReactNode
}

const JournalContainer = ({ children }: JournalContainerProps) => {
  return (
    <ViewContainer className={'max-w-[1100px] px-4'}>
      <Heading size={{ initial: '6', sm: '8' }}>Journals</Heading>
      <Box className="sm:border-pp-gray-2 sm:rounded-4 sm:border">
        <WeekView />
        {children}
      </Box>
    </ViewContainer>
  )
}

export default JournalContainer 