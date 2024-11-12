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
    <Box className="mt-1 w-full h-[82%] overflow-hidden bg-white">
      <Box className="rounded-1 p-1">
        <ScrollArea className="max-h-[470px]">
          <Box className="bg-white max-w-full">
            <DataTable columns={columns} data={data} sticky disablePagination />
          </Box>
        </ScrollArea>
      </Box>
    </Box>
  );
};

export { GeneratedReport };
