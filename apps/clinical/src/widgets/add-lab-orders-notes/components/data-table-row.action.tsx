'use client'

import React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { deleteLabOrder } from '@psychplus/lab-orders/api.client'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { DataTableRowActionsProps, MenuItem } from '../types'

const RowActionDropdown = ({
  data,
  handlerPlaceOrder,
  handlerAddWpcResult,
  handleToggle,
  toast,
}: DataTableRowActionsProps) => {
  let menuItems: MenuItem[] = [MenuItem.PlaceOrder, MenuItem.Delete]
  if (data.original.labTestId) {
    menuItems = [MenuItem.AddResult, MenuItem.Delete]
  }

  const openDialog = async (title: MenuItem) => {
    try {
      if (title === MenuItem.Delete) {
        if (
          !data.original?.newTest &&
          data?.original?.appointmentId &&
          data?.original?.id
        ) {
          await deleteLabOrder({
            appointmentId: data.original.appointmentId.toString(),
            id: data.original.id,
          })
          toast({ type: 'success', title: 'LabOrder Delete Successfully' })
        }
        handleToggle(data.original, MenuItem.Delete)
      } else if (title === MenuItem.PlaceOrder && data?.original?.id) {
        handlerPlaceOrder(data.original.id)
      } else if (title === MenuItem.AddResult && data.original) {
        handlerAddWpcResult(data.original)
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        toast({ type: 'error', title: (err as { message: string }).message })
      }
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size="1" variant="ghost" mr="1">
          <DotsHorizontalIcon height={16} width={16} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {menuItems.map((item, index) => (
          <React.Fragment key={item}>
            <DropdownMenu.Item
              className="w-full py-4 hover:bg-[#151B4A]"
              onSelect={() => {
                openDialog(item)
              }}
            >
              <Flex className="hover:text-white">
                <Text size="3">{item}</Text>
              </Flex>
            </DropdownMenu.Item>
            {index < menuItems.length - 1 && (
              <DropdownMenu.Separator className="m-0 p-0" />
            )}
          </React.Fragment>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { RowActionDropdown }
