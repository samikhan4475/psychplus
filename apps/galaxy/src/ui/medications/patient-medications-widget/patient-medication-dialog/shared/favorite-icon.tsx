'use client'

import React, { useState } from 'react'
import { Box } from '@radix-ui/themes'
import { Loader2Icon, StarIcon } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import { useStore } from '../../store'
import { FavoriteMedicationPayload } from '../../types'

interface FavoriteIconProps {
  itemData?: FavoriteMedicationPayload
}

const FavoriteIcon = ({ itemData }: FavoriteIconProps) => {
  const form = useFormContext()
  const { favoritesData, markMedicationFavorites } = useStore((state) => ({
    favoritesData: state.favoritesData,
    markMedicationFavorites: state.markMedicationFavorites,
  }))

  const [isLoading, setIsLoading] = useState(false)

  const favoriteItem = favoritesData?.find(
    (item) =>
      item.medicationName === itemData?.prescribableDrugDesc ||
      item.medicationName === itemData?.medicationName,
  )

  const isFavorite = !!favoriteItem

  const handleClick = (
    onChange: (val: boolean) => void,
    currentValue: boolean,
  ) => {
    setIsLoading(true)

    const medicationData: FavoriteMedicationPayload = {
      doseFormCode:itemData?.doseFormCode ?? '',
      doseStrength: itemData?.drugStrength || itemData?.doseStrength || '',
      doseUnitCode: itemData?.doseUnitCode ?? '',
      drugCode: itemData?.drugCode ?? '',
      drugCodeQualifier: itemData?.drugCodeQualifier ?? '',
      doseRouteCode: itemData?.doseRouteCode ?? '',
      rxNormCode: String(itemData?.rxNormCode),
      medicationName:
        itemData?.prescribableDrugDesc ?? itemData?.medicationName ?? '',
    }
    if (favoriteItem?.id) {
      medicationData.id = favoriteItem.id
    }

    markMedicationFavorites(medicationData)
    onChange(!currentValue)
    setIsLoading(false)
  }

  return (
    <Controller
      name={itemData?.prescribableDrugDesc ?? 'test'}
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
