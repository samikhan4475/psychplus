'use client'

import React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import {
  DataTableRowActionsProps,
  LabDocument,
  LabOrderPdf,
  MenuItemType,
} from '../types'

const RowActionDropdown = ({
  setSelectedLabTestDetails,
  data,
}: DataTableRowActionsProps) => {
  const { requisitionPdf } = LabOrderPdf

  const requisitionPdfDetails = data?.original?.labDocuments?.find(
    (item: LabDocument) => item?.documentType === requisitionPdf,
  )

  const menuItems: MenuItemType[] = [
    MenuItemType.SpecimenLabelPrint,
    MenuItemType.Delete,
  ]
  if (requisitionPdfDetails?.documentName && requisitionPdfDetails?.orderId) {
    menuItems.push(MenuItemType.RequisitionPrint)
  }

  const openDialog = async (title: MenuItemType) => {
    const { original } = data
    if (title === MenuItemType.Delete && original.id) {
      setSelectedLabTestDetails({
        labTestId: original.id,
        type: MenuItemType.Delete,
      })
    } else if (title === MenuItemType.SpecimenLabelPrint && original.id) {
      setSelectedLabTestDetails({
        labTestId: original.id,
        type: MenuItemType.SpecimenLabelPrint,
        labTest: original,
      })
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
