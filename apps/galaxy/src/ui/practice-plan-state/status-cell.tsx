import React, { useState } from 'react'
import { Flex, Switch, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import {
  addPracticePlanStatesAction,
  updatePracticePlanStateAction,
} from './actions'
import { PracticePlan } from './types'

interface PracticePlanStatusCellProps {
  row: PropsWithRow<PracticePlan>['row']
  getPracticePlanStates: () => void
}

const PracticePlanStatusCell = ({
  row: { original },
  getPracticePlanStates,
}: PracticePlanStatusCellProps) => {
  const [loading, setLoading] = useState(false)
  const onCheckedChange = async () => {
    setLoading(true)
    const payload = {
      practicePlanId: original.practicePlanId,
      stateCode: original.stateCode,
      recordStatus: original.recordStatus === 'Active' ? 'Inactive' : 'Active',
    }
    const responseAction = original.metadata?.createdOn
      ? updatePracticePlanStateAction
      : addPracticePlanStatesAction

    const result = await responseAction({ payload })

    if (result.state === 'error') {
      return toast.error(
        result.error || 'Failed to update practice plan state status',
      )
    }

    toast.success('Practice plan state status updated successfully')
    setLoading(false)
    getPracticePlanStates()
  }
  return (
    <Flex gap="2">
      <Text className="text-1 font-medium text-gray-9">No</Text>
      <Switch
        size="1"
        color="green"
        disabled={loading}
        onCheckedChange={onCheckedChange}
        checked={original.recordStatus === 'Active'}
      />
      <Text className="text-1 font-medium">Yes</Text>
    </Flex>
  )
}

export { PracticePlanStatusCell }
