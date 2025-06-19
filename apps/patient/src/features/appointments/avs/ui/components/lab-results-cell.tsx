import { useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog, Flex, ScrollArea, Text, Tooltip } from '@radix-ui/themes'
import { LabResult, LabTest } from '../../types'
import LabResultsTable from './lab-results-table'
import { LabTestsButtons } from './lab-tests-buttons'

interface LabResultsCellProps {
  labResults: LabResult[]
  labTests: LabTest[]
}

const LabResultsCell = ({ labResults, labTests }: LabResultsCellProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTestId, setSelectedTestId] = useState('')

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setIsOpen(false)
      setSelectedTestId('')
    }
  }

  const handleLabTest = (labTest: LabTest) => {
    setSelectedTestId(labTest?.id ?? '')
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Tooltip content="View Results" side="top" align="center">
        <Dialog.Trigger>
          <Text size="1" weight="regular" className="text-pp-blue-3">
            View Results
          </Text>
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content className="relative max-h-[80vh] max-w-[70vw] overflow-y-scroll">
        <Flex justify="end" align="center" mb="2">
          <Dialog.Close
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <Cross2Icon />
          </Dialog.Close>
        </Flex>
        <ScrollArea>
          <LabTestsButtons
            labTests={labTests}
            selectedTestId={selectedTestId}
            handleLabTest={handleLabTest}
          />
          <LabResultsTable
            labResults={labResults}
            selectedTestId={selectedTestId}
          />
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { LabResultsCell }
