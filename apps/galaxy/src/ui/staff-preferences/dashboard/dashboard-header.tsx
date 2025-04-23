import { Button, Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { useProviderId } from '@/ui/schedule/hooks'
import { APPROVE_ALERT, NO_CHANGES_TO_APPROVE_ALERT } from '../constant'
import { ApprovalType } from '../types'

interface DashboardHeaderProps {
  userId: number | undefined
  isPendingStatus: boolean
  onApprove: (type: ApprovalType) => void
  setAlertInfo: ({
    message,
    isOpen,
  }: {
    message: string
    isOpen: boolean
  }) => void
}

const DashboardHeader = ({
  userId,
  isPendingStatus,
  onApprove,
  setAlertInfo,
}: DashboardHeaderProps) => {
  const loggedInUser = useGlobalStore((state) => state.user)
  const loggedInProviderId = useProviderId()

  const canApprove = useHasPermission(
    'clickApproveMangStaffPrefAdminViewNonAdmin',
  )
  const showApproveButton = loggedInProviderId && loggedInUser.id === userId

  return (
    <TabContentHeading title="Dashboard" className="border-white flex-1">
      <Flex flexGrow="1" justify="end" align="center">
        <Flex align="center" gap="2">
          {showApproveButton && (
            <Button
              variant="outline"
              color="gray"
              size="1"
              className="text-black"
              disabled={!isPendingStatus}
              onClick={() => {
                if (!isPendingStatus) {
                  setAlertInfo({
                    message: NO_CHANGES_TO_APPROVE_ALERT,
                    isOpen: true,
                  })
                  return
                }
                if (!canApprove) {
                  setAlertInfo({
                    message: APPROVE_ALERT,
                    isOpen: true,
                  })
                  return
                }
                onApprove(ApprovalType.all)
              }}
              type="button"
            >
              Approve All
            </Button>
          )}
        </Flex>
      </Flex>
    </TabContentHeading>
  )
}

export { DashboardHeader }
