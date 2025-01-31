'use client'

import { useRouter } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { PropsWithRow, TextCell } from '@/components'
import { useStore as useRootStore } from '@/store'
import {
  capitalizeName,
  cn,
  constructQuickNotesUrl,
  getPatientMRN,
} from '@/utils'
import { useStore as useQuickNotesStore } from '../../quicknotes/store'
import { SchedulingHistoryData } from '../types'

const VisitIDCell = ({ row }: PropsWithRow<SchedulingHistoryData>) => {
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)
  const patient = useQuickNotesStore((state) => state.patient)

  const onRowClick = () => {
    const { appointmentId, visitTypeCode, visitSequenceType } = row.original
    const href = constructQuickNotesUrl(
      patient.id,
      appointmentId,
      visitTypeCode,
      visitSequenceType,
    )
    const label = `${capitalizeName(
      `${patient?.legalName?.firstName ?? ''} ${
        patient?.legalName?.lastName ?? ''
      }`,
    )}-${getPatientMRN(patient.id)}-${row.original.appointmentId}`
    addTab({ href, label })
    router.push(href)
  }
  return (
    <Flex align="center" gap="1" p="1" onClick={onRowClick}>
      <Text className={cn('text-pp-black-3 cursor-pointer')} weight="regular" size="1">
        {row.original.visitId}
      </Text>
    </Flex>
  )
}

export { VisitIDCell }
