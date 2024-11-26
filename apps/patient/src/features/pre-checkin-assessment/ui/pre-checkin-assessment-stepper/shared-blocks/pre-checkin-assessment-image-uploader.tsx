'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { CameraIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { Box, Flex } from '@radix-ui/themes'

const PreCheckinAssessmentImageUploader = () => {
  const [image, setImage] = useState<string | null>(null)

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  return (
    <Flex className="items-center" direction="column" gap="2">
      <Box className="rounded-full relative h-24 w-24 overflow-hidden border-2 border-[#BFD8E9]">
        {image ? (
          <Image
            src={image}
            alt="Profile"
            width={20}
            height={20}
            className="h-full w-full object-cover"
          />
        ) : (
          <Flex className="text-gray-400 h-full items-center justify-center">
            <CameraIcon className="h-8 w-8" />
          </Flex>
        )}
      </Box>
      <Flex
        direction="row"
        className="mx-auto w-[84px] items-center justify-center"
        gap="3"
      >
        <Flex align="center" justify="center">
          {' '}
          <EyeOpenIcon className="h-auto w-4 cursor-pointer" />
        </Flex>
        <Flex align="center" justify="center">
          <label>
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
            <CameraIcon className="h-auto w-4 cursor-pointer" />
          </label>
        </Flex>
        <Flex align="center" justify="center">
          {' '}
          <CameraIcon className="h-auto w-4 cursor-pointer" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PreCheckinAssessmentImageUploader
