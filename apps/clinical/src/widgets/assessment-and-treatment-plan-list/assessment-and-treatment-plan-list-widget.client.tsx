'use client'

import React, { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import { AssessmentAndTreatmentPlanDialogWidgetClient } from '../assessment-and-treatment-plan-dialog/assessment-and-treatment-plan-dialog-widget.client'
import { AssessmentAndTreatmnetPlanListTable } from './components'

const AssessmentAndTreatmnetPlansListWidgetClient = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ToastProvider>
      <Box p="1">
        <Flex p="1" justify="between" align="center">
          <Text className="font-bold">Assessment & Treatment Plan</Text>
          <Button
            className="bg-[#151B4A]"
            size="1"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon /> Add Assessment & Treatment Plan
          </Button>
          <AssessmentAndTreatmentPlanDialogWidgetClient
            isOpen={isOpen}
            closeDialog={() => setIsOpen(false)}
          />
        </Flex>
        <AssessmentAndTreatmnetPlanListTable />
      </Box>
    </ToastProvider>
  )
}

export { AssessmentAndTreatmnetPlansListWidgetClient }
