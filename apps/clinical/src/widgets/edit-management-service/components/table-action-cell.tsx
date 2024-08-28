'use client'

import React from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { PropsWithRow } from '@psychplus/ui/data-table/data-table-row-actions'
import { VisitTypeDiagnosisData } from '../types'

const TableActionCell = ({ row }: PropsWithRow<VisitTypeDiagnosisData>) => {
  console.log(row)
  return (
    <Flex justify={'center'} align={'center'}>
      <IconButton size={'2'} color="gray" type="button" variant="ghost">
        <Trash2 size={14} color="#60646C" />
      </IconButton>
    </Flex>
  )
}

export default TableActionCell
