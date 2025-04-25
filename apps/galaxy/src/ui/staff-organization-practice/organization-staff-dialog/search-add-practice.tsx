import React from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SelectOptionType } from '@/types'
import { attachPracticeAction } from '../actions'
import { AsyncSearchPracticeSelect } from '../async-search-practice'
import { useStore } from '../store'

const SearchAddPracticeSelect = () => {
  const form = useFormContext()
  const { searchDialogPractices, staff, currentUserId } = useStore((state) => ({
    searchDialogPractices: state.searchDialogPractices,
    staff: state.staff,
    currentUserId: state.currentUserId,
  }))
  const onOptionClicked = async (option: SelectOptionType) => {
    if (currentUserId) {
      const response = await attachPracticeAction(
        {
          roleIds: staff?.staffUserRoleIds ?? [],
        },
        `${currentUserId}`,
        option.value,
      )

      if (response.state === 'error') {
        toast.error(response.error)
        return
      }

      searchDialogPractices({
        organizationId: form.getValues('organizationId'),
        staffuserId: currentUserId,
      })
      toast.success('The practice is successfully attached')
    }
  }
  return (
    <FormFieldContainer className="mb-4 flex-row">
      <FormFieldLabel>Search & Add Practice</FormFieldLabel>
      <AsyncSearchPracticeSelect onOptionClicked={onOptionClicked} />
    </FormFieldContainer>
  )
}

export { SearchAddPracticeSelect }
