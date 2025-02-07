'use client'

import { useEffect, useState } from 'react'
import { Text } from '@radix-ui/themes'
import { saveWidgetAction } from '@/actions/save-widget'
import { LoadingPlaceholder } from '@/components'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { transformIn, transformOut } from './data'
import { QuicknotesVitalsWidget } from './quicknotes-vitals-widget'
import { getPatientVitalsAction } from './vitals-widget/client-actions'
import { useStore } from './vitals-widget/store'
import { filterVitalsWithin48Hours } from './vitals-widget/utils'

interface HospitalInitialWidgetLoaderProps {
  patientId: string
  data?: QuickNoteSectionItem[]
  appointment?: Appointment
}

const VitalsWidgetLoader = ({
  patientId,
  data: initialVitalData,
  appointment,
}: HospitalInitialWidgetLoaderProps) => {
  const [loading, setLoading] = useState(false)
  const { setData, setQuicknotesData, quicknotesData } = useStore((state) => ({
    setData: state.setData,
    setQuicknotesData: state.setQuicknotesData,
    quicknotesData: state.quicknotesData,
  }))

  const [error, setError] = useState('')
  const vitalsIds = transformIn(initialVitalData ?? []).vitalsId
  useEffect(() => {
    setLoading(true)
    setData([])
    setQuicknotesData([])
    setError('')

    getPatientVitalsAction({ payload: { patientId } })
      .then(async (result) => {
        if (result.state === 'error') {
          setError(result.error)
          return
        }

        const vitalsWithin48Hours = filterVitalsWithin48Hours(result.data)
        const selectedVitalIds = vitalsWithin48Hours.map((item) =>
          String(item.id),
        )

        if (vitalsIds.length === 0 && selectedVitalIds.length > 0) {
          const payload = transformOut(patientId)({
            vitalsId: selectedVitalIds,
          })
          await saveWidgetAction({ patientId, data: payload })
        }
        setData(
          result.data.map((vital) => ({
            ...vital,
            addToNote: vitalsIds.includes(String(vital.id)),
          })),
        )

        setQuicknotesData(
          result.data?.filter((vital) =>
            vitalsIds.includes(String(vital.id)),
          ) ?? [],
        )
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [patientId, initialVitalData])

  if (error) {
    return <Text>{error}</Text>
  }

  if (loading) {
    return <LoadingPlaceholder />
  }
  return (
    <QuicknotesVitalsWidget
      patientId={patientId}
      quicknoteData={quicknotesData ?? []}
      appointment={appointment}
    />
  )
}

export { VitalsWidgetLoader }
