import { useState } from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { useProviderId } from '@/ui/schedule/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { cn } from '@/utils'
import {
  APPROVE_ALERT,
  NO_CHANGES_TO_APPROVE_ALERT,
  SAVE_BEFORE_APPROVE,
  VIEW_HISTORY_ALERT,
} from '../constant'
import { SavePreferencesButton } from './save-staff-button'

const StaffPreferencesHeader = ({
  heading,
  userId,
  isPendingStatus,
  hasUnsavedChanges,
  onApprove,
  showHistory,
}: {
  heading: string
  userId: number | undefined
  isPendingStatus: boolean
  hasUnsavedChanges: boolean

  onApprove: () => void
  showHistory?: () => void
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const loggedInUser = useGlobalStore((state) => state.user)
  const loggedInProviderId = useProviderId()

  const canViewHistory = useHasPermission(
    'clickHxMangStaffPrefAdminViewNonAdmin',
  )
  const canApprove = useHasPermission(
    'clickApproveMangStaffPrefAdminViewNonAdmin',
  )
  const showApproveButton = loggedInProviderId && loggedInUser.id === userId

  const handleApproval = () => {
    if (hasUnsavedChanges) {
      setIsOpen(true)
      setAlertMessage(SAVE_BEFORE_APPROVE)
      return
    }
    if (!isPendingStatus) {
      setIsOpen(true)
      setAlertMessage(NO_CHANGES_TO_APPROVE_ALERT)
      return
    }
    if (!canApprove) {
      setIsOpen(true)
      setAlertMessage(APPROVE_ALERT)
      return
    }
    onApprove()
  }

  return (
    <TabContentHeading title={heading} className="border-white flex-1">
      <Flex flexGrow="1" justify="end" align="center">
        <PermissionAlert
          isOpen={isOpen}
          message={alertMessage}
          showHeading={false}
          onClose={() => {
            setIsOpen(false)
            setAlertMessage('')
          }}
        />
        <Flex align="center" gap="2">
          <Text size="1">Status:</Text>
          <Text
            size="1"
            className={cn({
              'text-pp-states-error': isPendingStatus,
              'text-pp-states-success': !isPendingStatus,
            })}
          >
            {isPendingStatus ? 'Pending' : 'Approved'}
          </Text>
          {showApproveButton && (
            <Button
              variant="outline"
              color="gray"
              size="1"
              className="text-black"
              onClick={handleApproval}
              type="button"
            >
              Approve
            </Button>
          )}
          <Button
            variant="outline"
            color="gray"
            size="1"
            className="text-black"
            type="button"
            onClick={() => {
              if (!canViewHistory) {
                setIsOpen(true)
                setAlertMessage(VIEW_HISTORY_ALERT)
                return
              }
              showHistory?.()
            }}
          >
            Hx
          </Button>
          <SavePreferencesButton
            showPermissionAlert={(show, message) => {
              setIsOpen(show)
              setAlertMessage(message)
            }}
          />
        </Flex>
      </Flex>
    </TabContentHeading>
  )
}

export { StaffPreferencesHeader }
