'use client'

import { useState } from 'react'
import { Button, Flex, Popover, Text, TextArea } from '@radix-ui/themes'
import { PenIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { useStore } from '../store'

const CommentCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const [value, setValue] = useState(referral?.comments)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const updateCommentStatus = async () => {
    if (value.length >= 1024) {
      toast.error('Comment should be less than 1024 characters')
      return
    }
    setLoading(true)
    const result = await updatePatientReferralAction({
      ...referral,
      comments: value,
    })
    if (result.state === 'error') {
      setLoading(false)
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          comments: value,
        }
      }
      return item
    })
    setData(updatedData ?? [])
    setLoading(false)
    setOpen(false)
    toast.success('Successfully updated!')
  }
  return (
    <>
      <Flex justify="start">
        <Popover.Root modal={false} open={open} onOpenChange={setOpen}>
          <Popover.Trigger>
            <Button
              className="text-black w-full !outline-none"
              type="button"
              variant="ghost"
              color="gray"
              size="1"
            >
              <PenIcon size={16} />
            </Button>
          </Popover.Trigger>
          <Popover.Content
            className="min-h-28 -mb-2 -mt-2 flex min-w-[500px] items-center rounded-1 !p-0"
            align="start"
          >
            <Flex direction="column" gap="2" className="p-2">
              <TextArea
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="min-h-48 w-[485px] !outline-none"
                placeholder="Comments..."
              />
              <Button
                type="button"
                onClick={updateCommentStatus}
                size="1"
                variant="solid"
                highContrast
                className="w-[50px]"
                loading={loading}
              >
                Save
              </Button>
            </Flex>
          </Popover.Content>
        </Popover.Root>
      </Flex>
      <Text className="w-[300px] pl-2 text-1">{referral?.comments}</Text>
    </>
  )
}

export { CommentCell }
