'use client'

import React, { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { CarePlan } from '@psychplus/care-plans'
import { deleteCarePlan } from '@psychplus/care-plans/api.client'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useToast } from '@psychplus/ui/toast-provider'
import { CarePlansDialogWidgetClient } from '@/widgets/care-plans-dialog/care-plans-dialog-widget.client'
import { useStore } from '../store'

interface DataTableRowActionsProps {
  data: CarePlan
}

const CarePlanRowActionDropdown = ({ data }: DataTableRowActionsProps) => {
  const { care_plans, setcarePlans } = useStore()

  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const openDialogWithType = () => {
    setIsOpen(true)
  }

  const onDelete = async (carePlanId: string | undefined) => {
    try {
      await deleteCarePlan(carePlanId)
      setcarePlans(
        care_plans.filter((care_plan) => {
          return care_plan.id !== carePlanId
        }),
      )

      toast({ type: 'success', title: 'Deleted' })
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        toast({ type: 'error', title: 'An unknown error occurred' })
      }
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
      <CarePlansDialogWidgetClient
        isOpen={isOpen}
        closeDialog={closeDialog}
        isEdit={true}
        data={data}
      />
    </>
  )
}

export { CarePlanRowActionDropdown }
