'use client'

import React, { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import { FunctionalCognitiveDialogWidgetClient } from '../functional-cognitive-dialog/functional-cognitive-dialog-widget.client'
import { FunctionalCognitiveListTable } from './components'

const FunctionalCognitiveListWidgetClient = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openDialogWithType = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  return (
    <ToastProvider>
      <Box p="1">
        <Flex p="1" justify="between" align="center">
          <Text className="font-bold">Cognitive / Functional</Text>
          <Button
            className="bg-[#151B4A]"
            size="1"
            onClick={openDialogWithType}
          >
            <PlusIcon /> Add
          </Button>
          <FunctionalCognitiveDialogWidgetClient
            isOpen={isOpen}
            closeDialog={closeDialog}
          />
        </Flex>
        <FunctionalCognitiveListTable />
      </Box>
    </ToastProvider>
  )
}

export { FunctionalCognitiveListWidgetClient }
