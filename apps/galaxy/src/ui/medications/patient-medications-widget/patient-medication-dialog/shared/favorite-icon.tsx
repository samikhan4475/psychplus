'use client'

import React, { useState } from 'react'
import { Box } from '@radix-ui/themes'
import { Loader2Icon, StarIcon } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import { useStore } from '../../store'

interface FavoriteIconProps {
  name: string
}

const FavoriteIcon = ({ name }: FavoriteIconProps) => {
  const form = useFormContext()
  const { favoritesData, markMedicationFavorites } = useStore((state) => ({
    favoritesData: state.favoritesData,
    markMedicationFavorites: state.markMedicationFavorites,
  }))

  const [isLoading, setIsLoading] = useState(false)

  const favoriteItem = favoritesData?.find(
    (item) => item.medicationName === name,
  )

  const isFavorite = !!favoriteItem

  const handleClick = (
    onChange: (val: boolean) => void,
    currentValue: boolean,
  ) => {
    setIsLoading(true)
    markMedicationFavorites(name, favoriteItem?.id)
    onChange(!currentValue)
    setIsLoading(false)
  }

  return (
    <Controller
      name={name}
      control={form.control}
      defaultValue={false}
      render={({ field: { value, onChange } }) => (
        <Box
          onClick={() => handleClick(onChange, value)}
          className="cursor-pointer"
        >
          {isLoading ? (
            <Loader2Icon
              height="16"
              width="16"
              className="text-blue-400 animate-spin"
            />
          ) : (
            <StarIcon
              stroke="#A0B6DC"
              fill={isFavorite ? '#A0B6DC' : 'none'}
              height="16"
              width="16"
              className="transition-all duration-300 hover:scale-110"
            />
          )}
        </Box>
      )}
    />
  )
}

export { FavoriteIcon }
