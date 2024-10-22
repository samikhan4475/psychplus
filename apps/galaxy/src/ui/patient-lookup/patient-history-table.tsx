'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { getPatientHistoryAction } from '@/actions'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './patient-history-columns'
import { transformResponseData } from './transform'
import { Patient } from './types'

interface PatientHistoryTableProps {
  patientId: number
}
const PatientHistoryTable = ({ patientId }: PatientHistoryTableProps) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Patient[]>([])

  useEffect(() => {
    setLoading(true)
    getPatientHistoryAction(patientId?.toString(), {}).then((response) => {
      if (response.state === 'error') {
        toast.error(response.error)
      } else if (response.state === 'success') {
        setData(transformResponseData(response?.data ?? []))
      }
      setLoading(false)
    })
  }, [patientId])

  if (loading) {
    return <LoadingPlaceholder className="h-20" />
  }
  return (
    <ScrollArea className="max-h-44 p-2">
      <DataTable
        columns={columns}
        data={data}
        sticky
        theadClass="z-[1]"
        disablePagination
      />
    </ScrollArea>
  )
}

export { PatientHistoryTable }
