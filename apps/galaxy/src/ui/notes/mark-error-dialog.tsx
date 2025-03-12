'use client'

import React, { useState } from 'react'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { markToErrorAction } from './actions/mark-error'
import { useStore } from './store'
import { Tabs } from './types'
import { useNoteActions } from './use-note-actions'

interface MarkErrorDialogProps {
  isOpen?: boolean
  removecloseDialog: () => void
}

const MarkErrorDialog = ({
  isOpen,
  removecloseDialog,
}: MarkErrorDialogProps) => {
  const [loading, setLoading] = useState(false)
  const {
    fetch,
    patientId,
    isInboxNotes,
    fetchStaffNotes,
    tab,
    page,
    formData,
  } = useStore((state) => ({
    fetch: state.fetch,
    patientId: state.patientId,
    tab: state.tab,
    isInboxNotes: state.isInboxNotes,
    fetchStaffNotes: state.fetchStaffNotes,
    page: state.page,
    formData: state.formData,
  }))
  const { validateAndPreparePayload } = useNoteActions()

  const handleSubmit = async () => {
    setLoading(true)
    const payload = validateAndPreparePayload()

    if (!payload) return

    const result = await markToErrorAction(payload)

    if (result.state === 'error') {
      toast.error(result?.error || 'Failed to mark as error')
      setLoading(false)
      removecloseDialog()
      return
    }

    toast.success('Marked as error successfully')
    const statuses =
      tab === Tabs.PENDING_NOTES ? ['pending'] : ['SignedPending']
    isInboxNotes
      ? fetchStaffNotes({ ...formData, status: statuses }, page, true)
      : fetch({ patientId })
    removecloseDialog()
    setLoading(false)
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (!dialogNewState && isOpen) {
          removecloseDialog()
        }
      }}
    >
      <Dialog.Content className="bg-pp-warning-bg relative max-w-[440px] rounded-1 border-2 border-amber-10 p-4 pb-5 [box-shadow:none]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Flex direction="row" gap="3" align="start">
          <TriangleAlert className="min-w-6 text-amber-9" size={24} />
          <Flex direction="column" gap="1" pt="1">
            <Dialog.Title size="4" className="m-0 font-medium">
              Mark Note as Error
            </Dialog.Title>
            <Text as="p" size="2" mt="2">
              Are you sure you want to mark this note as Error?
            </Text>
            <Flex justify="start" width="100%" gap="2" mt="3">
              <Dialog.Close>
                <Button className="border-pp-gray-2 text-pp-black-3 bg-white w-[166px] cursor-pointer border border-solid">
                  <Text size="2">Cancel</Text>
                </Button>
              </Dialog.Close>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className={`bg-pp-link-text text-white w-[166px] cursor-pointer`}
              >
                <Text size="2">Proceed</Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { MarkErrorDialog }
