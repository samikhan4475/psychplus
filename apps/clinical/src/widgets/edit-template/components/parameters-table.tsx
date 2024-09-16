import React, { useEffect } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { DataTable } from '@psychplus/ui/data-table'
import { Columns } from './columns'
import { type Table } from '@tanstack/react-table'
import { type Parameter } from '@psychplus/reports'
import { SchemaType } from './edit-template-form'

const DataTableHeader = (table: Table<Parameter>) => {
  const column = table.getColumn('resourceStatus')
  
  useEffect(() => {
    const selectedValues = new Set(column?.getFilterValue() as string[])
    table.getAllColumns().filter(column => column.getCanHide())
    .map(column => column.toggleVisibility(false))
    selectedValues.add('Active')
    const filterValues = Array.from(selectedValues)
    column?.setFilterValue(filterValues.length? filterValues: undefined)
  }, [table, column])

  return null
} 

const ParametersTable = () => {
  const { control, getValues, getFieldState, formState } =
    useFormContext<SchemaType>()
  const { fields, remove, move, append } = useFieldArray({
    control,
    name: 'reportTemplateParameters',
  })

  const state = getFieldState('reportTemplateParameters', formState)

  const addRow = () => {
    const newParameter = {
      reportParameterCode: '',
      displayName: '',
      reportTemplateId: getValues('id'),
      resourceStatus: 'Active',
      displayOrder: fields.length,
    }
    append(newParameter)
  }



  return (
    <>
      <Flex gap="2" align="center" className="text-[12px] font-[510]">
        Run Parameters<span className="text-[#FF0000]">*</span>
        <Button
          variant="outline"
          type="button"
          className="h-6 cursor-pointer bg-[#FFF] px-2 text-[12px] text-[#000000] [box-shadow:inset_0_0_0_0.4px_#9E9898CC]"
          onClick={addRow}
        >
          <PlusIcon width={12} height={12} />
          Add
        </Button>
      </Flex>
      {state.error && (
        <Text size="2" color="red">
          {state.error?.root?.message
            ? state.error?.root?.message
            : state.error?.message}
        </Text>
      )}
      <DataTable
        tHeadClass="bg-[#F0F4FF]"
        thClass="[box-shadow:inset_0_0_0_0.2px_#0134DB72]"
        tableClass="[box-shadow:inset_0_0_0_0.2px_#0134DBB72]"
        columnCellClass="[box-shadow:inset_0_0_0_0.2px_#0134DB72] pl-1"
        renderHeader={DataTableHeader}
        columns={Columns(move, remove, fields.length)}
        data={fields}
      />
    </>
  )
}

export { ParametersTable }
