'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Appointment } from '@/types'
import { CancelButton } from '../cancel-button'
import EditVisitButton from '../edit-visit-button'

const ActionCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  return (
    <Flex align="center">
      <CancelButton appointment={appointment} />
      <EditVisitButton appointment={appointment} />
    </Flex>
  )
}

export { ActionCell }
