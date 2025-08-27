'use client'

import { useEffect, useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  ScrollArea,
  Text,
} from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components-v2'
import { searchStaffUnauthenticatedAction } from '@/features/appointments/search/actions'
import { StarRating } from '../provider-with-clinic-and-weekly-availability'

interface ViewBioProps {
  isVisible: boolean
  onCancel: () => void
  data: {
    hasPhoto?: boolean
    id: number
    legalName: {
      firstName: string
      honors?: string
      lastName: string
    }
    rating?: number
    ratingCount: number
    providerType?: string
    bio?: string
  }
}

const ViewBioModal = ({ isVisible, onCancel, data }: ViewBioProps) => {
  const [bio, setBio] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isVisible || !data?.id) return
    setLoading(true)

    const payLoad = {
      isIncludeBiography: true,
      isIncludeAverageRating: true,
      staffIds: [data?.id],
    }

    searchStaffUnauthenticatedAction(payLoad)
      .then((response) => {
        if (response.state === 'success') {
          const result = Array.isArray(response?.data)
            ? response.data[0]
            : response.data
          setBio(result.bio || '')
        } else {
          setBio(null)
        }
      })
      .catch(() => {
        setBio(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isVisible, data?.id])

  if (!isVisible || !data) return null

  const {
    id,
    hasPhoto,
    legalName: { firstName, lastName, honors },
    rating,
    ratingCount,
    providerType,
  } = data

  const honorsText = honors ? ', ' + honors : ''
  const displayName = `${firstName} ${lastName}${honorsText}`
  const src = hasPhoto ? `/api/staff/${id}/profileimage` : undefined
  const fallback = !hasPhoto ? `${firstName[0]}${lastName[0]}` : ''

  return (
    <Box className="bg-black fixed inset-0 z-[9999] flex items-center justify-center bg-opacity-50 p-4">
      <Box className="bg-white max-h-[90vh] min-h-[300px] w-[640px] min-w-[600px] max-w-[900px] overflow-hidden rounded-6 border shadow-3">
        <Flex direction="column" className="w-full p-6">
          <Flex justify="end" align="start" className="h-6 w-full ">
            <Button
              size="3"
              variant="ghost"
              color="gray"
              className="cursor-pointer hover:bg-transparent"
              onClick={onCancel}
            >
              <Cross1Icon className="w-18[px] h-[18px]" />
            </Button>
          </Flex>
          <Flex direction="column">
            <Flex
              direction="row"
              gap="3"
              className="border-b-pp-gray-2 border-b pb-4"
            >
              <Avatar src={src} size="6" radius="full" fallback={fallback} />
              <Flex direction="column" justify="between" className="flex-1">
                <Flex className="flex-1 items-center">
                  <Heading>{displayName}</Heading>
                </Flex>
                <Flex direction="column" className="flex-1">
                  <Text className="tex-pp-icon-sub text-[10px]">
                    {providerType}
                  </Text>
                  <Flex direction="row" gap="2" align="center">
                    <StarRating rating={rating} />
                    <Text className="tex-pp-icon-sub text-[10px]">
                      {`(${ratingCount})`}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              className="border-b-pp-gray-2 mt-4 h-[250px] border-b pb-4"
            >
              <Text className="text-pp-black-1 mb-2 text-[14px] font-medium">
                About
              </Text>
              {loading && !bio && (
                <Flex justify="center" align="center" className="flex-1">
                  <LoadingPlaceholder />
                </Flex>
              )}
              {!loading && !bio && (
                <Flex justify="center" align="center" className="flex-1">
                  No Bio found for this provider
                </Flex>
              )}
              <ScrollArea
                type="auto"
                scrollbars="vertical"
                style={{
                  height: 200,
                  minWidth: 300,
                  width: 'auto',
                  paddingRight: '8px',
                }}
              >
                <Text className=" pb-4 pr-2 text-[12px] font-regular leading-5 text-[#575759]">
                  {bio}
                </Text>
              </ScrollArea>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export { ViewBioModal }
