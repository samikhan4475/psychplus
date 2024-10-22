'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { LoadingPlaceholder, WidgetContainer } from '@/components'
import {
  AddVitalsButton,
  getLatest10Vitals,
  RECORD_STATUSES,
  useStore,
} from './vitals-widget'
import { VitalsTable } from './vitals-widget/vitals-table'

const QuicknotesVitalsWidget = ({ patientId }: { patientId: string }) => {
  const searchParams = useSearchParams()

  const appointmentId = searchParams.get('appointmentId') || '0'

  const { data, fetch, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetch: state.fetch,
  }))

  useEffect(() => {
    fetch({ appointmentId, patientId, recordStatuses: RECORD_STATUSES })
  }, [])

  // TODO:: Integrate the API to fetch vitals from the QuickNotes API.
  // TODO:: If vitals are available in QuickNotes, display them; otherwise, render the latest 10 created vitals.

  const quicknotesVitals = getLatest10Vitals(data ?? [])

  return (
    <Tabs.Root defaultValue="SheetView" className="flex w-full flex-col">
      <WidgetContainer
        title="Vitals"
        headerRight={
          <AddVitalsButton
            title="Add"
            patientId={patientId}
            appointmentId={appointmentId}
            showSign
          />
        }
      >
        {loading ? (
          <LoadingPlaceholder />
        ) : (
          <VitalsTable data={quicknotesVitals ?? []} />
        )}
      </WidgetContainer>
    </Tabs.Root>
  )
}

export { QuicknotesVitalsWidget }
