'use client'

import { IconButton } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { DeleteIcon } from '@/components/icons'
import { Encounter } from '@/types'
import { constructVisitId } from '../../utils'
import { ServiceSchemaType } from '../service-form/schema'

const ActionCell = ({ row: { original } }: PropsWithRow<Encounter>) => {
  const form = useFormContext<ServiceSchemaType>()
  const selectedVisits = form.watch('serviceVisitTypes') ?? []
  const handleDelete = () =>
    form.setValue(
      'serviceVisitTypes',
      selectedVisits?.filter((id) => id !== constructVisitId(original)),
      { shouldValidate: true },
    )

  return (
    <IconButton
      size="1"
      variant="ghost"
      color="gray"
      highContrast
      onClick={handleDelete}
      type="button"
    >
      <DeleteIcon width={12} height={12} />
    </IconButton>
  )
}

export { ActionCell }
