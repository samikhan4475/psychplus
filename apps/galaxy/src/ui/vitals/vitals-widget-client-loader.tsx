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
    getPatientVitalsAction({
      payload: {
        patientId: patientId,
      },
    }).then(async (result) => {
      if (result.state === 'error') {
        setError(result.error)
        setData([])
        setQuicknotesData([])
      } else {
        if (vitalsIds.length === 0 && result?.data.length > 0) {
          const vitalsWithin48Hours = filterVitalsWithin48Hours(result.data)

          const selectedVitalIds =
            vitalsWithin48Hours?.map((item) => String(item.id)) ?? []
          const payload = transformOut(patientId)({
            vitalsId: selectedVitalIds,
          })

          await saveWidgetAction({ patientId, data: payload })
        }
        if (!quicknotesData) {
          setData(
            result.data?.map((vital) => ({
              ...vital,
              addToNote: vitalsIds.includes(String(vital.id)),
            })),
          )
          setQuicknotesData(
            result.data?.filter((vital) =>
              vitalsIds.includes(String(vital.id)),
            ) ?? [],
          )
        }
      }
      setLoading(false)
    })
  }, [])

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
