'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { FormFieldLabel } from '@/components'
import { SelectOptionType } from '@/types'
import { attachOrganizationAction } from './actions'
import { AsyncSearchPracticeSelect } from './shared/async-search-practice'
import { useStore } from './store'

const StaffRoleSelect = () => {
  const { search, data, selectedStaffId } = useStore((state) => ({
    search: state.search,
    data: state.data,
    selectedStaffId: state.selectedStaffId,
  }))
  const selectedRole = useMemo(() => {
    if (data) {
      return data.map((role) => ({
        value: role.id,
        label: role.displayName,
      }))
    }
    return []
  }, [data])
  const { id } = useParams<{ id: string }>()
  const onOptionClicked = async (option: SelectOptionType) => {
    if (id && selectedStaffId) {
      const response = await attachOrganizationAction(
        {
          roleIds: [option.value],
        },
        selectedStaffId,
        id,
      )

      if (response.state === 'error') {
        toast.error(response.error)
        return
      }

      search(id, selectedStaffId)
      toast.success('Role has been successfully assigned.')
    }
  }

  return (
    <Flex className="ml-4 flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Search & Add Role</FormFieldLabel>
      <AsyncSearchPracticeSelect
        onOptionClicked={onOptionClicked}
        selectedIds={selectedRole}
        organizationId={id}
      />
    </Flex>
  )
}

export { StaffRoleSelect }
