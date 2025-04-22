'use client'

import { useState } from 'react'
import { Dialog, Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { Organization, Practice } from '../../types'
import { AddOrganizationPracticeButton } from './add-organization-practice-button'
import { PracticeForm } from './practice-form'

interface DialogProps {
  organizationId?: string
  practiceData?: Practice
  data: Organization
}

const PracticeDialog = ({ practiceData, data }: DialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }
  const [loading] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AddOrganizationPracticeButton practiceData={practiceData} />

      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add Practice
        </Dialog.Title>

        {loading ? (
          <Flex height="100%" width="100%" align="center" justify="center">
            <LoadingPlaceholder />
          </Flex>
        ) : (
          <PracticeForm
            data={data}
            practiceData={practiceData}
            onCloseModal={onOpenChange}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PracticeDialog }
