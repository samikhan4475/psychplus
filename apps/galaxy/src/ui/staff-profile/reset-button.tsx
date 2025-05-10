import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { ShuffelIcon } from '@/components/icons'
import { useHasPermission } from '@/hooks'
import { ResetPasswordDialog } from '../change-password-dialog'
import { PermissionAlert } from '../schedule/shared'

const ResetButton = () => {
  const [showPermissionAlert, setShowPermissionAlert] = useState(false)
  const hasPermission = useHasPermission('clickResetStaffProfilePage')

  return (
    <>
      {hasPermission ? (
        <ResetPasswordDialog>
          <Button
            color="gray"
            className="text-black "
            size="1"
            variant="outline"
            type="button"
          >
            <ShuffelIcon width={15} height={15} />
            Change Password
          </Button>
        </ResetPasswordDialog>
      ) : (
        <Button
          color="gray"
          className="text-black "
          size="1"
          variant="outline"
          type="button"
          onClick={() => setShowPermissionAlert(true)}
        >
          <ShuffelIcon width={15} height={15} />
          Change Password
        </Button>
      )}
      <PermissionAlert
        isOpen={showPermissionAlert}
        message={`You do not have permission to change password. Please contact your supervisor if you need any further assistance.`}
        onClose={() => setShowPermissionAlert(false)}
      />
    </>
  )
}

export { ResetButton }
