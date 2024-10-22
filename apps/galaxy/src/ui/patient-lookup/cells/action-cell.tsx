'use client'

import { Button } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Patient } from '../types'

const ActionCell = ({ row }: PropsWithRow<Patient>) => {
  return (
    <Button
      highContrast
      size="1"
      className="h-full min-h-0 w-full min-w-0"
      onClick={(e) => e.stopPropagation()}
    >
      Book
    </Button>
  )
}

export { ActionCell }
