import { useEffect, useRef, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { getTimeLabel } from '@/utils'
import { SpravatoWidgetSchemaType } from '../../../spravato-widget-schema'
import { VitalsStatus, VitalTreatmentConfigType } from '../types'
import { evaluateVitals } from '../utils'
import { AddVitalButton } from './add-vital-button-block'

const VitalSignsAddButton = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()
  const vitalSigns = form.watch('vitalSigns')

  const currentTimeSlot = useRef(0)
  const isFirstTime = useRef<boolean>(true)

  const [disableButton, setDisableButton] = useState(false)

  const [buttonConfig, setButtonConfig] = useState<{
    [key: number]: VitalTreatmentConfigType
  }>({
    0: {
      showMessage: false,
      treatmentLabel: 'Prior to Treatment',
    },
  })

  const isCurrentVitalsGood = (systolic: number, diastolic: number) => {
    if (systolic >= 140 || diastolic >= 90) {
      return VitalsStatus.NOT_GOOD
    }
    return VitalsStatus.GOOD
  }

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

    if (nextConfig.discharge) {
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

  useEffect(() => {
    if (vitalSigns.length > 0 && isFirstTime.current) {
      let nextConfig = { ...buttonConfig }
      vitalSigns.reverse().forEach((item, index) => {
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

  return (
    <Flex direction="column" gap="2">
      {Object.values(buttonConfig).map((item, index) => (
        <AddVitalButton
          key={`${index + 1}`}
          {...item}
          disabled={
            index !== Object.values(buttonConfig).length - 1 || disableButton
          }
          generateVitalButtons={generateVitalMessages}
        />
      ))}
    </Flex>
  )
}

export { VitalSignsAddButton }
