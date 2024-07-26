import { Flex } from '@radix-ui/themes'
import { type Table } from '@tanstack/react-table'
import {
  DataTablePageNavigation,
  DataTablePageSizeSelector,
} from '@psychplus/ui/data-table'

interface CPT {
  macLocality?: string
  hcpcsCodes?: string
  cptCode?: string
  placeOfService?: string
  description?: string
  category?: string
  requirement?: string
  gender?: string
  minimumAge?: string
  maximumAge?: string
  resourceStatusList?: string
  id?: string
}

const CPTListFooter = ({ table }: { table: Table<CPT> }) => (
  <Flex p="1" align="center" justify="end">
    <Flex gap="3">
      <DataTablePageSizeSelector table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

export { CPTListFooter }
