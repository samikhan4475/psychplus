'use client';

import { Box, ScrollArea } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable, ColumnHeader, TextCell } from '@/components';
import { useStore } from './store';
import { parseGeneratedReport, formatHeader } from './utils';

const generateColumns = (headers: string[]): ColumnDef<any>[] => {
  return headers.map((header) => ({
    accessorKey: header,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label={formatHeader(header)}
      />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original[header]}
      </TextCell>
    ),
  }));
};

const GeneratedReport = () => {
  const { generatedReport } = useStore();
  if (!generatedReport) return;
  const { headers, data } = parseGeneratedReport(generatedReport);
  const columns = generateColumns(headers);

  return (
    <Box className="mt-1 w-full h-[87%] overflow-hidden">
      <Box className="bg-white rounded-1 p-2">
        <ScrollArea>
          <Box className="bg-white min-w-max">
            <DataTable columns={columns} data={data} sticky />
          </Box>
        </ScrollArea>
      </Box>
    </Box>
  );
};

export { GeneratedReport };
