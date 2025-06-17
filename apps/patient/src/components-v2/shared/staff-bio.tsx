'use client'

import React from 'react'
import { AppointmentAvailability } from '@psychplus-v2/types'
import { getNewProviderTypeLabel } from '@psychplus-v2/utils'
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Box, Flex, ScrollArea, Separator, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '../loading-placeholder'
import { ProviderAvatar } from '../provider-avatar'

interface StaffBioProps {
  title?: string
  description?: string
  heading?: string
  data?: AppointmentAvailability
  rating?: number
  loading?: boolean
  errorMessage?: string | null
}

const StaffBio = ({
  title,
  description,
  heading,
  data,
  rating,
  loading,
  errorMessage,
}: StaffBioProps) => {
  const starRating = rating ?? data?.specialist?.rating ?? 0
  return (
    <Flex direction="column" gap="4" className="mt-6">
      <Flex className="gap-4">
        {data?.specialist && (
          <ProviderAvatar
            provider={data?.specialist}
            className="h-[101px] w-[101px] cursor-pointer"
          />
        )}
        <Flex direction="column" gap="2">
          <Text weight="medium" className="text-pp-blue-8 text-[32px]">
            {title}
          </Text>
          <Flex direction="column" className="gap-0.5">
            <Text size="2" className="text-pp-gray-1">
              {getNewProviderTypeLabel(data?.providerType ?? '')}
            </Text>
            <Flex gap="1">
              <Flex align="center">
                {Array.from({ length: 5 }, (_, index) => index + 1).map(
                  (value) => (
                    <Box key={value}>
                      {value <= (starRating ?? 0) ? (
                        <StarFilledIcon
                          height={16}
                          width={16}
                          color="#FFC700"
                        />
                      ) : (
                        <StarIcon height={16} width={16} color="#FFC700" />
                      )}
                    </Box>
                  ),
                )}
              </Flex>
              <Text weight="medium" size="2">
                {starRating.toFixed(1)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Separator
        orientation="horizontal"
        className="border-pp-gray-8 w-full border"
      />
      <Flex direction="column" gap="4">
        <Text weight="medium" size="4" className="text-pp-blue-8">
          {heading}
        </Text>
        <ScrollArea
          scrollbars="vertical"
          className="!h-[calc(100dvh-529px)] pr-2"
        >
          {loading ? (
            <LoadingPlaceholder />
          ) : (
            <Text size="4" className="text-pp-gray-9 leading-[32px]">
              {errorMessage || description}
            </Text>
          )}
        </ScrollArea>
      </Flex>
      <Separator
        orientation="horizontal"
        className="border-pp-gray-8 w-full border"
      />
    </Flex>
  )
}

export { StaffBio }
