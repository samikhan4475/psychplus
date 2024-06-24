'use client'

import { useRef } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { ToastProvider } from 'node_modules/@psychplus/ui/src/toast-provider'
import {
  HealthConcernDialogWidgetServer,
  useHealthConcernDialog,
} from '../health-concern-dialog'
import { HealthConcernsTable } from './components'
import { useStore } from './store'

const HealthConcernListWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  const { isDialogOpen, toggleDialog } = useHealthConcernDialog()
  const { patientId, noteId } = useStore()

  return (
    <ToastProvider>
      <Flex
        direction="column"
        className="h-fit min-w-fit bg-[#f0f4ff]"
        ref={ref}
        p="3"
      >
        <Flex justify="between" align="center" className="h-9 bg-[#FFFFFF] p-2">
          <Flex>
            <Text className="text-5" weight="bold">
              Health Concern
            </Text>
          </Flex>
          <Flex>
            <Button className="bg-[#151B4A]" size="1" onClick={toggleDialog}>
              <PlusIcon />
              Add
            </Button>
            <HealthConcernDialogWidgetServer
              isDialogOpen={isDialogOpen}
              toggleDialog={toggleDialog}
              patientId={patientId}
              noteId={noteId}
            />
          </Flex>
        </Flex>
        <Flex mt="1">
          <HealthConcernsTable />
        </Flex>
      </Flex>
    </ToastProvider>
  )
}

export { HealthConcernListWidgetClient }
