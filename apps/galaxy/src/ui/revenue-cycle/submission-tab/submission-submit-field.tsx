import React, { useEffect, useState } from 'react'
import { Button, Flex, Select, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { getReceiverListOptionsAction } from '@/actions'
import { SelectOptionType } from '@/types'
import { cn } from '@/utils'
import { ClaimSubmissionDialog } from '../dialogs'
import { useStore } from './store'

const SubmissionSubmitField = () => {
  const claims = useStore((state) => state.data?.submissions)
  const [submissionTypes, setSubmissionTypes] = useState<SelectOptionType[]>([])
  const [clearingHouse, setClearingHouse] = useState('')

  useEffect(() => {
    getReceiverListOptionsAction().then((result) => {
      if (result.state === 'success') {
        setSubmissionTypes(result.data)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    })
  }, [])
  return (
    <Flex align="center" className="ml-auto">
      <Text size="1" weight="bold" mr="1">
        Clearinghouse
      </Text>
      <Select.Root
        value={clearingHouse}
        size="1"
        onValueChange={(value) => setClearingHouse(value)}
      >
        <Select.Trigger
          disabled={submissionTypes.length === 0}
          placeholder="Submission Type"
          className={cn('h-[var(--chip-height)] w-[122px]')}
        />
        <Select.Content position="popper" align="center" highContrast>
          {submissionTypes.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <ClaimSubmissionDialog claims={claims} clearingHouse={clearingHouse}>
        <Button
          variant="solid"
          size="1"
          highContrast
          className="disabled:text-white ml-1 h-[25px]"
        >
          Submit
        </Button>
      </ClaimSubmissionDialog>
    </Flex>
  )
}
export { SubmissionSubmitField }
