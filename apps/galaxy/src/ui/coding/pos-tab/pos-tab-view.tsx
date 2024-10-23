import React, { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { PosList } from '../types'
import { transformIn } from './data'
import { PosFilterForm } from './pos-filter-form'
import { PosListTable } from './pos-list-table'

const PosTabView = () => {
  const posCodeSet = transformIn(useCodesetCodes(CODESETS.PlaceOfSerivce))
  const [posCodes, setPosCodes] = useState<PosList[]>(posCodeSet)

  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="POS" />
      <Flex direction="column" gap="1" className="bg-white w-full py-1">
        <PosFilterForm setPosCodes={setPosCodes} posCodeSet={posCodeSet} />
        <PosListTable posCodes={posCodes} />
      </Flex>
    </Flex>
  )
}

export { PosTabView }
