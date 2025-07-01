import { useState } from 'react'
import { useParams } from 'next/navigation'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { toast } from 'react-hot-toast'
import { useHasPermission } from '@/hooks'
import { LocationPractice } from '@/types'
import { PermissionAlert } from '@/ui/schedule/shared'
import { maskAsPrimaryPracticeLocationAction } from '../actions'
import { useStore } from './store'

interface TableRowRadioCellProps {
  row: Row<LocationPractice>
}

const TableRowRadioCell = ({ row }: TableRowRadioCellProps) => {
  const hasPermission = useHasPermission(
    'canUncheckOrCheckOthersDeaAlertFromAdminView',
  )
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { setCheckedRecord, checkedRecord } = useStore((state) => ({
    checkedRecord: state.checkedRecord,
    setCheckedRecord: state.setCheckedRecord,
  }))
  const { id } = useParams<{ id: string }>()
  const isChecked =
    checkedRecord === row.original.id ||
    (!checkedRecord && row.original.isPrimaryPractice)
  const markAsPrimary = async (record: LocationPractice) => {
    if (!hasPermission) {
      setIsOpen(true)
      return
    }
    setLoading(true)
    setCheckedRecord(record.id)
    const response = await maskAsPrimaryPracticeLocationAction(id, record.id)
    if (response.state === 'error') {
      toast.error(response.error)
    }

    if (response.state === 'success') {
      toast.success('Practice marked as primary')
    }
    setLoading(false)
  }

  return (
    <Flex justify="between" align="center">
      {isOpen && (
        <PermissionAlert
          message="You do not have permission to update primary practice. Please contact your supervisor if you need any further assistance"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <RadixRadioGroup.Root
        value={isChecked ? 'yes' : ''}
        onValueChange={() => {
          markAsPrimary(row.original)
        }}
        className="flex items-center gap-1.5"
        disabled={loading}
      >
        <RadixRadioGroup.Item
          className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11"
          value="yes"
        >
          <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
        </RadixRadioGroup.Item>
      </RadixRadioGroup.Root>
    </Flex>
  )
}

export { TableRowRadioCell }
