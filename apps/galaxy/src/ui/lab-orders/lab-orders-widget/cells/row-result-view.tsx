'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import { LabOrders } from '@/types'
import { EditViewLabResult } from '../edit-view-lab-result'
import { LabResultDialog } from '../lab-result-dialog'
import { schema, SchemaType } from '../schema'
import { useStore } from '../store'
import { OrderingLabName, OrderStatus } from '../types'

interface LabResultsProps {
  row: Row<LabOrders>
}

const RowResultView = ({ row }: LabResultsProps) => {
  const {
    orderingLab: { name: orderingLabName },
    orderStatus,
  } = row.original

  const shouldEditLabResult =
    orderStatus === OrderStatus.ResultReceived &&
    orderingLabName === OrderingLabName.PsychPlus
  const { setSelectedTestId } = useStore()
  const [selectedTestName, setSelectedTestName] = useState('')

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      labResults: {},
    },
  })

  const handleCancel = () => {
    form.reset()
    setSelectedTestId(undefined)
  }

  return (
    <IconButton size="1" color="gray" variant="ghost">
      <LabResultDialog
        title={selectedTestName ? `View Results of ${selectedTestName}` : ''}
        onClose={handleCancel}
      >
        <EditViewLabResult
          shouldEditLabResult={shouldEditLabResult}
          row={row}
          form={form}
          setSelectedTestName={setSelectedTestName}
          selectedTestName={selectedTestName}
        />
      </LabResultDialog>
    </IconButton>
  )
}

export { RowResultView }
