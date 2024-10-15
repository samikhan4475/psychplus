'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { ProcedureTabs } from '../constants'

interface TmsTabProps {
  patientId: string
}

const TmsTab = ({ patientId }: TmsTabProps) => {
  return (
    <>
      <TabContentHeading title={ProcedureTabs.TMS} />
      <Flex direction="column" py="3" className="bg-white px-2.5 shadow-2">
        TMS section for pt: {patientId}
      </Flex>
    </>
  )
}

export { TmsTab }
