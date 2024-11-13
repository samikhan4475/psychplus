import React from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { AddMasterFeeScheduleDialog } from '../dialogs'
import { MasterFeeScheduleFilterForm } from './master-fee-schedule-filter-form'
import { MasterFeeScheduleTable } from './master-fee-schedule-list-table'
import { MasterFeeScheduleTablePagination } from './master-fee-table-pagination'
import { TabContentHeading } from './tab-content-heading'
import { UploadExcelButton } from './upload-excel-button'

const MasterFeeScheduleTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Master Fee Schedule">
        <Flex gapX="2">
          <UploadExcelButton />
          <AddMasterFeeScheduleDialog>
            <Button size="1" highContrast>
              <PlusIcon /> Add CPT
            </Button>
          </AddMasterFeeScheduleDialog>
        </Flex>
      </TabContentHeading>
      <Flex direction="column" className="bg-white w-full py-1">
        <MasterFeeScheduleFilterForm />
        <MasterFeeScheduleTable />
        <MasterFeeScheduleTablePagination />
      </Flex>
    </Flex>
  )
}

export { MasterFeeScheduleTabView }
