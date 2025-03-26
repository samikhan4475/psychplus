import { Text } from '@radix-ui/themes'
import { useStore } from '../store'

const FollowupDenialReasonError = () => {
  const { followupDenialReasonError, isFollowupDenied } = useStore((state) => ({
    followupDenialReasonError: state.followupDenialReasonError,
    isFollowupDenied: state.isFollowupDenied,
  }))
  return (
    isFollowupDenied &&
    followupDenialReasonError && (
      <Text className={'text-[12px] text-tomato-11'}>
        {followupDenialReasonError}
      </Text>
    )
  )
}

export { FollowupDenialReasonError }
