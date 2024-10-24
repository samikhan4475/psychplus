import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ViewMessageActions } from './view-message-actions'
import { ViewMessageAttachment } from './view-message-attachment'
import { ViewMessageHeader } from './view-message-header'
import { ViewMessageHeaderTitle } from './view-message-header-title'
import { ViewMessageProfileDetails } from './view-message-profile-details'
import { ViewMessageText } from './view-message-text'

const ReviewEmail = () => {
  return (
    <Flex direction="column" className="w-full">
      <ViewMessageHeader />
      <Box className="bg-white rounded-lg shadow-lg  p-6 py-4">
        <ViewMessageHeaderTitle />
        <ViewMessageProfileDetails />
        <ViewMessageText />
        <ViewMessageAttachment />
        <ViewMessageActions />
      </Box>
    </Flex>
  )
}

export { ReviewEmail }
