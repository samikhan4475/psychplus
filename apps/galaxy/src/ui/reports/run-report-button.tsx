'use client'

import { Button, ChevronDownIcon, DropdownMenu, Flex } from '@radix-ui/themes'

const RunReportButton = () => {

  return (
    <Flex align="center" className="md:gap-x-[1px] lg:gap-x-[0.5px]">
      <Button
        type="submit"
        className="h-6 bg-pp-blue-400 text-[#FFF] rounded-r-[0px]"
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
          <DropdownMenu.Item>Run in the background</DropdownMenu.Item>
          <DropdownMenu.Item>Schedule Report</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}

export { RunReportButton }
