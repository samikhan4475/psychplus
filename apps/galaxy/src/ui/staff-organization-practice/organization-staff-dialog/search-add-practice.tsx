import React from 'react'
import { useParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SelectOptionType } from '@/types'
import { attachPracticeAction } from '../actions'
import { AsyncSearchPracticeSelect } from '../async-search-practice'
import { useStore } from '../store'

const SearchAddPracticeSelect = () => {
  const { id } = useParams<{ id: string }>()
  const form = useFormContext()
  const { searchDialogPractices, staff } = useStore((state) => ({
    searchDialogPractices: state.searchDialogPractices,
    staff: state.staff,
  }))
  const onOptionClicked = async (option: SelectOptionType) => {
    if (id) {
      const response = await attachPracticeAction(
        {
          roleIds: staff?.staffUserRoleIds ?? [],
        },
        id,
        option.value,
      )

      if (response.state === 'error') {
        toast.error(response.error)
        return
      }

      searchDialogPractices({
        organizationId: form.getValues('organizationId'),
        staffuserId: parseInt(id),
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
