import { LoadingPlaceholder } from '@/components'
import { Appointment } from '@/types'
import { QuickNotesSaveButton } from '@/ui/quicknotes/quicknotes-save-button'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Box, Dialog, Flex, Text } from '@radix-ui/themes'
import React, { useEffect } from 'react'
import { HpiHistoryDetailsPanel } from './hpi-history-details'
import { HpiHistoryFilterForm } from './hpi-history-filter-form'
import { HpiHistoryTable } from './hpi-history-table'
import { useHpiHistoryStore } from './store'

interface HpiHistoryDialogProps {
  patientId: string
  appointment: Appointment
}

export const HpiHistoryDialog: React.FC<HpiHistoryDialogProps> = ({
  patientId,
  appointment
}) => {
  const { fetchHistory, history, loading } = useHpiHistoryStore()

  useEffect(() => {
    fetchHistory({ patientId })
  }, [patientId])

  const noHistoryFound = !history.length

  let content: React.ReactNode

  if (loading) {
    content = (
      <Box className="flex items-center justify-center" height="70vh">
        <LoadingPlaceholder />
      </Box>
    )
  } else if (noHistoryFound) {
    content = (
      <Box className="flex items-center justify-center" height="70vh">
        <Text className="text-sm text-center">No Result Found</Text>
      </Box>
    )
  } else {
    content = (
      <Flex className="flex min-h-0 flex-1 overflow-hidden">
        <HpiHistoryTable />
        <HpiHistoryDetailsPanel />
      </Flex>
    )
  }

  return (
    <>
      <Flex justify="between" align="center" pr="3" mb="2">
        <Dialog.Title size="5" weight="bold" className="text-black m-0 font-sans">
          HPI/Presenting Symptoms
        </Dialog.Title>
        <Dialog.Close className="cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
      </Flex>

      <Flex className="flex-row flex-wrap items-center gap-2 my-2">
        <QuickNotesSaveButton appointment={appointment} patientId={patientId} isAddToNotes disabled={loading || noHistoryFound} />
        <HpiHistoryFilterForm patientId={patientId} />
      </Flex>

      {content}
    </>
  )
}

