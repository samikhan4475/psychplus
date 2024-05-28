'use client'

import React, { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { DropdownMenu, IconButton } from '@radix-ui/themes'
import { RowActionEdit } from './row-action-edit'
import { RowDeleteConfirmDialog } from './row-delete-confirm-dialog'

interface DataTableRowActionsProps {
  data: any
  actionOf: 'active' | 'worklist'
}

const RowActionDropdown = ({ data, actionOf }: DataTableRowActionsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false)

  const openDialog = () => {
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  const openDeleteConfirmDialog = () => {
    setIsDeleteConfirmModalOpen(true)
  }

  const closeDeleteConfirmDialog = () => {
    setIsDeleteConfirmModalOpen(false)
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton size="1" variant="ghost" mr="1">
            <DotsHorizontalIcon height={16} width={16} />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-[150px] p-0">
          {actionOf === 'active' ? (
            <DropdownMenu.Item
              className="rounded-none w-full cursor-pointer border-b border-b-[#EFEEEE] py-4"
              onSelect={() => {
                console.log('Hello')
              }}
            >
              Move to worklist
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item
              className="rounded-none w-full cursor-pointer border-b border-b-[#EFEEEE] py-4"
              onSelect={() => console.log('Trigger ReconcileUserListTable')} // <ReconcileUserListTable />
            >
              Link
            </DropdownMenu.Item>
          )}

          {actionOf === 'worklist' && (
            <DropdownMenu.Item
              className="rounded-none w-full cursor-pointer border-b border-b-[#EFEEEE] py-4"
              onSelect={() => {
                openDialog()
              }}
            >
              Edit
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Item
            className="rounded-none w-full cursor-pointer py-4"
            onSelect={() => {
              openDeleteConfirmDialog()
            }}
          >
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <RowActionEdit row={data} isOpen={isOpen} closeDialog={closeDialog} />
      <RowDeleteConfirmDialog
        isOpen={isDeleteConfirmModalOpen}
        closeDialog={closeDeleteConfirmDialog}
        id={data.original.id}
        actionOf={actionOf}
      />
    </>
  )
}

export { RowActionDropdown }
