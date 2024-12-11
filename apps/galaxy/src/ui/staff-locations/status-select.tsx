import React from 'react'
import { useParams } from 'next/navigation'
import { Select } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { updateStaffLocationAction } from './actions'
import { disablePrescriberDirectoryAction } from './actions/disable-prescriber-directory'
import { updatePrescriberDirectoryAction } from './actions/update-prescriber-directory'
import { useStore } from './store'

interface StatusSelectProps {
  recordStatus: string
  locationId: string
}

const StatusSelect = ({ recordStatus, locationId }: StatusSelectProps) => {
  const search = useStore((state) => state.search)
  const { id } = useParams()
  const onValueChange = async (value: string) => {
    if (id && typeof id === 'string') {
      const result = await updateStaffLocationAction({
        staffId: id,
        locationId,
        status: value === 'Active',
      })

      if (value === 'Inactive') {
        const disablePrescriberResult = await disablePrescriberDirectoryAction({
          staffId: id,
          locationId,
        })

        if (disablePrescriberResult.state === 'success') {
          toast.success('Prescriber Disabled Successfully')
        } else if (disablePrescriberResult.state === 'error') {
          toast.error(disablePrescriberResult.error)
        }
      }

      if (result.state === 'success') {
        toast.success('Status Updated Successfully')
        search({ staffId: id }, 1, true)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    }
  }
  const options = useCodesetOptions(CODESETS.RecordStatus)

  const items = options
    .filter((option) => !['Archived', 'Deleted'].includes(option.label))
    .map((option) => (
      <Select.Item
        key={option.value}
        value={option.value}
        disabled={option.disabled}
      >
        {option.label}
      </Select.Item>
    ))

  return (
    <Select.Root
      defaultValue={recordStatus}
      size="1"
      onValueChange={onValueChange}
    >
      <Select.Trigger
        placeholder="Select"
        className="h-[var(--chip-height)] w-full max-w-[90px] overflow-y-auto"
      />
      <Select.Content position="popper" align="center" highContrast>
        {items}
      </Select.Content>
    </Select.Root>
  )
}

export { StatusSelect }
