'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Flex, IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { CreditCard } from '@/types'
import { deletePatientCardAction } from '../actions'

const ActionsCell = ({
  row: {
    original: { patientId, id },
  },
}: PropsWithRow<CreditCard>) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)

    try {
      const result = await deletePatientCardAction({
        patientId: patientId,
        creditCardId: id,
      })

      if (result.state === 'error') {
        throw new Error(result.error)
      }

      toast.success('Card deleted successfully')
      router.refresh()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete card'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex justify="start" px="1" align="center" width="100%" height="100%">
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        className="text-black"
        disabled={isLoading}
        onClick={handleClick}
      >
        <Trash2 size={16} />
      </IconButton>
    </Flex>
  )
}

export { ActionsCell }
