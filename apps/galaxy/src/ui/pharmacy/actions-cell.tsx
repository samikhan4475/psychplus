'use client'

import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FavButton } from './fav-button'
import { TrashButton } from './trash-button'

const ActionsCell = ({
  pharmacyId,
  isFavorite,
}: {
  pharmacyId: string
  isFavorite: boolean
}) => {
  const patientId = useParams().id as string
  return (
    <Flex gap="1">
      <TrashButton pharmacyId={pharmacyId} patientId={patientId} />
      <FavButton
        pharmacyId={pharmacyId}
        isFavorite={isFavorite}
        patientId={patientId}
      />
    </Flex>
  )
}

export { ActionsCell }
