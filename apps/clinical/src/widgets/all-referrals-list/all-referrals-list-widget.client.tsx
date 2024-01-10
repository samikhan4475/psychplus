'use client'

import { useRef } from 'react'
import { Flex } from '@radix-ui/themes'
import { ALL_REFERRALS_LIST_WIDGET } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import { AllReferralsTable } from './components'
import { useRefetchReferrals } from './hooks'

const AllReferralsListWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(ALL_REFERRALS_LIST_WIDGET)
  usePublishSize(ALL_REFERRALS_LIST_WIDGET, ref)
  useSubscribeClosePopover(ALL_REFERRALS_LIST_WIDGET)
  useRefetchReferrals()

  return (
    <Flex
      direction="column"
      className="h-fit min-h-[200px] min-w-fit"
      ref={ref}
    >
      <AllReferralsTable />
    </Flex>
  )
}

export { AllReferralsListWidgetClient }
