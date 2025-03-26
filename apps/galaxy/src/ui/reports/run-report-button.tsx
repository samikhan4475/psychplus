'use client'

import { Button, Text } from '@radix-ui/themes'

const RunReportButton = () => {
  return (
    <Button
      variant="outline"
      color="gray"
      type="submit"
      className="text-black 'w-fit h-[24px] py-1 px-2 flex items-center justify-center"
    >
      <Text className="text-[12px] font-regular text-pp-black-1">Run Report</Text>
    </Button>
  )
}

export { RunReportButton }
