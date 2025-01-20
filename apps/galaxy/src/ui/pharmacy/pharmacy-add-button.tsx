'use client'

import { Flex } from '@radix-ui/themes'
import { ModalView } from './modal'
import { PharmacyFilterFrom } from './modal/pharmacy-filter-from'

const PharmacyAddButton = () => {
  return (
    <Flex direction="column">
      <PharmacyFilterFrom />
      <ModalView />
    </Flex>
  )
}

export { PharmacyAddButton }
