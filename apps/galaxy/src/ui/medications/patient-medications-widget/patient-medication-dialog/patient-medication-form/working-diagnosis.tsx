'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { LoadingPlaceholder } from '@/components'
import { DiagnosisIcd10Code } from '@/types'
import { getQuickNotesWorkingDiagnosis } from '@/ui/diagnosis/diagnosis/actions/get-working-diagnosis'
import { getDiagnosisLimit } from '../../actions'
import { useStore } from '../../store'
import { DrugBlockProps } from '../../types'

const WorkingDiagnosis = ({ index }: DrugBlockProps) => {
  const form = useFormContext()
  const patientId = useStore((state) => state.patientId)
  const hasLoadedTopDiagnoses = useRef(false)

  const [topDiagnosisLoading, setTopDiagnosisLoading] = useState(false)
  const diagnosis = form.watch(`drugs[${index}].diagnosis`) ?? []
  const diagnosisLoading = useStore((state) => state.diagnosisLoading)

  const handleDelete = (code: string) => {
    const updatedDiagnosis = diagnosis.filter(
      (drug: DiagnosisIcd10Code) => drug.code !== code,
    )
    form.setValue(`drugs[${index}].diagnosis`, updatedDiagnosis)
  }

  useEffect(() => {
    const fetchTopDiagnoses = () => {
      setTopDiagnosisLoading(true);
    
      getQuickNotesWorkingDiagnosis({ patientId: String(patientId) })
        .then((response) => {
          if (response.state !== 'success') return;
    
          const allSectionItemValues = response.data
            ?.map((item) => item.sectionItemValue)
            .filter(Boolean);
    
          const rawCodes = allSectionItemValues
            .flatMap((value) => value.split(','))
            .map((code) => code.trim())
            .filter((code) => code && code !== 'empty');
    
          const diagnosisCodes = [...new Set(rawCodes)];
    
          if (diagnosisCodes.length > 0) {
            return getDiagnosisLimit({ diagnosisCodes }).then((diagnoseResponse) => {
              if (diagnoseResponse.state === 'success') {
                const top3 = diagnoseResponse.data
                  .slice(0, 3)
                  .map((item) => ({
                    ...item,
                    checked: true,
                    newDignoses: true,
                  }));
    
                form.setValue(`drugs[${index}].diagnosis`, top3);
              }
            });
          }
        })
        .catch((err) => {
          console.error('Failed to fetch top diagnoses', err);
        })
        .finally(() => {
          setTopDiagnosisLoading(false);
        });
    };    

    if (
      !hasLoadedTopDiagnoses.current &&
      (!diagnosis || diagnosis.length === 0)
    ) {
      hasLoadedTopDiagnoses.current = true
      fetchTopDiagnoses()
    }
  }, [form, index, patientId])

  if (diagnosisLoading || topDiagnosisLoading) {
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
        {diagnosis.map((data: DiagnosisIcd10Code) => (
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
            <Box onClick={() => handleDelete(data.code)}>
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
