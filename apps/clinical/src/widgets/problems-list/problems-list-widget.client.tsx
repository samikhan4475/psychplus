'use client'

import React, { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import { ProblemsDialogWidgetClient } from '../problems-dialog/problems-dialog-widget.client'
import { ProblemsListTable } from './components'

const ProblemsListWidgetClient = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ToastProvider>
      <Box p="1">
        <Flex p="1" justify="between" align="center">
          <Text className="font-bold">Problem List</Text>
          <Button
            className="bg-[#151B4A]"
            size="1"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon /> Add
          </Button>
          <ProblemsDialogWidgetClient
            isOpen={isOpen}
            closeDialog={() => setIsOpen(false)}
          />
        </Flex>
        <ProblemsListTable />
      </Box>
    </ToastProvider>
  )
}

export { ProblemsListWidgetClient }
