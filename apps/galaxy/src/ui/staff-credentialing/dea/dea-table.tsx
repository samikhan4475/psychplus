'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ScrollArea } from '@radix-ui/themes'
import { useFieldArray, useForm } from 'react-hook-form'
import { number } from 'zod'
import { DataTable, FormContainer } from '@/components'
import { useStore } from '../store'
import { columns } from './columns'
import { schema, SchemaType } from './schema'

const DeaTable = () => {
  const { deaData, editingRow } = useStore()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { deaData },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'deaData',
  })

  useEffect(() => {
    form.setValue('deaData', deaData)
  }, [deaData])

  const onSubmit = (values: SchemaType, index: number | null) => {
    if (!number) return
  }

  return (
    <FormContainer form={form} onSubmit={(data) => onSubmit(data, editingRow)}>
      <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] p-2">
        <DataTable
          columns={columns(onSubmit)}
          data={fields}
          tdClass="!p-0"
          isRowSpan
          sticky
          disablePagination
          tableRowClass="border-b border-red-200"
        />
      </ScrollArea>
    </FormContainer>
  )
}

export { DeaTable }
