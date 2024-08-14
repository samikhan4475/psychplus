'use client'

import React, { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { Procedure } from '@psychplus/procedures'
import { deleteProcedure } from '@psychplus/procedures/api.client'
import {
  DeleteConfirmDialog,
  useDeleteConfirmDialog,
} from '@psychplus/ui/delete-confirm-dialog'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useToast } from '@psychplus/ui/toast-provider'
import { DeleteIcon } from '@/components/icons'
import { EditIcon } from '@/components/icons/edit-icon'
import { ProceduresDialogWidgetClient } from '@/widgets/procedures-dialog/procedures-dialog-widget.client'
import { useStore } from '../store'

interface DataTableRowActionsProps {
  data: Procedure
}

const RowActionDropdown = ({ data }: DataTableRowActionsProps) => {
  const { patientId, procedures, setProcedures } = useStore()

  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const { isDeleteConfirmDialogOpen, toggleDeleteConfirmDialog } =
    useDeleteConfirmDialog()

  const openDialogWithType = () => {
    setIsOpen(true)
  }

  const onDelete = async () => {
    try {
      await deleteProcedure(patientId, data.id)
      setProcedures(
        procedures.filter((procedure) => {
          return procedure.id !== data.id
        }),
      )
      toast({ type: 'success', title: 'Deleted' })
    } catch (err: any) {
      toast({ type: 'error', title: err.message })
    }
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
          <React.Fragment key="Edit">
            <DropdownMenu.Item
              className="w-full py-4 hover:bg-[#151B4A]"
              onSelect={openDialogWithType}
            >
              <Flex
                className=" hover:text-[white]"
                gap="2"
                justify="center"
                align="center"
              >
                <EditIcon />
                <Text size="3">Edit</Text>
              </Flex>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="m-0 p-0" />
          </React.Fragment>
          <React.Fragment key="Delete">
            <DropdownMenu.Item
              className="w-full py-4 hover:bg-[#151B4A]"
              onSelect={() => {
                toggleDeleteConfirmDialog()
              }}
            >
              <Flex
                className=" hover:text-[white]"
                gap="2"
                justify="center"
                align="center"
              >
                <DeleteIcon />
                <Text size="3">Delete</Text>
              </Flex>
            </DropdownMenu.Item>
          </React.Fragment>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <ProceduresDialogWidgetClient
        isOpen={isOpen}
        isEdit={true}
        closeDialog={closeDialog}
        data={data}
      />
      <DeleteConfirmDialog
        isOpen={isDeleteConfirmDialogOpen}
        closeDialog={toggleDeleteConfirmDialog}
        onDelete={onDelete}
      />
    </>
  )
}

export { RowActionDropdown }
