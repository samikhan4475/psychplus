import { EditUnderlinedIcon } from '@/components/icons'
import { Flex } from '@radix-ui/themes'
import React from 'react'
import { AddLocationServiceDialog } from '../service/add-service-dialog/add-service-dialog'

interface ColumnCellIconProps {
  googleApiKey: string
}

const ColumnCellIcon = ({googleApiKey}: ColumnCellIconProps) => {
  
  return (
    <Flex gap="1">
      <EditUnderlinedIcon />
      <AddLocationServiceDialog googleApiKey={googleApiKey} />
    </Flex>
  )
}

export { ColumnCellIcon }