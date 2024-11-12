import { Box, Text } from "@radix-ui/themes";
import { VisitDropdown } from "../visit-dropdown";
import { DeleteIcon } from "@/components/icons";
import { ColumnDef } from '@tanstack/react-table'
import { VisitDataType } from "../../type";

const columns = (): ColumnDef<VisitDataType>[] => {
  return [
    {
      accessorKey: 'visitType',
      header: () => (
        <Box className="flex items-center justify-between px-2">
          <Text>Visit Type * (30)</Text>
          <VisitDropdown />
        </Box>
      ),
      cell: ({ row }) => (
        <Box className="flex w-full items-center justify-between">
          <Text className="text-pp-black-3  text-[12px]">
            {row.getValue('visitType')}
          </Text>
          <DeleteIcon />
        </Box>
      ),
    },
  ];
};



export { columns }