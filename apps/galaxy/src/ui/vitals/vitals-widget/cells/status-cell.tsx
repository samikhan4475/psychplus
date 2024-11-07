'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectCell } from '@/components'
import { cn } from '@/utils'
import { updatePatientVitalAction } from '../actions'
import { STATUS_CODESET } from '../constants'
import { useStore } from '../store'
import { PatientVital } from '../types'

const VitalStatusCell = ({
  row,
  editable,
}: {
  row: PatientVital
  editable: boolean
}) => {
  const [loading, setLoading] = useState(false)
  const [vital, setVital] = useState<PatientVital>(row)

  useEffect(() => {
    setVital(row)
  }, [row])

  const { data, setData, quicknotesData, setQuicknotesData } = useStore(
    (state) => ({
      data: state.data,
      setData: state.setData,
      quicknotesData: state.quicknotesData,
      setQuicknotesData: state.setQuicknotesData,
    }),
  )

  const onSubmit = async (status: string) => {
    setLoading(true)

    const response = await updatePatientVitalAction({
      ...row,
      recordStatus: status,
    } as PatientVital)

    if (response.state === 'error') {
      toast.error('Failed to save!')
    } else {
      toast.success('Saved!')

      setData(
        data
          ? data.map((item) =>
              item.id === response.data.id
                ? { ...item, ...response.data }
                : item,
            )
          : [],
      )

      setQuicknotesData(
        quicknotesData
          ? quicknotesData.map((item) =>
              item.id === response.data.id
                ? { ...item, ...response.data }
                : item,
            )
          : [],
      )
    }
    setLoading(false)
  }

  return (
    <SelectCell
      value={vital.recordStatus}
      onValueChange={onSubmit}
      options={STATUS_CODESET}
      className={cn(
        editable &&
          vital.recordStatus === 'Inactive' &&
          'bg-gray-3 text-gray-10',
      )}
      disabled={!editable || loading}
    />
  )
}

export { VitalStatusCell }
