'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { VisitSequenceTypes } from '@/types'
import { SchemaType } from '../schema'
import { useStore } from '../store'
import { shouldDisableFollowUpButton } from '../utils'

const CreateFollowUpButton = ({
  loading,
  onSubmit,
}: {
  loading: boolean
  onSubmit: SubmitHandler<SchemaType>
}) => {
  const searchParams = useSearchParams()

  const visitType = searchParams.get('visitType') ?? ''
  const visitSequence = searchParams.get(
    'visitSequence',
  ) as VisitSequenceTypes | null

  const form = useFormContext<SchemaType>()
  const isFollowupDenied = useStore((state) => state.isFollowupDenied)
  const onClick = () => {
    form.handleSubmit(onSubmit, () => form.trigger())()
  }

  const isDisabled = useMemo(
    () =>
      shouldDisableFollowUpButton(
        visitType,
        visitSequence ?? VisitSequenceTypes.Na,
      ),
    [visitType, visitSequence],
  )

  return (
    <Button
      color="gray"
      className="text-black data-[disabled=true]:bg-pp-states-disabled data-[disabled=true]:text-pp-dark-grey"
      size="1"
      variant="outline"
      type="button"
      onClick={onClick}
      disabled={loading || isFollowupDenied || isDisabled}
      loading={loading}
    >
      <Plus width={16} height={16} />
      Follow up
    </Button>
  )
}

export { CreateFollowUpButton }
