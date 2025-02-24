'use client'

import { Button } from '@radix-ui/themes'
import { ChevronLeft } from 'lucide-react'
import { useStore } from '@/ui/assigning-authorities/store'

const BackButton = () => {
  const { setSelectedAssigningAuthority, setSelectedCodeset } = useStore(
    (state) => ({
      setSelectedAssigningAuthority: state.setSelectedAssigningAuthority,
      setSelectedCodeset: state.setSelectedCodeset,
    }),
  )

  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      type="button"
      onClick={() => {
        setSelectedAssigningAuthority(undefined)
        setSelectedCodeset(undefined)
      }}
    >
      <ChevronLeft height={16} width={16} strokeWidth={2.5} />
    </Button>
  )
}

export { BackButton }
