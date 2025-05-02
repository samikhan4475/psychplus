'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { getTimeLabel } from '@/utils'
import { VitalSignData, VitalsStatus, VitalTreatmentConfigType } from '../types'
import { evaluateVitals } from '../utils'

export default (vitalSigns: VitalSignData[]) => {
  const form = useFormContext()
  const isFirstTime = useRef<boolean>(true)

  const currentTimeSlot = useRef(0)
  const prevAppId = useRef(0)
  const appId = Number(useSearchParams().get('id'))

  const [disableButton, setDisableButton] = useState(false)

  const [buttonConfig, setButtonConfig] = useState<{
    [key: number]: VitalTreatmentConfigType
  }>({
    0: {
      showMessage: false,
      treatmentLabel: 'Prior to Treatment',
    },
  })

  const isCurrentVitalsGood = (
    systolic: number,
    diastolic: number,
    isOkToProceed: string,
  ) => {
    if (isOkToProceed === 'true' && currentTimeSlot.current === 0) {
      return VitalsStatus.GOOD
    } else {
      if (systolic >= 140 || diastolic >= 90) {
        return VitalsStatus.NOT_GOOD
      }
      return VitalsStatus.GOOD
    }
  }

  const setCurrentTimeSlot = (value: number) => {
    currentTimeSlot.current = value
  }

  const generateVitalsAddButton = (
    vitalTreatmentConfigAction: { [key: number]: VitalTreatmentConfigType },
    isVitalsGood: VitalsStatus,
    isOkToProceed: boolean,
  ) => {
    const previousTimeSLot = currentTimeSlot.current
    const nextConfig = evaluateVitals(
      currentTimeSlot.current,
      isVitalsGood,
      setCurrentTimeSlot,
      isOkToProceed,
    )
    const newConfig = { ...vitalTreatmentConfigAction }

    if (previousTimeSLot === currentTimeSlot.current) {
      newConfig[previousTimeSLot] = { ...nextConfig }
    } else {
      newConfig[previousTimeSLot] = {
        ...newConfig[previousTimeSLot],
        information: nextConfig?.information ?? '',
        showMessage: nextConfig.showMessage,
        treatmentStatus: nextConfig.treatmentStatus,
      }
      newConfig[currentTimeSlot.current] = {
        showMessage: false,
        treatmentLabel: nextConfig?.treatmentLabel ?? '',
      }
    }

    if (form) {
      const vitalSigns: VitalSignData[] = form.getValues('vitalSigns')
      if (vitalSigns.length > 0) {
        vitalSigns[0].label =
          newConfig[Number(vitalSigns[0].timeSlot)]?.treatmentLabel ?? ''
        vitalSigns[0].information =
          newConfig[Number(vitalSigns[0].timeSlot)]?.information ?? ''
        form.setValue('vitalSigns', [...vitalSigns])
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
      isCurrentVitalsGood(
        +_vitalSigns[0].systolic,
        +_vitalSigns[0].diastolic,
        _vitalSigns[0].isOkToProceed,
      ),
      _vitalSigns[0].isOkToProceed === 'true',
    )
    setButtonConfig({ ...newConfig })
  }

  const setIsFirstTime = () => {
    isFirstTime.current = true
    currentTimeSlot.current = 0
  }

  useEffect(() => {
    if (!isFirstTime.current && prevAppId.current !== appId) {
      prevAppId.current = appId
      isFirstTime.current = true
      currentTimeSlot.current = 0
      setDisableButton(false)
      setButtonConfig({
        0: {
          showMessage: false,
          treatmentLabel: 'Prior to Treatment',
        },
      })
    }
  }, [appId])

  const shouldUseVitalsFirstTime = () =>
    vitalSigns.length > 0 && isFirstTime.current

  useEffect(() => {
    if (shouldUseVitalsFirstTime()) {
      prevAppId.current = appId
      let nextConfig = { ...buttonConfig }
      vitalSigns.toReversed().forEach((item, index) => {
        if (item?.appId === appId) {
          const newConfig = generateVitalsAddButton(
            { ...nextConfig },
            isCurrentVitalsGood(
              +item.systolic,
              +item.diastolic,
              item?.isOkToProceed ?? 'false',
            ),
            item?.isOkToProceed === 'true',
          )
          nextConfig = { ...nextConfig, ...newConfig }
          isFirstTime.current = vitalSigns.length - 1 !== index
        }
      })
      setButtonConfig({ ...nextConfig })
    } else {
      isFirstTime.current = false
      if (vitalSigns.length === 0) {
        currentTimeSlot.current = 0
        setDisableButton(false)
        setButtonConfig({
          0: {
            showMessage: false,
            treatmentLabel: 'Prior to Treatment',
          },
        })
      }
    }
  }, [vitalSigns])

  return {
    buttonConfig,
    disableButton,
    generateVitalMessages,
    setIsFirstTime,
  }
}
