'use client'

import { Box } from '@radix-ui/themes'
import { WidgetContainer } from '@/components'
import {ImmunizationTable} from './immunization-list-data-table'
import { AddImmunizationDropdown } from './components/add-immunization-dropdown'
import { ImmunizationTablePagination } from './immunization-table-pagination'
const ImmunizationListWidget = () => {

  return (
    <Box position="relative" width="100%">
      <WidgetContainer
        title="Immunization"
        headerRight={<AddImmunizationDropdown/>}
      >
        <ImmunizationTable />
        <ImmunizationTablePagination />
      </WidgetContainer>
    </Box>
  )
}

export { ImmunizationListWidget }
