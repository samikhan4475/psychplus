'use client'

import { Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { LoadingPlaceholder } from '@/components'
import { DiagnosisIcd10Code } from '@/types'
import { cn } from '@/utils'
import { useStore } from '../../store'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'
import { PatientMedicationSchemaType } from './schema'

const ServiceDiagnosisList = ({ index }: DrugBlockProps) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const field = getFieldName(index, 'diagnosis')
  const { loadingServicesDiagnosis, serviceDiagnosisData } = useStore(
    (state) => ({
      fetchServiceDiagnosis: state.fetchServiceDiagnosis,
      loadingServicesDiagnosis: state.loadingServicesDiagnosis,
      serviceDiagnosisData: state.serviceDiagnosisData,
    }),
  )
  const diagnosis = form.watch(field) ?? []
  const handleValueChange = (option: DiagnosisIcd10Code) => {
    form.setValue(field, [...diagnosis, { ...option, id: Number(option.id) }])
  }

  if (loadingServicesDiagnosis) {
    return <LoadingPlaceholder className="mt-5" />
  }
  if (!serviceDiagnosisData?.length) {
    return (
      <Text weight="medium" size="1" className="p-2">
        No data found
      </Text>
    )
  }

  return (
    <ScrollArea className="h-40">
      {serviceDiagnosisData?.map((option, index) => {
        const isDisabled = diagnosis.find((item) => item.code === option?.code)
        return (
          <Flex
            key={option.code + index}
            justify="between"
            align="center"
            p="1"
            onMouseDown={(e) => {
              e.stopPropagation()
              if (!isDisabled) handleValueChange(option)
            }}
            className={cn('hover:bg-pp-bg-accent rounded-2', {
              'cursor-not-allowed opacity-30': isDisabled,
              'cursor-pointer opacity-100': !isDisabled,
            })}
          >
            <Text className="text-[11px]">{`${option.code} ${option.description}`}</Text>
            <IconButton color="gray" variant="ghost">
              <PlusCircleIcon
                stroke="#194595"
                strokeWidth="2"
                height="15"
                width="15"
              />
            </IconButton>
          </Flex>
        )
      })}
    </ScrollArea>
  )
}

export { ServiceDiagnosisList }
