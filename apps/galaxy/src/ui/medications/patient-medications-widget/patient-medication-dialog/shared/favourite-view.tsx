'use client'

import { Flex, Text } from '@radix-ui/themes'
import { FavoriteList } from './favorite-list'
import { SearchFavorite } from './search-favourite'

const FavoriteView = () => {
  return (
    <Flex direction="column" flexGrow="1">
      <Text className="bg-pp-bg-table-label mb-2 px-2 py-1 font-bold">
        Favorites
      </Text>
      <SearchFavorite />
      <FavoriteList />
    </Flex>
  )
}

export { FavoriteView }
