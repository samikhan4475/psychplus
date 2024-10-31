'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { LoadingPlaceholder, WidgetContainer } from '@/components'
import {
  AddVitalsButton,
  getLatest10Vitals,
  PatientVital,
} from './vitals-widget'
import { getPatientVitalsAction } from './vitals-widget/actions'
import { VitalsHistoryButton } from './vitals-widget/buttons/history/history'
import { VitalsTable } from './vitals-widget/vitals-table'

const QuicknotesVitalsWidget = ({ patientId }: { patientId: string }) => {
  const searchParams = useSearchParams()
  const [data, setData] = useState<PatientVital[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const appointmentId = searchParams.get('appointmentId') || '0'

  useEffect(() => {
    const fetchPatientVitals = async () => {
      setLoading(true)
      const result = await getPatientVitalsAction({
        payload: {
          appointmentId: Number(appointmentId),
          patientId: patientId,
        },
      })

      if (result.state === 'success') {
        setData(result.data)
        setLoading(false)
      }
    }

    fetchPatientVitals()
  }, [appointmentId, patientId])

  // TODO:: Integrate the API to fetch vitals from the QuickNotes API.
  // TODO:: If vitals are available in QuickNotes, display them; otherwise, render the latest 10 created vitals.

  const quicknotesVitals = getLatest10Vitals(data ?? [])

  return (
    <Tabs.Root defaultValue="SheetView" className="flex w-full flex-col">
      <WidgetContainer
        title="Vitals"
        headerRight={
          <>
            <AddVitalsButton
              title="Add"
              patientId={patientId}
              appointmentId={appointmentId}
              showSign
            />
            <VitalsHistoryButton
              patientId={patientId}
              appointmentId={appointmentId}
            />
          </>
        }
      >
        {loading ? (
          <LoadingPlaceholder />
        ) : (
          <VitalsTable data={quicknotesVitals ?? []} editStatusCell={false} />
        )}
      </WidgetContainer>
    </Tabs.Root>
  )
}

export { QuicknotesVitalsWidget }
