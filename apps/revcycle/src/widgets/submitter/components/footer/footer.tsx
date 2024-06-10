import { Flex } from '@radix-ui/themes';
import { type Table } from '@tanstack/react-table';
import {
  DataTablePageSizeSelector,
  DataTablePageNavigation
} from '@psychplus/ui/data-table';


interface ISubmitter {
  name: string;
  username: string;
  email: string;
  password: string;
  submitterId: string;
  contactPerson: string;
  phone: string;
  fax: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
}

const DataTableFooter = ({ table }: { table:  Table<ISubmitter> }) => (
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

export { DataTableFooter };
