'use client'

import React, { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { Problem } from '@psychplus/problems'
import { deleteProblem } from '@psychplus/problems/api.client'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useToast } from '@psychplus/ui/toast-provider'
import { ProblemsDialogWidgetClient } from '@/widgets/problems-dialog/problems-dialog-widget.client'
import { useStore } from '../store'

interface DataTableRowActionsProps {
  data: Problem
}

const RowActionDropdown = ({ data }: DataTableRowActionsProps) => {
  const { patientId, problems, setProblems } = useStore()

  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const openDialogWithType = () => {
    setIsOpen(true)
  }

  const onDelete = (patientId: number, problemId: string | undefined) => {
    deleteProblem(patientId, problemId)
      .then(() => {
        setProblems(
          problems.filter((problem) => {
            return problem.id !== problemId
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
                onDelete(patientId, data.id)
              }}
            >
              <Flex className=" hover:text-[white]">
                <Text size="3">Delete</Text>
              </Flex>
            </DropdownMenu.Item>
          </React.Fragment>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <ProblemsDialogWidgetClient
        isOpen={isOpen}
        isEdit={true}
        closeDialog={closeDialog}
        data={data}
      />
    </>
  )
}

export { RowActionDropdown }
