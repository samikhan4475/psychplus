'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectCell } from '@/components'
import { updatePatientVitalAction } from '../actions'
import { STATUS_CODESET } from '../constants'
import { useStore } from '../store'
import { PatientVital } from '../types'

const VitalStatusCell = ({
  row,
  editable,
}: {
  row: PatientVital
  editable: Boolean
}) => {
  const [loading, setLoading] = useState(false)
  const [vital, setVital] = useState<PatientVital>(row)

  useEffect(() => {
    setVital(row)
  }, [row])

  const { data, setData } = useStore((state) => ({
    data: state.data,
    setData: state.setData,
  }))

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
    }
    setLoading(false)
  }

  return (
    <SelectCell
      value={vital.recordStatus}
      onValueChange={onSubmit}
      options={STATUS_CODESET}
      className={
        {
          Inactive: 'bg-gray-3 text-gray-10',
        }[vital.recordStatus as string]
      }
      disabled={!editable || loading}
    />
  )
}

export { VitalStatusCell }
