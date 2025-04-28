'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextArea, Tooltip } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import {
  BookingCancelIcon,
  BookingConfirmedIcon,
  FormFieldError,
  InfoIcon,
  StarIcon,
} from '@/components-v2'
import { AppointmentHeader } from '@/events/appointments/confirmations/ui/appointment-header'
import { AddStaffRating } from '../actions'

const schema = z.object({
  ratings: z.number(),
  feedback: z
    .string()
    .max(200, { message: 'Feedback must be at most 200 characters long' }),
})

type SchemaType = z.infer<typeof schema>

const PatientsAppointmentsRatings = () => {
  const [isFilled, setIsFilled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const { id } = useParams<{ id?: string }>()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      ratings: undefined,
      feedback: '',
    },
  })

  const onSubmit = async (data: SchemaType) => {
    if (!id) return

    setLoading(true)
    const response = await AddStaffRating({
      appointmentId: id,
      rating: data.ratings,
      comment: data.feedback,
    })
    setLoading(false)
    if (response.state === 'success') return setIsFilled(true)
    if (response.state === 'error') return setError(response.error)
  }

  if (error)
    return (
      <AppointmentHeader
        icon={<BookingCancelIcon />}
        title={error}
        textClass="text-pp-gray-1"
      />
    )

  return (
    <>
      {!isFilled ? (
        <>
          <AppointmentHeader
            icon={<StarIcon />}
            title="Rate Your Experience"
            subtitle="Share your feedback to help us improve"
            textClass="text-pp-gray-1 text-[13px]"
          />
          <FormContainer form={form} onSubmit={onSubmit}>
            <Flex
              mt="6"
              direction="column"
              gap="3"
              pb="4"
              mb="4"
              className="border-pp-gray-8 w-full border-b"
            >
              <Flex align="center" gap="2">
                <Text size="2" weight="medium">
                  Your Rating
                </Text>
                <Tooltip content="Please rate your experience from 1 to 5 stars.">
                  <Flex justify="between" align="center" gap="1">
                    <InfoIcon />
                  </Flex>
                </Tooltip>
              </Flex>
              <Controller
                name="ratings"
                control={form.control}
                render={({ field }) => (
                  <Flex gap="4" className="w-full">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Flex
                        key={value}
                        onClick={() => field.onChange(value)}
                        className="border-pp-gray-2 h-[88px] w-full items-center rounded-3 border"
                        align="center"
                        justify="center"
                      >
                        {value <= field.value ? (
                          <StarFilledIcon
                            className="text-pp-warning-border"
                            height="27px"
                            width="28px"
                          />
                        ) : (
                          <StarFilledIcon
                            className="text-pp-gray-2"
                            height="27px"
                            width="28px"
                          />
                        )}
                      </Flex>
                    ))}
                  </Flex>
                )}
              />
              <FormFieldError name="ratings" />
              <Text size="2" weight="medium">
                Review{' '}
                <Text className="text-pp-gray-1" weight="regular">
                  (Optional)
                </Text>
              </Text>

              <Controller
                name="feedback"
                control={form.control}
                render={({ field }) => (
                  <Box className="relative w-full">
                    <TextArea
                      {...field}
                      placeholder="Write your feedback here..."
                      maxLength={200}
                      rows={6}
                      className="text-sm w-full resize-none"
                    />
                    <Text
                      size="1"
                      className="text-pp-gray-1 pointer-events-none absolute bottom-2 right-2"
                    >
                      {field.value?.length ?? 0}/200
                    </Text>
                  </Box>
                )}
              />
            </Flex>
            <Button
              className="bg-pp-blue-3 w-full"
              radius="full"
              size="3"
              highContrast
              type="submit"
              disabled={loading}
            >
              Submit
            </Button>
          </FormContainer>
        </>
      ) : (
        <AppointmentHeader
          icon={<BookingConfirmedIcon />}
          title="Thanks for taking the time to review your experience"
          textClass="text-pp-gray-1"
        />
      )}
    </>
  )
}

export { PatientsAppointmentsRatings }
