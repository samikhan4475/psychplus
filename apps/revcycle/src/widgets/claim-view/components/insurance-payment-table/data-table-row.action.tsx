'use client'

import React from 'react'
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { deleteInsurancePaymentRecord } from '../../api.client'
import { useStore } from '../../store'
import { InsurancePayment } from '../../types'

const RowActionDropdown = ({
  row: { original: record },
}: PropsWithRow<InsurancePayment>) => {
  const {
    setInsurancePaymentEditData,
    setInsurancePaymentModalOpen,
    setInsurancePaymentRefetchData,
  } = useStore((state) => ({
    setInsurancePaymentEditData: state.setInsurancePaymentEditData,
    setInsurancePaymentModalOpen: state.setInsurancePaymentModalOpen,
    setInsurancePaymentRefetchData: state.setInsurancePaymentRefetchData,
  }))
  const deleteRecord = async () => {
    const checkConfirm = window.confirm(
      'Are you sure you want to delete this record?',
    )
    if (checkConfirm && record.id) {
      try {
        await deleteInsurancePaymentRecord(record.id)
        alert('Record deleted successfully!')
      } catch (error) {
        console.log('error', error)
        let message = ''
        if (typeof error === 'string') {
          message = error
        } else if (error instanceof Error) {
          message = error.message
        } else {
          message = JSON.stringify(error)
        }
        alert(`ERROR: ${message}`)
      } finally {
        setInsurancePaymentRefetchData(true)
      }
    }
  }

  const editRecord = () => {
    setInsurancePaymentEditData(record)
    setInsurancePaymentModalOpen(true)
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size="1" variant="ghost" mr="1">
          <DotsHorizontalIcon height={16} width={16} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          className="w-full py-4 hover:bg-[#151B4A]"
          onClick={editRecord}
        >
          <Flex className=" hover:text-[white]" align="center" gap="1">
            <Pencil1Icon />
            <Text size="3">Edit</Text>
          </Flex>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="m-0 p-0" />
        <DropdownMenu.Item
          className="w-full py-4 hover:bg-[#151B4A]"
          onClick={deleteRecord}
        >
          <Flex className=" hover:text-[white]" align="center" gap="1">
            <TrashIcon />
            <Text size="3">Delete</Text>
          </Flex>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { RowActionDropdown }
