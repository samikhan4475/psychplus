'use client'

import { Button } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { useStore } from '../store'
import { Insurance } from '../types'

interface RemoveButtonProps {
  insurance?: Insurance
}

const RemoveButton = ({ insurance }: RemoveButtonProps) => {
  const { setAddFormOpen } = useStore((state) => ({
    setAddFormOpen: state.setAddFormOpen,
  }))

  const handleRemoveInsurance = () => {
    if (!insurance) {
      setAddFormOpen(false)
    }
  }
  return (
    <Button
      variant="outline"
      color="gray"
      className="text-black"
      type="button"
      size="1"
      onClick={handleRemoveInsurance}
    >
      <Trash2 size={14} />
    </Button>
  )
}

export { RemoveButton }
