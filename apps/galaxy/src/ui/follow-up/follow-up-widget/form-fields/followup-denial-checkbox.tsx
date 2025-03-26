import { CheckboxCell } from '@/components'
import { useStore } from '../store'

const FollowupDenialCheckbox = () => {
  const {
    isFollowupDenied,
    setIsFollowupDenied,
    isFollowupExists,
    setFollowupDenialReason,
  } = useStore((state) => ({
    isFollowupDenied: state.isFollowupDenied,
    setIsFollowupDenied: state.setIsFollowupDenied,
    isFollowupExists: state.isFollowupExists,
    setFollowupDenialReason: state.setFollowupDenialReason,
  }))
  return (
    <CheckboxCell
      checked={isFollowupDenied}
      label="Patient did not want to follow up for this service at this time"
      className="h-6 gap-x-1 font-[500]"
      disabled={isFollowupExists}
      onCheckedChange={(checked) => {
        if (!checked) {
          setFollowupDenialReason('')
        }
        setIsFollowupDenied(checked)
      }}
    />
  )
}

export { FollowupDenialCheckbox }
