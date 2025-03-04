'use client'

import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { useStore as useGlobalStore } from '@/store'

const CreateNoteSignButton = () => {
  const { staffRoleCode } = useGlobalStore((state) => ({
    staffRoleCode: state.staffResource.staffRoleCode,
  }))
  const isPrescriber = staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER
  return (
    <Button size="1" highContrast type="submit">
      <PenLineIcon height={14} width={14} strokeWidth={2} />
      {isPrescriber ? 'Sign' : 'Send To Sign'}
    </Button>
  )
}

export { CreateNoteSignButton }
