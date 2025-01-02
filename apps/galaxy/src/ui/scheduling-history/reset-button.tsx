'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from './store'

const ResetButton = () => {
  const { id } = useParams<{ id: string }>()
  const { reset } = useFormContext()
  const { fetchSchedulingHistory } = useStore((state) => ({
    fetchSchedulingHistory: state.fetchSchedulingHistory,
  }))

  const handleReset = () => {
    reset()
    fetchSchedulingHistory(id)
  }
  return (
    <Button
      color="gray"
      className="text-black ml-10"
      size="1"
      variant="outline"
      type="button"
      onClick={handleReset}
    >
      Clear
    </Button>
  )
}

export { ResetButton }
