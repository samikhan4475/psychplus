'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { CellRadioGroup } from '@/components'

const TableActionFields = () => {
  const handleChange = (value: string) => {
    // Don't bother this log cause it'll be removed later
    console.log('Selected value:', value)
  }
  return (
    <Flex
      gap="2"
      className="bg-white justify-end rounded-b-2 rounded-t-1 px-2 py-2 shadow-2"
      direction="row"
    >
      <Box className="flex items-center gap-2">
        <Text className="text-1">Patient Responsibility</Text>
        <CellRadioGroup
          onValueChange={handleChange}
          options={[
            { label: 'Co-Pay', value: 'co-pay' },
            { label: 'Co-Ins', value: 'co-ins' },
          ]}
        />
      </Box>
      |
      <Box className="flex items-center gap-2">
        <Text className="text-1">Patient Responsibility</Text>
        <CellRadioGroup
          onValueChange={handleChange}
          options={[
            { label: '$', value: '$' },
            { label: '%', value: '%' },
          ]}
        />
      </Box>
    </Flex>
  )
}

export { TableActionFields }
