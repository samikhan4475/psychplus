'use client'

import { Box, Flex } from '@radix-ui/themes'
import { CellRadioGroup, TabContentHeading } from '@/components'
import { FilterForm } from './filter-form'
import { ListTable } from './list-table'
import { TableActionFields } from './table-action-fields'
import { UploadFileButton } from './upload-file-button'

const PracticePlanFeeScheduleView = () => {
  const handleChange = (value: string) => {
    // Don't bother this log cause it'll be removed later
    console.log('Selected value:', value)
  }
  return (
    <Box className="w-full p-1">
      <Flex direction="column" className="gap-0.5" width="100%">
        <TabContentHeading title="Fee Schedule">
          <CellRadioGroup
            onValueChange={handleChange}
            options={[
              { label: '% of medicare', value: 'percentage' },
              { label: 'Fixed', value: 'Fixed' },
            ]}
            wrapperClassName="ml-4"
          />
          <UploadFileButton />
        </TabContentHeading>
        <FilterForm />
        <TableActionFields />
        <Flex direction="column" className="bg-white w-full">
          <ListTable />
        </Flex>
      </Flex>
    </Box>
  )
}

export { PracticePlanFeeScheduleView }
