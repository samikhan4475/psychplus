'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert, X } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { removeToCosignerAction } from './actions/remove-to-cosigner'
import { useNoteActions } from './use-note-actions'

const schema = z.object({
  provider: z.number().min(1, 'Provider is required'),
})
type SchemaType = z.infer<typeof schema>

interface RemoveCosignDialogProps {
  isOpen?: boolean
  removecloseDialog: () => void
}

const RemoveCosignDialog = ({
  isOpen,
  removecloseDialog,
}: RemoveCosignDialogProps) => {
  const { validateAndPreparePayload } = useNoteActions()
  const [loading, setLoading] = useState(false)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      provider: 1,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    setLoading(true)
    const payload = validateAndPreparePayload()
    if (!payload) return
    const result = await removeToCosignerAction({ ...payload })

    if (result.state === 'error') {
      toast.error(result?.error || 'Failed to removeCosigner')
      removecloseDialog()
      setLoading(false)
      return
    }

    toast.success('Co-signer removed successfully')
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
              Remove Cosigner
            </Dialog.Title>
            <Text as="p" size="2" mt="2">
              Are you sure you want to remove the cosigner?
            </Text>

            <Flex justify="start" width="100%" gap="2" mt="3">
              <Dialog.Close>
                <Button className="border-pp-gray-2 text-pp-black-3 bg-white w-[166px] cursor-pointer border border-solid">
                  <Text size="2">Cancel</Text>
                </Button>
              </Dialog.Close>
              <Button
                disabled={loading}
                className={`bg-pp-link-text text-white w-[166px] cursor-pointer`}
                onClick={form.handleSubmit(onSubmit)}
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

export { RemoveCosignDialog }
