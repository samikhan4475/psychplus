'use client'

import React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../../store'
import { SchemaType } from './add-claim-form'
import useCalculateBilledAmount from './useCalculateBilledAmount'

interface RowActionDropdownProps {
  rowIndex: number
  rowId?: string | null
  form: UseFormReturn<SchemaType>
}
const ClaimRowActionDropdown: React.FC<RowActionDropdownProps> = ({
  rowIndex,
  rowId,
  form,
}) => {
  const menuItems = ['Edit', 'Delete']
  const { getValues, setValue } = form
  const { setSelectedClaimBilledAmt, setDeletedClaimServiceLines } = useStore(
    (state) => ({
      setSelectedClaimBilledAmt: state.setSelectedClaimBilledAmt,
      setDeletedClaimServiceLines: state.setDeletedClaimServiceLines,
    }),
  )
  const calculateBilledAmount = useCalculateBilledAmount() // Use the custom hook

  const handleDelete = () => {
    const currentCharges = getValues('claimServiceLines') || []

    if (rowId) {
      const chargeToDelete = currentCharges.find(
        (charge) => charge.id === rowId,
      )
      if (chargeToDelete) {
        const updatedCharge = { ...chargeToDelete, recordStatus: 'Deleted' }
        const updatedCharges = currentCharges.filter(
          (charge) => charge.id !== rowId,
        )
        setDeletedClaimServiceLines(updatedCharge)

        // Update the billed amount and form state
        const updatedBilledAmount = calculateBilledAmount(updatedCharges)
        form.setValue('totalAmount', updatedBilledAmount)
        setSelectedClaimBilledAmt(Number(updatedBilledAmount))

        // Update the form state with the filtered charges
        setValue('claimServiceLines', updatedCharges)
      }
    } else {
      const updatedCharges = currentCharges.filter(
        (_, index) => index !== rowIndex,
      )

      // Update the billed amount and form state
      const updatedBilledAmount = calculateBilledAmount(updatedCharges)
      form.setValue('totalAmount', updatedBilledAmount)
      setSelectedClaimBilledAmt(Number(updatedBilledAmount))

      // Update the form state with the filtered charges
      setValue('claimServiceLines', updatedCharges)
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
              onClick={item === 'Delete' ? handleDelete : undefined}
            >
              <Flex className=" hover:text-[white]">
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

export { ClaimRowActionDropdown }
