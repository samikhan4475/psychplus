'use client'

import { useState } from 'react'
import { Button, Text } from '@radix-ui/themes'
import { AddTemplateDialog } from './add-template-dialog'
import { useStore } from './store'

const EditTemplateButton = () => {
  const { selectedTemplate } = useStore()
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <Button
        variant="outline"
        color="gray"
        onClick={onOpen}
        className="text-black flex h-[24px] w-fit items-center justify-center px-2 py-1"
      >
        <Text className="text-pp-black-1 text-[12px] font-regular">Edit</Text>
      </Button>
      <AddTemplateDialog
        open={open}
        onClose={onClose}
        template={selectedTemplate}
      />
    </>
  )
}

export { EditTemplateButton }
