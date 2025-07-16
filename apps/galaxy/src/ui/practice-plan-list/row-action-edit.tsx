'use client'

import { Flex, IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { Edit2Icon } from '@/components/icons'
import { AddPlanDialog } from './dialogs'
import { InsurancePlanItem } from './types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<InsurancePlanItem>) => {
  return (
    <Flex onClick={(e) => e.stopPropagation()}>
      <AddPlanDialog plan={record}>
        <IconButton size="1" color="gray" variant="ghost">
          <Edit2Icon
            width={16}
            height={16}
            className="cursor-pointer"
            fill="black"
          />
        </IconButton>
      </AddPlanDialog>
    </Flex>
  )
}

export { RowActionEdit }
