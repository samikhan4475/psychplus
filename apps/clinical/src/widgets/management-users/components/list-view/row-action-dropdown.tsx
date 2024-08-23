'use client'

import React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import {
  DeleteConfirmDialog,
  useDeleteConfirmDialog,
} from 'node_modules/@psychplus/ui/src/delete-confirm-dialog'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useToast } from '@psychplus/ui/toast-provider'
import { TableData } from '../../types'

interface DataTableRowActionsProps {
  data: TableData
}

const RowActionDropdown = ({ data }: DataTableRowActionsProps) => {
  const { isDeleteConfirmDialogOpen, toggleDeleteConfirmDialog } =
    useDeleteConfirmDialog()
  const { toast } = useToast()

  const onDelete = async () => {
    try {
      // TODO: Remove this log during API integration
      toast({ type: 'success', title: 'Deleted' })
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        toast({ type: 'error', title: 'An unknown error occurred' })
      }
    }
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
          <React.Fragment key="Delete">
            <DropdownMenu.Item
              className="w-full py-4 hover:bg-[#151B4A]"
              onSelect={() => {
                toggleDeleteConfirmDialog()
              }}
            >
              <Flex className=" hover:text-[white]">
                <Text size="3">Delete</Text>
              </Flex>
            </DropdownMenu.Item>
          </React.Fragment>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DeleteConfirmDialog
        isOpen={isDeleteConfirmDialogOpen}
        closeDialog={toggleDeleteConfirmDialog}
        onDelete={onDelete}
      />
    </>
  )
}

export { RowActionDropdown }
