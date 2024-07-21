import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Grid, Heading, IconButton, Text } from '@radix-ui/themes'
import { type ColumnDef, type Row } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Search } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormDatePicker, FormTextInput, validate } from '@psychplus/form'
import { Patient } from '@psychplus/patient'
import { DataTableColumnHeader } from '@psychplus/ui/data-table'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { BodyType, getPatientHistory } from '../api.client'
import { useStore } from '../store'
import { HistoryTable } from './history-table'
import { PatientInfo } from './patient-info'

const schema = z
  .object({
    historyCreatedFrom: z.date().optional(),
    historyCreatedTo: z.date().optional(),
    username: validate.optionalString,
  })
  .superRefine((data, ctx) => {
    if (data.historyCreatedTo && !data.historyCreatedFrom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please specify Date From',
        path: ['historyCreatedFrom'],
      })
    }
  })

type SchemaType = z.infer<typeof schema>

const columns: ColumnDef<Patient>[] = [
  {
    id: 'time',
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-[12px] text-[#1C2024]"
        column={column}
        title="Date/time"
      />
    ),
    cell: ({ row }) => (
      <Text className={`max-w-[88px] text-[12px]`}>
        {format(
          new Date(row.original.metadata.createdOn),
          'yyyy-MM-dd HH:mm:ss',
        )}
      </Text>
    ),
    enableHiding: false,
  },
  {
    id: 'username',
    accessorKey: 'metadata.createdByFullName',
    header: ({ column }) => (
      <DataTableColumnHeader
        className={`text-[12px] text-[#1C2024]`}
        column={column}
        title="User Name"
      />
    ),
    cell: ({ row }) => (
      <Text className={`text-[12px]`}>
        {row.original.metadata.createdByFullName ?? 'N/A'}
      </Text>
    ),
  },
]

const PatientInfoHistory = () => {
  const historyData = useStore((state) => state.patientHistory)
  const patientProfile = useStore((state) => state.patient)
  const setPatientHistory = useStore((state) => state.setPatientHistory)
  const [historyId, setHistoryId] = useState<number | undefined>()
  const [rowId, setRowId] = useState<string>('0')
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      username: '',
      historyCreatedFrom: undefined,
      historyCreatedTo: undefined,
    },
  })

  const onRowSelect = (row: Row<Patient>) => {
    setHistoryId(row.original.id)
    setRowId(row.id)
  }

  useEffect(() => {
    setHistoryId(historyData[0]?.id)
  }, [historyData])

  const handleClearFilters = () => {
    const { historyCreatedFrom, historyCreatedTo, username } = form.getValues()
    if (!historyCreatedFrom && !historyCreatedTo && !username) return
    getPatientHistory({
      patientId: patientProfile?.id as number,
      body: { historyCreatedFrom: '2024-05-20T01:24:08.290Z' },
    }).then(setPatientHistory)
    form.reset()
  }

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const body = {} as BodyType
    try {
      let patientHistory = historyData
      if (data.historyCreatedFrom) {
        const utcDate = data.historyCreatedFrom.toISOString()
        body.historyCreatedFrom = utcDate
      }
      if (data.historyCreatedTo) {
        const utcDate = data.historyCreatedTo.toISOString()
        body.historyCreatedTo = utcDate
      }
      if ('historyCreatedFrom' in body) {
        patientHistory = await getPatientHistory({
          patientId: patientProfile?.id as number,
          body: body,
        })
      }

      const filteredHistory = data.username
        ? patientHistory.filter((history) => {
            const fullName = history.metadata.createdByFullName ?? ''
            return fullName.toLowerCase().includes(data.username.toLowerCase())
          })
        : patientHistory
      setPatientHistory(filteredHistory)
    } catch (error) {
      if (error) alert('Something went wrong!')
    }
  }

  return (
    <Grid columns='12' className="h-[100%] flex-1">
      <Flex direction="column" className="col-span-3 h-full">
        <Heading
          size="3"
          className="col-span-1 p-1.5 text-[16px] text-[#151B4A]"
        >
          Patient Info Hx
        </Heading>
        <HistoryTable
          headerCellsStyles="[box-shadow:inset_0_0_0_0.2px_#0134DB72] bg-[#FFFF]"
          rowId={rowId}
          onRowSelect={onRowSelect}
          disablePagination
          bodyRowStyles="hover:bg-[#EEF2F6] cursor-pointer border-none"
          data={historyData}
          columns={columns}
        />
      </Flex>
      <Box className="relative col-span-9 h-full overflow-y-scroll">
        <FormContainer
          form={form}
          onSubmit={onSubmit}
          formClassName="sticky top-0 bg-[#FFF] ml-2"
        >
          <Flex className="col-span-4 mt-[-3px] gap-x-2 p-1" align="center">
            <FormTextInput
              placeholder="Search by User Name"
              className="h-6 text-[12px]"
              label=""
              {...form.register('username')}
            />
            <FormDatePicker
              buttonClassName="justify-between text-[#000000] shadow-none border-none min-w-[148px] h-6 font-light [box-shadow:inset_0_0_0_1px_#01062F38] text-[12px]"
              placeholder="Date From"
              reverse
              label=""
              {...form.register('historyCreatedFrom')}
            />
            <FormDatePicker
              buttonClassName="justify-between text-[#000000] shadow-none border-none min-w-[148px] h-6 font-light [box-shadow:inset_0_0_0_1px_#01062F38] text-[12px]"
              placeholder="Date To"
              reverse
              label=""
              {...form.register('historyCreatedTo')}
            />
            <IconButton
              type="submit"
              className="h-[24px] self-end bg-[#151B4A]"
            >
              <Search width={14} height={14} />
            </IconButton>
            <Button
              variant="outline"
              type="button"
              onClick={handleClearFilters}
              className="h-6 cursor-pointer self-end bg-[#FFF] font-[400] text-[#000000] [box-shadow:inset_0_0_0_0.4px_#9E9898CC]"
            >
              Clear
            </Button>
          </Flex>
        </FormContainer>
        <PatientInfo id={historyId} />
      </Box>
    </Grid>
  )
}

export { PatientInfoHistory }
