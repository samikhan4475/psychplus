import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { useStore } from './store'

const FollowupSaveButton = ({ appointmentId }: { appointmentId: string }) => {
  const updateFollowupDenialStatus = useStore(
    (state) => state.updateFollowupDenialStatus,
  )
  const isFollowupDenied = useStore((state) => state.isFollowupDenied)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const onSave = async () => {
    setIsSaving(true)
    await updateFollowupDenialStatus({
      appointmentId: Number(appointmentId),
      shouldValidate: false,
    })
    setIsSaving(false)
  }

  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      className="text-black"
      disabled={!isFollowupDenied || isSaving}
      onClick={onSave}
    >
      Save
    </Button>
  )
}

export { FollowupSaveButton }
