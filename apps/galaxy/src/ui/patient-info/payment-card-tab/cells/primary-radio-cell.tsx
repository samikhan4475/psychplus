'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Radio } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { CreditCard } from '@/types'
import { setPrimaryPatientCard } from '../actions'
import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'

const PrimaryRadioCell = ({
  row: {
    original: { isPrimary, patientId, id, isActive },
  },
}: PropsWithRow<CreditCard>) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const toggleMakePrimaryCardPermission = useHasPermission('toggleMakePrimaryCard')

  const handleChange = async () => {
    if (!toggleMakePrimaryCardPermission) {
      setIsOpen(true)
      return
    }
    setIsLoading(true)
    try {
      const result = await setPrimaryPatientCard({
        patientId: patientId,
        creditCardId: id,
      })

      if (result.state === 'error') {
        throw new Error(result.error)
      }

      toast.success('Primary Card Changed')
      router.refresh()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to change primary card'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Radio
        value="true"
        checked={isPrimary}
        disabled={isLoading || !isActive}
        onValueChange={handleChange}
        highContrast
        size="1"
      />
      <PermissionAlert
        isOpen={isOpen}
        message="You do not have permission to Make Primary. Please contact your supervisor if you need any further assistance."
        onClose={() => {
          setIsOpen(false)
        }}
      />
    </>
  )
}

export { PrimaryRadioCell }
