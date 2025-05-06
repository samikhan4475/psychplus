'use client'

import { useEffect, useState } from 'react'
import { Dialog, Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { getAllOrganizationsListAction } from '../../actions'
import { Organization, Practice } from '../../types'
import { AddOrganizationPracticeButton } from './add-organization-practice-button'
import { PracticeForm } from './practice-form'

interface DialogProps {
  organizationId?: string
  practiceData?: Practice
  data?: Organization
  refetch?: () => void
  isAddPractice?: boolean
}

const PracticeDialog = ({
  practiceData,
  data,
  refetch,
  organizationId,
  isAddPractice,
}: DialogProps) => {
  const [open, setOpen] = useState(false)
  const [organization, setOrganization] = useState<Organization>()

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  useEffect(() => {
    ;(async () => {
      if (data) {
        setOrganization(data)
        return
      }

      if (!organizationId) {
        return
      }

      const response = await getAllOrganizationsListAction({
        payload: { organizationId },
      })

      if (response.state === 'success') {
        const organization = response.data.organizations[0]
        setOrganization(organization)
      }
    })()
  }, [data])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AddOrganizationPracticeButton
        practiceData={practiceData}
        isAddPractice={isAddPractice}
      />

      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add Practice
        </Dialog.Title>

        {!organization ? (
          <Flex height="100%" width="100%" align="center" justify="center">
            <LoadingPlaceholder />
          </Flex>
        ) : (
          <PracticeForm
            data={organization}
            practiceData={practiceData}
            onCloseModal={onOpenChange}
            refetch={refetch}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PracticeDialog }
