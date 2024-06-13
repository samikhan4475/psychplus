'use client'

import React, { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { useToast } from 'node_modules/@psychplus/ui/src/toast-provider'
import { Immunization } from '@psychplus/immunization'
import { deleteImmunization } from '@psychplus/immunization/api.client'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { ImmunizationDialogWidgetClient } from '@/widgets/immunization-dialog/problems-dialog-widget.client'
import { useStore } from '../store'

interface DataTableRowActionsProps {
  data: Immunization
}

const RowActionDropdown = ({ data }: DataTableRowActionsProps) => {
  const { appointmentId, immunizations, setImmunizations } = useStore()

  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const openDialogWithType = () => {
    setIsOpen(true)
  }

  const onDelete = (immunizationId: string | undefined) => {
    deleteImmunization(Number(appointmentId), immunizationId)
      .then(() => {
        setImmunizations(
          immunizations.filter((immunization) => {
            return immunization.id !== immunizationId
          }),
        )
        toast({ type: 'success', title: 'Deleted' })
      })
      .catch((err: Error) => {
        toast({ type: 'error', title: err.message })
      })
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger>
          <IconButton size="1" variant="ghost" mr="1">
            <DotsHorizontalIcon height={16} width={16} />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <React.Fragment>
            <DropdownMenu.Item
              className="w-full py-4 hover:bg-[#151B4A]"
              onSelect={openDialogWithType}
            >
              <Flex className=" hover:text-[white]">
                <Text size="3">Edit</Text>
              </Flex>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="m-0 p-0" />
          </React.Fragment>
          <React.Fragment key="Delete">
            <DropdownMenu.Item
              className="w-full py-4 hover:bg-[#151B4A]"
              onSelect={() => {
                onDelete(data.id)
              }}
            >
              <Flex className=" hover:text-[white]">
                <Text size="3">Delete</Text>
              </Flex>
            </DropdownMenu.Item>
          </React.Fragment>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <ImmunizationDialogWidgetClient
        immunizationType={data.entryType}
        isOpen={isOpen}
        isEdit={true}
        closeDialog={closeDialog}
        data={data}
      />
    </>
  )
}

export { RowActionDropdown }
