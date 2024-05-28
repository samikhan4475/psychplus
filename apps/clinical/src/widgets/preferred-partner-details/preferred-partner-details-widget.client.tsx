'use client'

import { useRef } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { PreferredPartner } from '@psychplus/preferred-partners'
import { PreferredPartnerForm } from '../preferred-partners-dialog/components'
import { PreferredPartnersDialogWidgetClient } from '../preferred-partners-dialog/preferred-partners-dialog-widget.client'
import { useStore } from './store'
import { Patient } from './types'

const PreferredPartnerDetailsWidgetClient = ({ patientId }: Patient) => {
  const ref = useRef<HTMLDivElement>(null)
  const data = useStore((state) => state.preferredPartner)
  const preferredPartner = data.find(
    (item: PreferredPartner) => item.id === patientId,
  )
  if (preferredPartner) {
    return (
      <Flex direction="column" className="h-fit min-w-fit" ref={ref}>
        <Box p="1">
          <Flex p="1" justify="between">
            <Text>Profile</Text>

            <PreferredPartnersDialogWidgetClient data={preferredPartner} />
          </Flex>
          <PreferredPartnerForm
            isProfileScreen={true}
            data={preferredPartner as any}
          />
        </Box>
      </Flex>
    )
  }
  return (
    <Flex direction="column" className="h-fit min-w-fit" ref={ref}>
      no Data Found
    </Flex>
  )
}

export { PreferredPartnerDetailsWidgetClient }
