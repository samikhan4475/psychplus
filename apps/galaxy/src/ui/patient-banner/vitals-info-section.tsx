'use client'

import { useEffect, useMemo, useState } from 'react'
import { genericEventBus } from '@/lib/generic-event-bus'
import { GenericPayload } from '@/types'
import { PatientVital } from '../vitals'
import { BmiValue } from './bmi-value'
import { LabelAndValue } from './label-and-value'

type VitalsEventPayload = {
  vitals?: PatientVital
  type?: string
}
interface VitalsInfoSectionProps {
  vitals?: PatientVital
  patientId: string
}

const VitalsInfoSection = ({
  vitals: initialVitals,
  patientId,
}: VitalsInfoSectionProps) => {
  const [eventVitals, setEventVitals] = useState<PatientVital | undefined>()
  useEffect(() => {
    const handleUpdateVitals = (
      message?: GenericPayload<VitalsEventPayload>,
    ) => {
      if (message?.type === 'vitals' && message?.vitals) {
        setEventVitals(message.vitals)
      }
    }
    const eventType = `${patientId}`
    genericEventBus.on(`${patientId}`, handleUpdateVitals)

    return () => {
      genericEventBus.off(eventType)
    }
  }, [])

  const vital = useMemo(
    () => eventVitals ?? initialVitals,
    [eventVitals, initialVitals],
  )

  const formatHeightInInches = (heightCm?: number) =>
    heightCm ? (heightCm * 0.39).toFixed(2) : undefined

  return (
    <>
      <LabelAndValue
        label="BP"
        value={
          vital?.systolic && vital?.diastolic
            ? `${vital.systolic}/${vital.diastolic} mm Hg`
            : undefined
        }
      />
      <LabelAndValue
        label="HR/Temp"
        value={
          vital?.pulseRate && vital?.bodyTemperatureC
            ? `${vital.pulseRate} / ${vital.bodyTemperatureF} F `
            : undefined
        }
      />
      <LabelAndValue
        label="Height/Weight"
        value={
          vital?.heightCm && vital.weightPounds
            ? `${formatHeightInInches(
                vital?.heightCm,
              )} / ${vital?.weightPounds?.toFixed(2)} lb`
            : undefined
        }
      />
      <BmiValue vital={vital} />
    </>
  )
}

export { VitalsInfoSection }
