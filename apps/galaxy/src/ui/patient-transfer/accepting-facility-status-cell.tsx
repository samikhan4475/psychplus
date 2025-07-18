import React, { useEffect, useState } from 'react'
import { Flex, Popover } from '@radix-ui/themes'
import { ChevronDown } from 'lucide-react'
import { TextCell } from '@/components'

interface AcceptingFacilityStatusCelltype {
readonly status: string
}

function AcceptingFacilityStatusCell({ status }: AcceptingFacilityStatusCelltype) {
  const [selectedStatus, setselectedStatus] = useState(status)
  const [isOpen, setisOpen] = useState(false)
  const optionsList = ['Approved', 'Pending', 'Canceled']

  const statusStyles = {
    Approved: {
      bg: 'bg-[#e9f9ee]',
      text: 'text-[#87bda3]',
    },
    Pending: {
      bg: 'bg-[#ffedd5]',
      text: 'text-[#e5c6ad]',
    },
    Canceled: {
      bg: 'bg-[#ebebef]',
      text: 'text-[#a7aaaf]',
    },
  }

  const { bg, text } = statusStyles[
    selectedStatus as keyof typeof statusStyles
  ] ?? {
    bg: 'bg-white',
    text: 'text-black',
  }

  const onSelectStatus = (item: string) => {
    setselectedStatus(item)
    setisOpen(false)

  }

  useEffect(() => {
    setselectedStatus(status)
  }, [status])

  return (
    <Popover.Root open={isOpen} onOpenChange={setisOpen}>
      <Popover.Trigger>
        <Flex className="cursor-pointer items-center overflow-hidden rounded-2 border border-gray-5 ">
          <TextCell
            className={`flex h-full w-[70px] items-center pl-1 pr-2 ${bg} ${text}`}
          >
            {selectedStatus}
          </TextCell>
          <Flex className="h-5 items-center justify-center  ">
            <ChevronDown
              onClick={() => setisOpen(!isOpen)}
              width={15}
              height={15}
              strokeWidth={1.75}
            />
          </Flex>
        </Flex>
      </Popover.Trigger>
      <Popover.Content className="w-[100px] p-0">
        <Flex className=" flex w-full flex-col  items-center justify-center rounded-3 pl-1 pt-0">
          {optionsList.map((item) => (
            <Flex key={item} onClick={() => onSelectStatus(item)}>
              <TextCell className="  w-[100px] cursor-pointer border-b border-gray-4 py-1 pl-1 hover:bg-gray-1">
                {item}
              </TextCell>
            </Flex>
          ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export default AcceptingFacilityStatusCell
