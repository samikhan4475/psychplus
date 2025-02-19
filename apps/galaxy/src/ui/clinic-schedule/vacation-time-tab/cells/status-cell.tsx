'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { updateVacationAction } from '../actions'
import { ACTIVE_CLINIC_ERROR_MESSAGE } from '../constant'
import { AlertDialog } from '../shared/alert-dialog'
import { StatusHistoryButton } from '../status-history-button'
import { useStore } from '../store'
import { VacationStatus, VacationTime } from '../types'

const StatusCell = ({
  row: { original: vacation },
}: PropsWithRow<VacationTime>) => {
  const options = useCodesetOptions(CODESETS.VacationStatus)
  const refetch = useStore((state) => state.refetch)
  const [selectedValue, setSelectedValue] = useState(vacation?.vacationStatus)
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const handleVacationStatusUpdate = async (value: string) => {
    setSelectedValue(value)
    setLoading(true)
    const result = await updateVacationAction({
      ...vacation,
      vacationStatus: value,
    })
    if (result.state === 'error') {
      setSelectedValue(vacation?.vacationStatus ?? '')
      setLoading(false)
      return toast.error(result.error)
    }

    toast.success('Successfully updated!')

    if (
      result?.data?.isActiveClinicVisitPresent &&
      result.data.vacationStatus === VacationStatus.Approved
    ) {
      setLoading(false)
      return setIsError(true)
    }
    setLoading(false)
    refetch()
  }

  return (
    <Flex gap="2" className="w-full" align="center">
      <StatusHistoryButton vacationTimeId={String(vacation.id)} />
      <SelectCell
        className="flex-1"
        options={options}
        value={selectedValue}
        onValueChange={handleVacationStatusUpdate}
        disabled={loading}
      />
      <AlertDialog
        open={isError}
        message={ACTIVE_CLINIC_ERROR_MESSAGE}
        onClose={() => {
          setIsError(false)
          refetch()
        }}
      />
    </Flex>
  )
}

export { StatusCell }
