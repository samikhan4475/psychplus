'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { ProcedureTabs } from '../constants'

interface EctTabProps {
  patientId: string
}

const EctTab = ({ patientId }: EctTabProps) => {
  return (
    <>
      <TabContentHeading title={ProcedureTabs.ECT} />
      <Flex direction="column" py="3" className="bg-white px-2.5 shadow-2">
        ECT section for pt: {patientId}
      </Flex>
    </>
  )
}

export { EctTab }
