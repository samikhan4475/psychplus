'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { ActiveVisitDialog } from '../../shared'
import { EditVacationButton } from '../edit-vacation-button'
import { VacationTime } from '../types'

const ActionCell = ({
  row: { original: vacation },
}: PropsWithRow<VacationTime>) => {
  return (
    <Flex gap="2" align="center" width="100%">
      <EditVacationButton vacation={vacation} />
      <ActiveVisitDialog
        filters={vacation}
        isDisabled={!vacation.isActiveClinicVisitPresent}
      />
    </Flex>
  )
}

export { ActionCell }
