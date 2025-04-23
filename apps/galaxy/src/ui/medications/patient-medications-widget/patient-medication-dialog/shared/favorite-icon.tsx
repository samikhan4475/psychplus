'use client'

import React from 'react'
import { Box } from '@radix-ui/themes'
import { StarIcon } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

interface FavoriteIconProps {
  name: string
}

const FavoriteIcon = ({ name }: FavoriteIconProps) => {
  const form = useFormContext()

  return (
    <Controller
      name={name}
      control={form.control}
      defaultValue={false}
      render={({ field: { value, onChange } }) => (
        <Box
          onClick={(e) => {
            e.stopPropagation()
            onChange(!value)
          }}
          className="cursor-pointer"
        >
          <StarIcon
            stroke="#A0B6DC"
            fill={value ? '#A0B6DC' : 'none'}
            height="16"
            width="16"
            className="transition-all duration-300 hover:scale-110"
          />
        </Box>
      )}
    />
  )
}

export { FavoriteIcon }
