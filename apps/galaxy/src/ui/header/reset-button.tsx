import { useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
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
          <Flex
            gap="2"
            className="hover:bg-pp-bg-accent cursor-pointer p-1 transition-colors hover:text-gray-12"
          >
            <ShuffelIcon width={15} height={15} />
            <Text className="text-[12px]">Change Password</Text>
          </Flex>
        </ResetPasswordDialog>
      ) : (
        <Flex
          gap="2"
          className="hover:bg-pp-bg-accent cursor-pointer p-1 transition-colors hover:text-gray-12"
          onClick={() => setShowPermissionAlert(true)}
        >
          <ShuffelIcon width={15} height={15} />
          <Text className="text-[12px]">Change Password</Text>
        </Flex>
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
