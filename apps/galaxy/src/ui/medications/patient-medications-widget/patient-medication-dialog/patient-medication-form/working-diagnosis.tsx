'use client'

import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { LoadingPlaceholder } from '@/components'
import { DiagnosisIcd10Code } from '@/types'
import { useStore } from '../../store'
import { DrugBlockProps } from '../../types'

const WorkingDiagnosis = ({ index }: DrugBlockProps) => {
  const form = useFormContext()
  const diagnosis = form.watch(`drugs[${index}].diagnosis`) ?? []
  const { diagnosisLoading } = useStore((state) => ({
    setDiagnosisLoading: state.setDiagnosisLoading,
    diagnosisLoading: state.diagnosisLoading,
  }))
  const handleDelete = (code: string) => {
    const updatedDiagnosis = diagnosis.filter(
      (drug: DiagnosisIcd10Code) => drug.code !== code,
    )
    form.setValue(`drugs[${index}].diagnosis`, updatedDiagnosis)
  }

  if (diagnosisLoading) {
    return <LoadingPlaceholder className="h-full w-full" />
  }
  if (!diagnosis?.length) {
    return null
  }
  return (
    <Flex
      direction="column"
      className="mt-2 w-full rounded-2 border-2 border-gray-3"
    >
      <Box className="bg-pp-focus-bg-2 sticky top-0 z-[1] h-5 w-full rounded-tl-2 rounded-tr-2 pl-1 leading-1">
        <Text weight="medium" size="1">
          Diagnosis
        </Text>
      </Box>
      <ScrollArea className="max-h-[80px] py-0.5 pr-2">
        {diagnosis?.map((data: DiagnosisIcd10Code) => (
          <Flex
            key={data.id}
            display="flex"
            justify="between"
            align="center"
            className="border-pp-table-border border-b px-1.5 pb-0.5"
          >
            <Text className="w-full" size="1">
              {`${data.code} ${data.description}`}
            </Text>
            <Box onClick={() => handleDelete(data?.code)}>
              <Trash2
                className="cursor-pointer"
                color="black"
                width={14}
                height={14}
              />
            </Box>
          </Flex>
        ))}
      </ScrollArea>
    </Flex>
  )
}

export { WorkingDiagnosis }
