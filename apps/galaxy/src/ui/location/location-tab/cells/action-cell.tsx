'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Location } from '@/types'
import { AddLocationServiceDialog } from '../../service/add-service-dialog/add-service-dialog'
import { EditLocationButton } from '../edit-location-button'

interface ActionCellProps extends PropsWithRow<Location> {
  googleApiKey: string
}

const ActionCell = ({
  row: { original: location },
  googleApiKey,
}: ActionCellProps) => {
  return (
    <Flex gap="1" align="center">
      <EditLocationButton googleApiKey={googleApiKey} location={location} />
      <AddLocationServiceDialog googleApiKey={googleApiKey} />
    </Flex>
  )
}

export { ActionCell }
