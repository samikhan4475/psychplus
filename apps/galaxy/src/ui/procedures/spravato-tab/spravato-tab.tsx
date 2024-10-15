'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { ProcedureTabs } from '../constants'

interface SpravatoTabProps {
  patientId: string
}

const SpravatoTab = ({ patientId }: SpravatoTabProps) => {
  return (
    <>
      <TabContentHeading title={ProcedureTabs.SPRAVATO} />
      <Flex direction="column" py="3" className="bg-white px-2.5 shadow-2">
        SPRAVATO section for pt: {patientId}
      </Flex>
    </>
  )
}

export { SpravatoTab }
