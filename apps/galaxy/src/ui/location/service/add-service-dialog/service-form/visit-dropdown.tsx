'use client'

import { useEffect } from 'react'
import { IconButton, Popover, Spinner } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../../store'
import { ServiceSchemaType } from './schema'
import { VisitTypeList } from './visit-type-list'

const VisitDropdown = () => {
  const form = useFormContext<ServiceSchemaType>()
  const service = form.watch('serviceOffered')
  const { visitTypesLoading, fetchVisitTypes } = useStore((state) => ({
    visitTypesLoading: state.visitTypesLoading,
    fetchVisitTypes: state.fetchVisitTypes,
  }))
  useEffect(() => {
    if (service) {
      fetchVisitTypes(service)
    }
  }, [fetchVisitTypes, service])

  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton
          className="!m-0"
          size="1"
          variant="ghost"
          color="gray"
          highContrast
          disabled={!service || visitTypesLoading}
        >
          {visitTypesLoading ? (
            <Spinner size="1" />
          ) : (
            <Plus width={12} height={12} />
          )}
        </IconButton>
      </Popover.Trigger>
      <Popover.Content
        side="right"
        sideOffset={2}
        minWidth="360px"
        maxWidth="380px"
        className="rounded-1 p-0"
      >
        <VisitTypeList />
      </Popover.Content>
    </Popover.Root>
  )
}

export { VisitDropdown }
