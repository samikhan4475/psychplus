'use client'

import { useState } from 'react'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { PlusIcon, X } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Codeset } from '@/ui/assigning-authorities/types'
import { SchemaType } from '../../codes'
import { AddCodesetForm } from './add-codeset-form'

const AddCodesetButton = ({
  activeCodesets,
  setActiveCodesets,
}: {
  activeCodesets?: Codeset[]
  setActiveCodesets: (activeCodesets: Codeset[]) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)
  const form = useFormContext<SchemaType>()

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen)
        form.reset({
          newCodesetCode: undefined,
          editableCodesetCode: undefined,
        })
      }}
    >
      <Dialog.Trigger>
        <Button size="1" highContrast type="button" className="ml-auto">
          <PlusIcon height={14} width={14} strokeWidth={2} />
          New
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="w-[600px] rounded-2 p-5">
        <Flex justify="between" align="start" gap="2">
          <Dialog.Title size="5" weight="bold">
            Codeset Properties
          </Dialog.Title>

          <Dialog.Close className="cursor-pointer">
            <X size={22} strokeWidth={1} />
          </Dialog.Close>
        </Flex>
        <AddCodesetForm
          onClose={handleClose}
          activeCodesets={activeCodesets}
          setActiveCodesets={setActiveCodesets}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddCodesetButton }
