'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import {
  ColumnHeader,
  DataTable,
  FormContainer,
  LongTextCell,
  TextCell,
} from '@/components'
import {
  addCodesetCodeAttributes,
  updateCodesetCodeAttributes,
} from '@/ui/assigning-authorities/actions'
import { CodeAttribute } from '@/ui/assigning-authorities/types'
import { useStore } from '../../../../store'
import { AddAttributeButton } from './buttons'
import { ActionsCell, EditableCell } from './cells'

const schema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, 'The field Name is required')
    .max(64, 'The field Name must be a string with a maximum length of 64'),
  value: z
    .string()
    .min(1, 'The field Value is Required')
    .max(
      1024,
      'The field Value must be a string with a maximum length of 1024',
    ),
})

type SchemaType = z.infer<typeof schema>

const ManageAttributesForm = () => {
  const {
    selectedCode,
    saving,
    setSaving,
    selectedAssigningAuthority,
    selectedCodeset,
    setSelectedCode,
    selectedCodesetCodes,
    updateCurrentPageData,
  } = useStore()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { id: '', name: '', value: '' },
  })

  useEffect(() => {
    if (form.formState.errors?.name?.message)
      toast.error(form.formState.errors.name.message)
    else if (form.formState.errors.value?.message)
      toast.error(form.formState.errors.value.message)
  }, [form.formState.errors])

  if (!selectedAssigningAuthority || !selectedCodeset || !selectedCode)
    return null

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setSaving(true)

    const response =
      data.id === 'new'
        ? await addCodesetCodeAttributes({
            assigningAuthorityId: selectedAssigningAuthority.id,
            codesetId: selectedCodeset.id,
            codeId: selectedCode.id,
            name: data.name,
            content: data.value,
          })
        : await updateCodesetCodeAttributes({
            assigningAuthorityId: selectedAssigningAuthority.id,
            codesetId: selectedCodeset.id,
            codeId: selectedCode.id,
            name: data.name,
            content: data.value,
            id: data.id,
          })

    setSaving(false)

    if (response.state === 'error') {
      return toast.error(
        parseSqlError(response.error) ?? 'Error saving attribute',
      )
    }

    toast.success('Saved')

    const updatedCode = {
      ...selectedCode,
      codeAttributes:
        data.id === 'new'
          ? [
              response.data,
              ...(selectedCode.codeAttributes ?? []).filter(
                (attr) => attr.id !== 'new',
              ),
            ]
          : selectedCode.codeAttributes?.map((code) =>
              code.id === response.data.id ? response.data : code,
            ),
    }

    const updatedCodesetCodes = (selectedCodesetCodes ?? []).map((code) =>
      code.id === selectedCode?.id ? updatedCode : code,
    )

    setSelectedCode(updatedCode)

    await updateCurrentPageData(updatedCodesetCodes)

    form.reset({ id: '', value: '', name: '' })
  }

  return (
    <Flex className="mx-auto w-[560px]">
      <FormContainer form={form} onSubmit={onSubmit} className="gap-3">
        <AddAttributeButton />
        <Box className="max-h-[250px] overflow-y-auto overflow-x-hidden">
          <DataTable
            data={selectedCode?.codeAttributes ?? []}
            columns={getColumns({ form })}
            disablePagination
            sticky
          />
        </Box>
        {form.watch('id') && (
          <Flex className="justify-end">
            <Button highContrast size="2" type="submit" disabled={saving}>
              Save
            </Button>
          </Flex>
        )}
      </FormContainer>
    </Flex>
  )
}

const getColumns = ({
  form,
}: {
  form: UseFormReturn<SchemaType>
}): ColumnDef<CodeAttribute>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Name" />
    ),
    cell: ({ row }) =>
      form.watch('id') === 'new' && row.index === 0 ? (
        <EditableCell field="name" />
      ) : (
        <TextCell>{row.original?.name ?? ''}</TextCell>
      ),
  },
  {
    accessorKey: 'content',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Value" />
    ),
    cell: ({ row }) => {
      if (form.watch('id') === 'new' && row.index === 0)
        return <EditableCell field="value" />

      return form.watch('id') === row.original.id ? (
        <EditableCell field="value" defaultValue={row.original.content} />
      ) : (
        <LongTextCell className="min-w-24 max-w-32">
          {row.original?.content ?? ''}
        </LongTextCell>
      )
    },
  },
  {
    id: 'actions',
    size: 50,
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]

const parseSqlError = (errorMsg?: string) => {
  const match = /The duplicate key value is \((.+)\)/.exec(errorMsg ?? '')
  return match ? 'A record with this Name value already exists.' : errorMsg
}

export { ManageAttributesForm, type SchemaType }
