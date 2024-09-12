'use client'

import React from 'react'
import { CheckIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import {
  deleteResultAgainstLabOrderTest,
  updateResultAgainstLabOrderTest,
} from '@psychplus/lab-orders/api.client'
import { ResultActionCellProps, ResultData, TableMeta } from '../types'

const ResultActionCell = ({
  row,
  table,
  toast,
  appointmentId,
}: ResultActionCellProps) => {
  const meta = table.options.meta as TableMeta
  const setEditedRows = async (type: string) => {
    try {
      const elName = type
      const payload = meta?.rowData.find(
        (prev: ResultData) => prev.id === row.original.id,
      )

      if (elName !== 'edit') {
        meta?.revertData(row.index, elName === 'cancel')
      }
      if (
        elName === 'done' &&
        appointmentId &&
        row.original.orderId &&
        payload
      ) {
        await updateResultAgainstLabOrderTest(
          appointmentId,
          row.original.orderId,
          row.original.id,
          payload,
        )
        meta?.setEditedRows(null)
        toast({
          type: 'success',
          title: 'Result updated successfully against lab order',
        })
      } else if (payload) {
        meta?.setEditedRows(payload)
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({
          type: 'error',
          title: err.message,
        })
      } else {
        toast({
          type: 'error',
          title: (err as { message: string }).message,
        })
      }
    }
  }
  const handlerRemoveRow = async () => {
    try {
      if (appointmentId && row.original.orderId) {
        await deleteResultAgainstLabOrderTest(
          appointmentId,
          row.original.orderId,
          row.original.id,
        )
        meta.removeSpecificRow(row.index)
        toast({
          type: 'success',
          title: 'Result deleted successfully against lab order',
        })
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({
          type: 'error',
          title: err.message,
        })
      } else {
        toast({
          type: 'error',
          title: (err as { message: string }).message,
        })
      }
    }
  }
  return meta?.editedRows?.id === row?.original?.id ? (
    <Flex gap="2">
      <TrashIcon onClick={() => setEditedRows('cancel')} />
      <CheckIcon onClick={() => setEditedRows('done')} />
    </Flex>
  ) : (
    <Flex gap="2">
      <TrashIcon onClick={handlerRemoveRow} />
      <Pencil1Icon onClick={() => setEditedRows('edit')} />
    </Flex>
  )
}

export { ResultActionCell }
