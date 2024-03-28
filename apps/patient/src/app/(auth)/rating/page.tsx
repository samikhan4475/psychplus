'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { addStaffStarRating } from '@psychplus/staff/api.client'
import { Button } from '@psychplus/ui/button'
import { PsychPlusIcon } from '@/components/icons/psych-plus-icon';
import { hu } from 'date-fns/locale'
import { RatingThankYouDialog } from './thankyou-dialog'

const ratingValues = [1, 2, 3, 4, 5]

const StarIconProps = {
  height: 32,
  width: 32,
  color: '#FFC700',
}

const RatingPage = () => {
  const [rating, setRating] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const params = useSearchParams()
  const appointmentId = parseInt(params.get('appointmentId') ?? '')
  const staffId = parseInt(params.get('patientid') ?? '')

  const handleRatingChange = (newRating: number) =>
    setRating((prevRating) => (newRating === prevRating ? 0 : newRating))

  const submitRating = () => {
    addStaffStarRating({appointmentId, rating, staffId}).then(() => {
      setOpenDialog(true)
    })
  }

  const toggleDialog = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <Flex align="center" direction="column" height="100%" justify="center">
      <Flex width="100%" align="center" justify="center" className="bg-[#151b4a] w-[82px] h-[82px] rounded-[14px] mb-4">
        <PsychPlusIcon />
      </Flex>

      <Flex width="100%" justify="center" align="center" direction="column" className="w-[270px] sm:w-[384px]">
        <Text weight="medium" align="center" className="mb-3 sm:mb-6 text-[17px] sm:text-[24px]">Thank you for your visit, please rate your experience</Text>

        <Flex gap="4">
          {ratingValues.map((value) => (
            <Box key={value} onClick={() => handleRatingChange(value)}>
              {value <= rating ? (
                <StarFilledIcon {...StarIconProps} />
              ) : (
                <StarIcon {...StarIconProps} />
              )}
            </Box>
          ))}
        </Flex>

        <Flex width="100%" justify="center" className="mt-[42px] sm:mt-14">
          <Button
            className="h-16 w-44 bg-[#151B4A] text-[22px] text-[#ffffff] cursor-pointer"
            radius="full"
            size="3"
            mt="3"
            onClick={submitRating}
          >
            Submit
          </Button>
        </Flex>
        <RatingThankYouDialog openDialog={openDialog} setOpenDialog={toggleDialog}/>
      </Flex>
    </Flex>
  )
}

export default RatingPage
