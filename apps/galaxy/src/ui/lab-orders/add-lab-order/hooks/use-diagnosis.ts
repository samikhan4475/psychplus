import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { getQuickNotesWorkingDiagnosis } from '@/ui/diagnosis/diagnosis/actions/get-working-diagnosis'
import { getDiagnosis, getDiagnosisLimit } from '../api'
import { DiagnosisType } from '../blocks/types'
import { LabOrderSchemaType } from '../lab-order-schema'

export default () => {
  const [diagnosisList, setDiagnosisList] = useState<DiagnosisType[]>([])
  const [loading, setLoading] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)
  const appointmentId = useSearchParams().get('id') ?? ''
  const form = useFormContext<LabOrderSchemaType>()
  const orderId = form.watch('labOrderId') ?? ''
  const selectedDiagnosisList = form.watch('diagnosis')
  const { id } = useParams<{ id: string }>()

  const onClickDelete = (index: number) => {
    const newSelectedDiagnosisList = [...selectedDiagnosisList]
    newSelectedDiagnosisList.splice(index, 1)
    form.setValue('diagnosis', [...newSelectedDiagnosisList])
  }

  const getSearchedDiagnosis = useDebouncedCallback(async (value: string) => {
    if (value === '') return
    setLoading(true)
    const payload = { codeOrDescription: value, recordStatuses: ['Active'] }
    const result = await getDiagnosisLimit(payload, 0, 10)
    if (result.state === 'success') setDiagnosisList(result?.data ?? [])
    setLoading(false)
  }, 500)

  const onClickDiagnosisItem = (diagnosis: DiagnosisType) => {
    form.setValue('diagnosis', [
      ...selectedDiagnosisList,
      { ...diagnosis, checked: true, newDignoses: true },
    ])
  }

  const getPatientDiagnosis = async () => {
    setTableLoading(true)
    const result = await getDiagnosis(appointmentId, orderId)
    if (result.state === 'success' && result.data && result.data.length > 0) {
      const newDiagnosisData = result.data.map((item: DiagnosisType) => ({
        ...item,
        code: item.diagnosisCode,
        description: item.diagnosisDescription,
      }))

      form.setValue('diagnosis', [...newDiagnosisData])
    }
    setTableLoading(false)
  }

  const getQuickNoteDiagnosis = async () => {
    setTableLoading(true);
    const response = await getQuickNotesWorkingDiagnosis({ patientId: id });
  
    if (response.state === 'success') {
      const allSectionItemValues = response.data
        ?.map((item) => item.sectionItemValue)
        .filter(Boolean);
  
      const rawCodes = allSectionItemValues
        .flatMap((value) => value.split(','))
        .map((code) => code.trim())
        .filter((code) => code && code !== 'empty');
  
      const diagnosisCodes = [...new Set(rawCodes)];
  
      if (diagnosisCodes.length > 0) {
        const diagnoseResponse = await getDiagnosisLimit({ diagnosisCodes });
  
        if (diagnoseResponse.state === 'success') {
          setDiagnosisList(diagnoseResponse?.data ?? []);
          if (diagnoseResponse?.data?.length) {
            const diagnosises = diagnoseResponse?.data?.map((item) => ({
              ...item,
              checked: true,
              newDignoses: true,
            }));
            form.setValue('diagnosis', diagnosises);
          }
        }
      }
    } else {
      toast.error('Failed to fetch diagnosis');
    }
  
    setTableLoading(false);
  };  

  useEffect(() => {
    if (orderId && appointmentId) {
      getPatientDiagnosis()
    } else {
      getQuickNoteDiagnosis()
    }
  }, [])

  return {
    getSearchedDiagnosis,
    diagnosisList,
    selectedDiagnosisList,
    onClickDiagnosisItem,
    onClickDelete,
    loading,
    tableLoading,
  }
}
