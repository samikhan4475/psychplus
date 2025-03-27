import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button, Flex, Text } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { useProviderId } from '@/ui/schedule/hooks'
import { cn } from '@/utils'
import {
  APPROVE_ALERT,
  NO_CHANGES_TO_APPROVE_ALERT,
  VIEW_HISTORY_ALERT,
} from '../constant'
import { useStore } from '../store'
import { PermissionAlert } from './permission-alert'
import { SavePreferencesButton } from './save-staff-button'

const StaffPreferencesHeader = ({
  userId,
  onApprove,
  showHistory,
}: {
  userId: number
  onApprove: () => void
  showHistory?: () => void
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const loggedInUser = useGlobalStore((state) => state.user)
  const loggedInProviderId = useProviderId()
  const isPendingStatus = useStore((state) => state.isPendingStatus)
  const canViewHistory = useHasPermission(
    'clickHxMangStaffPrefAdminViewNonAdmin',
  )
  const canApprove = useHasPermission(
    'clickApproveMangStaffPrefAdminViewNonAdmin',
  )
  const showApproveButton = loggedInProviderId && loggedInUser.id === userId

  return (
    <TabContentHeading title="Preferences" className="border-white flex-1">
      <Flex flexGrow="1" justify="end" align="center">
        <PermissionAlert
          isOpen={isOpen}
          message={alertMessage}
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
              onClick={() => {
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
              }}
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
