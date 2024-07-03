'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { type Table } from '@tanstack/react-table'
import { PatientAssessment } from '@psychplus/assessment-and-treatment-plan/types'
import {
  DataTable,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { useStore } from '@/widgets/assessment-and-treatment-plan-list/store'
import { columns } from './columns'

const AssessmentListTable = ({
  rowId,
  isEditing,
}: {
  rowId: string
  isEditing: boolean
}) => {
  const { assessmentAndTreatmentPlans } = useStore()

  const data = assessmentAndTreatmentPlans.find((record) => record.id === rowId)
  const patientAssessments = data?.patientAssessments ?? []

  return (
    <DataTable
      data={patientAssessments}
      columns={columns(isEditing)}
      tableClass="border border-solid border-[lightgray] "
      tHeadClass="bg-[#F0F4FF]"
      thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
      isRowPan={true}
      toBodyClass="border-[lightgray]; border-b border-solid"
      columnCellClass="border border-solid border-[#F2F2F2] w-50"
      isPreferredPartnerTable={true}
      initialPageSize={10}
      renderFooter={DataTableFooter}
    />
  )
}

const DataTableFooter = (table: Table<PatientAssessment>) => (
  <Flex p="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

export { AssessmentListTable }
