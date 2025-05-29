'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { LoadingPlaceholder } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { DrugInfo } from '@/types'
import { cn } from '@/utils'
import { useStore } from '../../store'
import { PatientMedicationSchemaType } from '../patient-medication-form'

const DrugsList = ({
  onSelect,
  replaceIndex,
}: {
  onSelect?: (drug: DrugInfo) => void
  replaceIndex?: number | null
}) => {
  const { drugsData, loadingDrugs } = useStore((state) => ({
    drugsData: state.drugsData,
    loadingDrugs: state.loadingDrugs,
  }))

  const form = useFormContext<PatientMedicationSchemaType>()
  const drugs = form.watch('drugs')
  const todayDate = new Date().toISOString().split('T')[0]
  const currentTime = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const PrescriptionDosageFormList = useCodesetCodes(
    CODESETS.PrescriptionDosageFormList,
  )

  const handleValueChange = (option: DrugInfo) => {
    const doseFromDesc = PrescriptionDosageFormList.find(
      (item) =>
        item.display.toLocaleLowerCase() ===
        option.doseFormDesc.toLocaleLowerCase(),
    )
    const defaultValues: PatientMedicationSchemaType['drugs'][number] = {
      doseStrength: option.medStrength,
      prescribableDrugDesc: option.prescribableDrugDesc,
      startDateTime: todayDate,
      startTime: currentTime,
      doseRouteCode: '',
      refills: '0',
      doseUnitCode: option.medStrengthUnit,
      doseFormCode: doseFromDesc?.value ?? '',
      duration: '',
      durationUnitCode: '',
      rxNormCode: option.rxCui,
      doseFrequencyCode: '',
      prescribingStaffId: '',
      quantityValue: '',
      endDateTime: '',
      endTime: '',
      sigDescription: '',
      drugCode: option?.representativeErxPackagedDrug?.packagedDrugId ?? '',
      DeaSchedule:
        option?.representativeErxPackagedDrug?.federalDeaClassCode ?? '',
      medicationStatus: 'Active',
    }
    if (replaceIndex !== null && replaceIndex !== undefined) {
      const updated = [...drugs]
      updated[replaceIndex] = defaultValues
      form.setValue('drugs', updated)
    } else {
      drugs.push(defaultValues)
      form.setValue('drugs', drugs)
    }
    onSelect?.(option)
  }
  if (loadingDrugs) {
    return <LoadingPlaceholder className="mt-5" />
  }
  if (drugsData?.length === 0) {
    return (
      <Text weight="medium" className="text-[12px]">
        No data found
      </Text>
    )
  }

  return (
    <Box>
      {drugsData?.map((option: DrugInfo, index: number) => {
        const isDisabled = drugs.find(
          (item) => item.prescribableDrugDesc === option.prescribableDrugDesc,
        )
        return (
          <Flex
            key={option.prescribableDrugDesc + index}
            justify="between"
            align="center"
            p="1"
            onMouseDown={(e) => {
              e.stopPropagation()
              if (!isDisabled) handleValueChange(option)
            }}
            className={cn(
              `hover:bg-pp-bg-accent rounded-2 ${
                isDisabled
                  ? 'cursor-not-allowed opacity-30'
                  : 'cursor-pointer opacity-100'
              }`,
            )}
          >
            <Text className="w-[85%] text-[11px]">{`${option.prescribableDrugDesc} `}</Text>
            <PlusCircleIcon
              stroke="#194595"
              strokeWidth="2"
              height="15"
              width="15"
            />
          </Flex>
        )
      })}
    </Box>
  )
}

export { DrugsList }
