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
import { deleteClaim } from '../../api.client'
import { useStore } from '../../store'
import { Claim } from '../../types'

const RowActionDropdown = ({
  row: { original: claim },
}: PropsWithRow<Claim>) => {
  const { addTab, claimList, setClaimList } = useStore((state) => ({
    addTab: state.addTab,
    claimList: state.claimList,
    setClaimList: state.setClaimList,
  }))

  const deleteRecord = async () => {
    const checkConfirm = window.confirm(
      'Are you sure you want to delete this claim?',
    )
    if (checkConfirm && claim.id) {
      try {
        await deleteClaim(claim.id)
        const newClaimList = [...claimList]
        const index = newClaimList.findIndex(
          (element) => element.id === claim.id,
        )
        if (index !== -1) {
          newClaimList.splice(index, 1)
          setClaimList(newClaimList)
        }
        alert('Claim deleted successfully!')
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
      }
    }
  }

  const handleClaimIdClick = () => {
    const tab = {
      id: `claimsid#${claim.id}`,
      label: `Claim#${claim.claimNumber}`,
      claimId: claim.id,
      claimNumber: claim.claimNumber,
    }
    addTab(tab)
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
          onClick={handleClaimIdClick}
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
