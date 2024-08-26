'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { useStore } from '../store'
import { MetaDataCodeSet } from '../types'
import { TableCellLongText } from './table-cell-long-text'

const columns: ColumnDef<MetaDataCodeSet>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="POS Code"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.code} />,
    enableHiding: true,
  },
  {
    id: 'display',
    accessorKey: 'display',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Description"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.display} />,
    enableHiding: true,
  },
]

const DataTableFooter = (table: any) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const POSTable = () => {
  const data = useStore((state) => state.posCodeSets)
  const [refDataState, setRefDataState] = useState<MetaDataCodeSet[]>(data)
  const [code, setCode] = useState<string>('')
  const [display, setDisplay] = useState<string>('')

  const clearFilters = () => {
    setCode('')
    setDisplay('')
    setRefDataState(data)
  }

  const fetchFilteredData = () => {
    const lowerCaseCodeSearchTerm = code.toLowerCase()
    const lowerCaseDisplaySearchTerm = display.toLowerCase()

    if (!lowerCaseCodeSearchTerm && !lowerCaseDisplaySearchTerm) {
      setRefDataState(data)
      return
    }

    const result: MetaDataCodeSet[] = []

    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      const getCode = element.code

      const getCodeDescription = element.display

      if (
        (lowerCaseCodeSearchTerm &&
          lowerCaseDisplaySearchTerm &&
          getCode === lowerCaseCodeSearchTerm &&
          getCodeDescription
            .toLocaleLowerCase()
            .indexOf(lowerCaseDisplaySearchTerm) !== -1) ||
        (!lowerCaseCodeSearchTerm &&
          lowerCaseDisplaySearchTerm &&
          getCodeDescription
            .toLocaleLowerCase()
            .indexOf(lowerCaseDisplaySearchTerm) !== -1) ||
        (!lowerCaseDisplaySearchTerm &&
          lowerCaseCodeSearchTerm &&
          getCode === lowerCaseCodeSearchTerm)
      ) {
        result.push(element)
      }
    }

    setRefDataState(result)
  }

  return (
    <>
      <Box p="1">
        <Flex
          p="1"
          justify="between"
          className="border-b-2 border-[#eaeaea] p-1"
        >
          <Text className="font-bold">POS</Text>
        </Flex>
      </Box>

      <Box my="2">
        <Flex>
          <Text size="1" className="pt-2 font-bold">
            POS Code
          </Text>
          <FilterField
            label=""
            placeholder="Enter POS code"
            value={code}
            onChange={(value) => setCode(value)}
          />
          <Text size="1" className="pt-2 font-bold">
            Description
          </Text>
          <FilterField
            label=""
            placeholder="Description..."
            value={display}
            onChange={(value) => setDisplay(value)}
          />

          <Button
            variant="outline"
            highContrast
            className="h-25 mr-n5 bg-[#EAEEF9]"
            onClick={clearFilters}
          >
            Clear
          </Button>
          <Button className="h-25 ml-2 bg-[#151B4A]">
            <MagnifyingGlassIcon onClick={fetchFilteredData} />
          </Button>
        </Flex>
      </Box>

      <DataTable
        data={refDataState}
        columns={columns}
        tableClass="border border-solid border-[lightgray] "
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
        renderFooter={DataTableFooter}
      />
    </>
  )
}

const FilterField = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  value?: string
  onChange: (value: string) => void
}) => (
  <Box mx="2">
    <Flex align="center">
      <Text size="1" mr="1">
        {label}
      </Text>
      <TextField.Root
        className="h-30"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Flex>
  </Box>
)

export { POSTable }
