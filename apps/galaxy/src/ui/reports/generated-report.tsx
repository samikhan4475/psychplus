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
    <Box className="mt-1 w-full md:h-[60vh] lg:h-[67vh] xl:h-[78vh] ">
      <ScrollArea className="rounded-1 p-1 bg-white mb-0">
        <DataTable columns={columns} data={data} sticky disablePagination />
      </ScrollArea>
    </Box>
  );
};

export { GeneratedReport };
