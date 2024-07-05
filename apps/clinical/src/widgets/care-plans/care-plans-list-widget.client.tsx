'use client'

import React, { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import { CarePlansDialogWidgetClient } from '../care-plans-dialog/care-plans-dialog-widget.client'
import { CareplansListTable } from './components'

const CareplansListWidgetClient = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openDialogWithType = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  return (
    <ToastProvider>
      <Box p="1">
        <Flex p="1" justify="between" align="center">
          <Text className="font-bold">Care Plan</Text>
          <Button
            className="bg-[#151B4A]"
            size="1"
            onClick={openDialogWithType}
          >
            <PlusIcon /> Add
          </Button>
          <CarePlansDialogWidgetClient
            isOpen={isOpen}
            closeDialog={closeDialog}
          />
        </Flex>
        <CareplansListTable />
      </Box>
    </ToastProvider>
  )
}

export { CareplansListWidgetClient }
