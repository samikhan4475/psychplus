import { ChangeEvent } from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { FormFieldLabel } from '@/components'
import { useStore } from '../store'
import { FollowupDenialReasonError } from './followup-denial-reason-error'

const FollowupDenialReason = () => {
  const setFollowupDenialReason = useStore(
    (state) => state.setFollowupDenialReason,
  )
  const isFollowupDenied = useStore((state) => state.isFollowupDenied)
  const followupDenialReasonError = useStore(
    (state) => state.followupDenialReasonError,
  )
  const resetError = useStore((state) => state.resetError)
  const followupDenialReason = useStore((state) => state.followupDenialReason)

  const onReasonChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFollowupDenialReason(value)
    if (followupDenialReasonError && value) {
      resetError()
    }
  }

  return (
    <Flex direction="column" gapY="1" className="w-[29%]">
      <Flex className="flex-row gap-x-1" align="center" direction="column">
        <FormFieldLabel required>Reason</FormFieldLabel>
        <TextField.Root
          disabled={!isFollowupDenied}
          className="flex-1"
          placeholder="Add reason"
          size="1"
          value={followupDenialReason}
          onChange={onReasonChange}
        />
      </Flex>
      <FollowupDenialReasonError />
    </Flex>
  )
}

export { FollowupDenialReason }
