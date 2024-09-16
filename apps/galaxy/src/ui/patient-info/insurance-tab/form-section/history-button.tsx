'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { cn } from '@/utils'
import { HistoryDetailsDialog } from '../dialogs'

const HistoryButton = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
      <Button
        size="1"
        variant={open ? 'solid' : 'outline'}
        color={open ? 'blue' : 'gray'}
        className={cn('text-black', { 'text-white bg-pp-blue': open })}
        type="button"
        onClick={onOpen}
      >
        <HistoryIcon size={14} /> History
      </Button>
      <HistoryDetailsDialog open={open} onClose={onClose} />
    </>
  )
}

export default HistoryButton
