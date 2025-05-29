'use client'

import { Flex, Text } from '@radix-ui/themes'
import { ReviewButton } from '../patient-medication-form/review-button'
import { SaveButton } from '../patient-medication-form/save-button'
import { Step } from '../types'
import { FavoriteList } from './favorite-list'
import { SearchFavoriteMedication } from './search-favorite-medication'

interface FavoriteViewProps {
  onJump?: (step: Step) => void
}
const FavoriteView = ({ onJump }: FavoriteViewProps) => {
  return (
    <Flex direction="column" className="min-h-[491px]">
      <Flex direction="column" flexGrow="1">
        <Text className="bg-pp-bg-table-label mb-2 px-2 py-1 font-bold">
          Favorites
        </Text>
        <SearchFavoriteMedication />
        <FavoriteList />
      </Flex>
      <Flex gap="2" justify="end">
        <SaveButton />
        <ReviewButton onJump={onJump} />
      </Flex>
    </Flex>
  )
}

export { FavoriteView }
