import React from 'react'
import toast from 'react-hot-toast'
import { PropsWithRow, SelectCell } from '@/components'
import {
  addPrescriberSettingsAction,
  updatePrescriberSettingsAction,
} from '../../actions'
import { PrescriberDataResponse, PrescriberKeys } from '../../types'

interface StatusSelectCellProps extends PropsWithRow<PrescriberDataResponse> {
  getPrescriberData: () => void
  value: string
  userId: string
}

const statusOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]

const StatusSelectCell = ({
  value,
  userId,
  row,
  getPrescriberData,
}: StatusSelectCellProps) => {
  const contentCode = row.original[value as PrescriberKeys]

  const [content, id] = contentCode.split('_')

  const onChange = async (content: string) => {
    const payload = {
      name: `${row.original.stateCode}_${value}`,
      content,
      userId,
    }

    const result = await (id
      ? updatePrescriberSettingsAction({
          payload,
          settingId: id,
          userId,
        })
      : addPrescriberSettingsAction({ payload, userId }))

    if (result.state === 'success') {
      getPrescriberData()
    } else if (result.state === 'error') {
      toast.error(result.error)
    }
  }
  const disabled =
    row.original.Prescriber.includes('No') && value !== 'Prescriber'
  return (
    <SelectCell
      disabled={disabled}
      value={content}
      options={statusOptions}
      onValueChange={onChange}
    />
  )
}

export { StatusSelectCell }
