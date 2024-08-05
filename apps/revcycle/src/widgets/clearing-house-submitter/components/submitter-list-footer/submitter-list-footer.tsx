import { Flex } from '@radix-ui/themes';
import { type Table } from '@tanstack/react-table';
import {
  DataTablePageSizeSelector,
  DataTablePageNavigation
} from '@psychplus/ui/data-table';
import { SubmitterItem } from '../types'

const SubmitterListFooter = ({ table }: { table: Table<SubmitterItem> }) => (
  <Flex p="1" align="center" justify="end">
    <Flex gap="3">
      <DataTablePageSizeSelector
        table={table}
      />
      <DataTablePageNavigation
        table={table}
      />
    </Flex>
  </Flex>
);

export { SubmitterListFooter };
