'use client'

import React, { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import { ProceduresDialogWidgetClient } from '../procedures-dialog/procedures-dialog-widget.client'
import { ProceduresListTable } from './components'

const ProceduresListWidgetClient = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ToastProvider>
      <Box p="1">
        <Flex p="1" justify="between" align="center">
          <Text className="font-bold">Procedures</Text>
          <Button
            className="bg-[#151B4A]"
            size="1"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon /> Add
          </Button>
          <ProceduresDialogWidgetClient
            isOpen={isOpen}
            closeDialog={() => setIsOpen(false)}
          />
        </Flex>
        <ProceduresListTable />
      </Box>
    </ToastProvider>
  )
}

export { ProceduresListWidgetClient }
