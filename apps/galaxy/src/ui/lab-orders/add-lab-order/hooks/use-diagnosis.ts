import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
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

  const onClickDelete = (index: number) => {
    const newSelectedDiagnosisList = [...selectedDiagnosisList]
    newSelectedDiagnosisList.splice(index, 1)
    form.setValue('diagnosis', [...newSelectedDiagnosisList])
  }

  const getSearchedDiagnosis = useDebouncedCallback(async (value: string) => {
    if (value === '') return
    setLoading(true)
    const payload = { codeOrDescription: value, recordStatuses: ['Active'] }
    const result = await getDiagnosisLimit(payload)
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
      setTableLoading(false)
    }
  }

  useEffect(() => {
    if (orderId && appointmentId) getPatientDiagnosis()
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
