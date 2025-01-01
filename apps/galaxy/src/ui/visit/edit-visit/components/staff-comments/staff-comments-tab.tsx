'use client'

import { useState } from 'react'
import { Flex, Tabs, Text } from '@radix-ui/themes'
import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { CHANGE_STAFF_COMMENT_SUBSECTION_TO_BILLING } from '@/ui/visit/constants'
import { STAFF_COMMENTS_TAB } from '@/ui/visit/types'
import { BillingTab } from './billing-tab'
import { TreatmentTab } from './treatment-tab'

const TabButtons =
  'data-[state=inactive]:text-gray-10 data-[state=inactive]:text-1 data-[state=inactive]:font-normal data-[state=active]:text-black data-[state=active]:font-medium data-[state=active]:text-1'

const StaffComments = ({ appointmentId }: { appointmentId: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<STAFF_COMMENTS_TAB>(
    STAFF_COMMENTS_TAB.TreatmentTab,
  )
  const canChangeToBilling = useHasPermission(
    'staffCommentSubsectionFromToBillingEditVisitPopup',
  )

  return (
    <Flex className="overflow-hidden rounded-2" direction="column">
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={CHANGE_STAFF_COMMENT_SUBSECTION_TO_BILLING}
      />
      <Text className="py-1" weight="bold" size="4">
        Staff Comments
      </Text>
      <Tabs.Root
        onValueChange={(value) => {
          if (value === STAFF_COMMENTS_TAB.BillingTab && !canChangeToBilling)
            return setIsOpen(true)
          setActiveTab(value as STAFF_COMMENTS_TAB)
        }}
        value={activeTab}
      >
        <Tabs.List
          highContrast
          size="1"
          className="inline-flex [box-shadow:none]"
          color="iris"
        >
          <Tabs.Trigger
            value={STAFF_COMMENTS_TAB.TreatmentTab}
            className={TabButtons}
          >
            Treatment
          </Tabs.Trigger>

          <Tabs.Trigger
            value={STAFF_COMMENTS_TAB.BillingTab}
            className={TabButtons}
          >
            Billing
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value={STAFF_COMMENTS_TAB.TreatmentTab}>
          <TreatmentTab appointmentId={appointmentId} />
        </Tabs.Content>
        <Tabs.Content value={STAFF_COMMENTS_TAB.BillingTab}>
          <BillingTab appointmentId={appointmentId} />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  )
}

export { StaffComments }
