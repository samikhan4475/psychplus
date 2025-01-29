'use client'

import { useEffect, useRef, useState } from 'react'
import { getTimeLabel } from '@/utils'
import { VitalsStatus, VitalTreatmentConfigType } from '../types'
import { evaluateVitals } from '../utils'

export default (vitalSigns: any, form?: any) => {
  const isFirstTime = useRef<boolean>(true)

  const isCurrentVitalsGood = (systolic: number, diastolic: number) => {
    if (systolic >= 140 || diastolic >= 90) {
      return VitalsStatus.NOT_GOOD
    }
    return VitalsStatus.GOOD
  }

  const currentTimeSlot = useRef(0)
  const [disableButton, setDisableButton] = useState(false)

  const [buttonConfig, setButtonConfig] = useState<{
    [key: number]: VitalTreatmentConfigType
  }>({
    0: {
      showMessage: false,
      treatmentLabel: 'Prior to Treatment',
    },
  })

  const setCurrentTimeSlot = (value: number) => {
    currentTimeSlot.current = value
  }

  const generateVitalsAddButton = (
    vitalTreatmentConfigAction: { [key: number]: VitalTreatmentConfigType },
    isVitalsGood: VitalsStatus,
  ) => {
    const previousTimeSLot = currentTimeSlot.current
    const nextConfig = evaluateVitals(
      currentTimeSlot.current,
      isVitalsGood,
      setCurrentTimeSlot,
    )
    const newConfig = { ...vitalTreatmentConfigAction }

    if (previousTimeSLot === currentTimeSlot.current) {
      newConfig[previousTimeSLot] = { ...nextConfig }
    } else {
      newConfig[previousTimeSLot].showMessage = true
      newConfig[previousTimeSLot].information = nextConfig.information
      newConfig[previousTimeSLot].treatmentStatus = nextConfig.treatmentStatus
      newConfig[currentTimeSlot.current] = {
        showMessage: false,
        treatmentLabel: nextConfig.treatmentLabel,
      }
    }

    if (nextConfig.discharge && form) {
      form.setValue(
        'dischargeTime',
        getTimeLabel(new Date().toISOString(), false),
      )
    }
    setDisableButton(nextConfig.disable)

    return newConfig
  }

  const generateVitalMessages = (_vitalSigns: any) => {
    const newConfig = generateVitalsAddButton(
      { ...buttonConfig },
      isCurrentVitalsGood(+_vitalSigns[0].systolic, +_vitalSigns[0].diastolic),
    )
    setButtonConfig({ ...newConfig })
  }

  const setIsFirstTime = () => {
    isFirstTime.current = true
    currentTimeSlot.current = 0
  }

  useEffect(() => {
    if (vitalSigns.length > 0 && isFirstTime.current) {
      let nextConfig = { ...buttonConfig }
      vitalSigns.reverse().forEach((item: any, index: any) => {
        const newConfig = generateVitalsAddButton(
          { ...nextConfig },
          isCurrentVitalsGood(+item.systolic, +item.diastolic),
        )
        nextConfig = { ...nextConfig, ...newConfig }
        isFirstTime.current = !(vitalSigns.length - 1 === index)
      })
      setButtonConfig({ ...nextConfig })
    } else {
      isFirstTime.current = false
    }
  }, [vitalSigns])

  return {
    buttonConfig,
    disableButton,
    generateVitalMessages,
    setIsFirstTime,
  }
}
