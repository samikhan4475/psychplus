'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { LoadingPlaceholder } from '@/components'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { useStore } from './quicknotes-store'

const QuickNotesMarkAsError = () => {
  const {
    isMarkedAsError,
    closeMarkErrorModal,
    markAsError,
    errorMessage,
    loading,
  } = useStore((state) => ({
    isMarkedAsError: state.isMarkedAsError,
    closeMarkErrorModal: state.closeMarkErrorModal,
    markAsError: state.markAsError,
    errorMessage: state.errorMessage,
    loading: state.loading,
  }))

  const patientId = useParams().id as string
  const appointmentId = useSearchParams().get('id') as string

  return (
    <Dialog.Root
      open={isMarkedAsError}
      onOpenChange={(dialogNewState) => {
        if (!dialogNewState && isMarkedAsError) {
          closeMarkErrorModal(!isMarkedAsError)
        }
      }}
    >
      <Dialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border relative max-w-[440px] rounded-2 border p-4 pb-5 [box-shadow:none]">
        <CloseDialogTrigger />

        <Flex direction="row" gap="3" align="start">
          <TriangleAlert className="min-w-6 text-pp-warning-border" size={24} />
          <Flex direction="column" gap="3" pt="1" className="pr-4" width="100%">
            <Dialog.Title size="4" className="m-0 font-medium">
              <Text size="4">
                {loading ? 'Marking Note as Error' : 'Mark Note as Error'}
              </Text>
            </Dialog.Title>

            {loading ? (
              <LoadingPlaceholder className="mt-[38px]" />
            ) : (
              <>
                <Text>{errorMessage}</Text>
                <Flex
                  justify="start"
                  width="100%"
                  gap="2"
                  className="mt-[38px]"
                >
                  <Dialog.Close>
                    <Button
                      className={`bg-pp-link-text text-white w-[166px] cursor-pointer`}
                    >
                      <Text size="2">Cancel</Text>
                    </Button>
                  </Dialog.Close>
                  <Button
                    onClick={() => markAsError({ patientId, appointmentId })}
                    className="border-pp-gray-2 text-pp-black-3 bg-white w-[166px] cursor-pointer border border-solid"
                  >
                    <Text size="2">Proceed</Text>
                  </Button>
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { QuickNotesMarkAsError }
