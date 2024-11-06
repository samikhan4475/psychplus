'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Patient } from '../types'

const PracticeSelectCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  return (
    <Flex width="100%" height="100%" align="center">
      {patient?.practice}
    </Flex>
  )
}

export { PracticeSelectCell }
