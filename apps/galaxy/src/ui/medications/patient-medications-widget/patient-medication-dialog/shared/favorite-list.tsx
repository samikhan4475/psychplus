'use client'

import React, { useCallback, useEffect } from 'react'
import { Flex, ScrollArea, Table, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useStore } from '../../store'
import { FavoriteIcon } from './favorite-icon'

const FavoriteList = () => {
  const {
    loadingFavorites,
    favoritesData,
    fetchFavoriteMedications,
    favoritesLoaded,
  } = useStore((state) => ({
    loadingFavorites: state.loadingFavorites,
    favoritesData: state.favoritesData,
    favoritesLoaded: state.favoritesLoaded,
    fetchFavoriteMedications: state.fetchFavoriteMedications,
  }))

  useEffect(() => {
    if (!favoritesLoaded) {
      fetchFavoriteMedications()
    }
  }, [favoritesLoaded])

  if (loadingFavorites) {
    return (
      <Flex className="absolute inset-0 w-full items-center justify-center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  if (!favoritesData || favoritesData.length === 0) {
    return (
      <Flex justify="center" align="center" className="h-full">
        <Text size="2" color="gray">
          No favorites found
        </Text>
      </Flex>
    )
  }

  return (
    <ScrollArea className="max-h-[300px]">
      <Table.Root>
        <Table.Body className="align-middle">
          {favoritesData.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell className="border-pp-table-border h-5 w-full cursor-pointer truncate border-b px-2 py-1">
                <Text className="truncate text-[12px] font-medium">
                  {item.medicationName}
                </Text>
              </Table.Cell>
              <Table.Cell className="border-pp-table-border h-5 border-b px-2 py-1 text-right">
                <FavoriteIcon name={item.medicationName ?? ''} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </ScrollArea>
  )
}

export { FavoriteList }
