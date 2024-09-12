'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog, Text } from '@radix-ui/themes'
import { ToastProvider } from '@/providers'
import { ResultWBC } from '../types'
import ResultsTable from './test-result-table'

const ResultsDialogWidgetClient = ({
  handlerWpcClose,
  viewWpcResult,
  isWpcModalOpened,
  wpcEditData,
  labTest,
}: ResultWBC) => {
  if (!labTest) {
    return <Text>Required LabTest</Text>
  }
  if (!wpcEditData) {
    return <Text>Required wpcEditData</Text>
  }
  return (
    <Dialog.Root open={isWpcModalOpened}>
      <Dialog.Content className="relative max-w-[1280px] rounded-4 p-6 py-8 font-bold text-[#151B4A]">
        <Dialog.Close
          onClick={handlerWpcClose}
          className="absolute right-4 top-4 cursor-pointer"
        >
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="6">
          {viewWpcResult ? 'View' : 'Add'} Results for{' '}
          {labTest?.testName ?? labTest?.orderingLab?.name}
        </Dialog.Title>
        <ToastProvider>
          <ResultsTable
            viewWpcResult={viewWpcResult}
            handlerWpcClose={handlerWpcClose}
            labTest={labTest}
            wpcEditData={wpcEditData}
          />
        </ToastProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ResultsDialogWidgetClient }
