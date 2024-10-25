'use client'

import { Button, ChevronDownIcon, DropdownMenu, Flex } from '@radix-ui/themes'
import { useState } from 'react'
import { ScheduleReportDialog } from './schedule-report-dialog'

const RunReportButton = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
    <Flex align="center" className="md:gap-x-[1px] lg:gap-x-[0.5px]">
      <Button
        type="submit"
        className="h-6 bg-pp-blue-400 text-[#FFF] rounded-r-[0px] text-[12px] font-medium"
      >
        Run Report
      </Button>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger>
          <Button className="h-6 rounded-l-[0px] bg-pp-blue-400">
            <ChevronDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {/* <DropdownMenu.Item >Run in the background</DropdownMenu.Item> */}
          <DropdownMenu.Item className='text-[12px] hover:bg-pp-blue-400 transition duration-300 ease-in-out hover:text-white' onClick={onOpen}>Schedule Report</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
    <ScheduleReportDialog open={open} onClose={onClose} />
    </>
  )
}

export { RunReportButton }
