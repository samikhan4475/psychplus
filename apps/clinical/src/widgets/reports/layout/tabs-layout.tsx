import React from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons'
import { Flex, Tabs, Text } from '@radix-ui/themes'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_TEMPLATE_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { DocumentIcon } from '@/components/icons/document-icon'
import { useSidebarContext } from '../context'

const TabsLayout = ({
  children,
  title,
}: React.PropsWithChildren<{ title: string }>) => {
  const { onCollapse, isCollapsed } = useSidebarContext()
  const { publish } = usePubsub()

  if (isCollapsed) {
    return (
      <>
        <Flex
          justify="center"
          align="center"
          onClick={() => onCollapse(false)}
          className="align-center absolute left-[50%] top-[16px] z-10 col-span-2 col-start-1 flex h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/4 cursor-pointer justify-center rounded-[10px] border border-[#0134DB72] bg-[#FFF]"
        >
          <ChevronRightIcon />
        </Flex>
        <Tabs.List className="col-start-1 col-end-1 flex h-[100%] flex-col overflow-y-scroll bg-[#FFF]">
          <Flex
            direction="column"
            align="center"
            className="mb-3 pt-3.5"
          >
            <DocumentIcon />
          </Flex>
          <PlusCircledIcon
            className="mx-auto cursor-pointer"
            width={20}
            height={20}
            onClick={() =>
              publish(`${ADD_TEMPLATE_WIDGET}:${EventType.Opened}`)
            }
          />
        </Tabs.List>
      </>
    )
  }

  return (
    <Flex direction='column' className='h-full col-span-1 overflow-x-hidden'>
      <Flex
        justify="center"
        align="center"
        onClick={() => onCollapse(true)}
        className="align-center absolute left-[50%] top-[16px] z-10 col-span-2 col-start-1 flex h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/4 cursor-pointer justify-center rounded-[10px] border border-[#0134DB72] bg-[#FFF]"
      >
        <ChevronLeftIcon />
      </Flex>
      <Tabs.List className="w-full flex h-[1px] flex-col grow overflow-y-scroll bg-[#FFF] pl-[11px] pr-5">
        <Flex align="center" className="mb-1 gap-x-[3px] pt-3.5 ml-[-3px]">
          <DocumentIcon className='min-w-[20px] min-h-[20px]' />
          <Text className="color-[#151B4A] truncate text-[16px] font-[510]">
            {title}
          </Text>
        </Flex>
        {children}
      </Tabs.List>
      </Flex>
  )
}

export { TabsLayout }
