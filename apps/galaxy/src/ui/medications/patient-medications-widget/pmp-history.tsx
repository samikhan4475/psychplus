'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { History } from 'lucide-react'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import {
  CloseDialogTrigger,
  ColumnHeader,
  DataTable,
  DatePickerInput,
  FormContainer,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import {
  formatDateTime,
  formatEndOfDay,
  formatStartOfDay,
  isValidDateRange,
  sanitizeFormData,
} from '@/utils'
import { searchPMPAction } from './actions'
import { PmpScore, PmpScoreRequest, PmpScoreResponse } from './types'

interface DialogProps {
  patientId: string
  appointmentId: string
}

const columns: ColumnDef<PmpScoreResponse>[] = [
  {
    id: 'staffName.updatedOn',
    accessorKey: 'metadata.updatedOn',
    header: ({ column }) => (
      <ColumnHeader label="Date Time" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell className="w-[120px]">
        {formatDateTime(
          row.original.metadata.updatedOn ?? row.original.metadata.createdOn,
        )}
      </TextCell>
    ),
  },
  {
    id: 'staffName.firstName',
    accessorKey: 'staffName.firstName',
    header: ({ column }) => (
      <ColumnHeader label="Provider" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell className="w-[150px]">
        {`${row.original.staffName.firstName} ${row.original.staffName.lastName}`}
      </TextCell>
    ),
  },
  {
    id: 'newValue',
    accessorKey: 'newValue',
    header: ({ column }) => (
      <ColumnHeader label="Risk Score" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <Flex gap="1" className="flex-wrap whitespace-nowrap">
        <TextCell>
          {row.original.pmpScores.map((item: PmpScore, index: number) => (
            <Text key={item.id} size="1" className="pt-1">
              <strong>{item.scoreType}</strong> {item.scoreValue}
              {index !== row.original.pmpScores.length - 1 && ' | '}
            </Text>
          ))}
        </TextCell>
      </Flex>
    ),
  },
]

const schema = z.object({
  dateFrom: z.custom<DateValue>().nullable(),
  dateTo: z.custom<DateValue>().nullable(),
})

type PMPHistoryFilterSchemaType = z.infer<typeof schema>

const PMPHistoryDialog = ({ patientId, appointmentId }: DialogProps) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<PmpScoreResponse[]>([])
  const [loading, setLoading] = useState(true)

  const onOpenChange = (isOpen: boolean) => setOpen(isOpen)

  const fetchPMPHistory = async (payload?: PmpScoreRequest) => {
    setLoading(true)
    const reqPayload = {
      ...payload,
      patientId: Number(patientId),
    }
    const response = await searchPMPAction({ payload: reqPayload })
    setLoading(false)
    if (response.state === 'error') return setData([])
    setData(response.data)
  }

  useEffect(() => {
    if (open) fetchPMPHistory()
  }, [open])

  const form = useForm<PMPHistoryFilterSchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      dateFrom: undefined,
      dateTo: undefined,
    },
  })

  const onSubmit: SubmitHandler<PMPHistoryFilterSchemaType> = (data) => {
    const isValid = isValidDateRange(data.dateFrom, data.dateTo)
    if (!isValid) {
      toast.error('To date must be the same or after From date')
      return
    }
    const payload = {
      fromDateTime: data.dateFrom ? formatStartOfDay(data.dateFrom) : '',
      toDateTime: data.dateTo ? formatEndOfDay(data.dateTo) : '',
      patientId: Number(patientId),
      // appointmentId: Number(appointmentId),
    }
    const payloadSanitized = sanitizeFormData(payload)
    fetchPMPHistory(payloadSanitized)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button size="1" variant="outline" color="gray" className="text-black">
          <History height={16} width={16} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[1000px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          PMP History
        </Dialog.Title>
        <FormContainer
          className="bg-white mb-2 flex-row gap-1.5 px-2 py-1"
          form={form}
          onSubmit={onSubmit}
        >
          <Flex className="flex-row items-center gap-1">
            <DatePickerInput
              field="dateFrom"
              className="w-[101px]"
              yearFormat="YYYY"
            />
          </Flex>
          <Flex className="flex-row items-center gap-1">
            <DatePickerInput
              field="dateTo"
              className="w-[101px]"
              yearFormat="YYYY"
            />
          </Flex>
          <Button
            color="gray"
            className="text-black"
            size="1"
            variant="outline"
            type="button"
            onClick={() => {
              form.reset()
              fetchPMPHistory()
            }}
          >
            Clear
          </Button>
          <Button highContrast size="1" type="submit">
            <MagnifyingGlassIcon strokeWidth={2} />
          </Button>
        </FormContainer>
        {loading ? (
          <Flex height="200px" align="center" justify="center">
            <LoadingPlaceholder />
          </Flex>
        ) : (
          <ScrollArea>
            <DataTable
              data={data}
              columns={columns}
              disablePagination
              sticky
              tableClass="h-[200px]"
            />
          </ScrollArea>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PMPHistoryDialog }
