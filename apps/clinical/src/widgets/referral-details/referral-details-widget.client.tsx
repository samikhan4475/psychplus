'use client'

import { Flex, Text } from '@radix-ui/themes'
import type { Referral } from '@psychplus/referrals'
import { CloseDialogTrigger } from '@psychplus/ui/close-dialog-trigger'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { formatDateTime } from '@psychplus/utils/time'
import { REFERRAL_DETAILS_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'

const ReferralDetailsWidgetClient = () => {
  const { publish } = usePubsub()
  const { open, data } = useDialog<Referral>(REFERRAL_DETAILS_WIDGET)
  usePublishLoaded(REFERRAL_DETAILS_WIDGET)

  if (!data) {
    return
  }

  const referralDate = new Date(data.referralDate)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          publish(`${REFERRAL_DETAILS_WIDGET}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="relative">
        <Dialog.Title>Referral Details</Dialog.Title>
        <CloseDialogTrigger />
        <Flex direction="column" gap="2">
          <Flex align="center" gap="1">
            <Text weight="bold">Referral ID:</Text>
            <Text>{data.id}</Text>
          </Flex>
          <Flex align="center" gap="1">
            <Text weight="bold">Referral Date:</Text>
            <Text>{formatDateTime(referralDate)}</Text>
          </Flex>
          <Flex align="center" gap="1">
            <Text weight="bold">Created By:</Text>
            <Text>{data.metadata.createdByFullName}</Text>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ReferralDetailsWidgetClient }
