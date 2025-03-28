'use client'

import { useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SelectOptionType } from '@/types'
import { attachPracticeAction } from './actions'
import { AsyncSearchPracticeSelect } from './async-search-practice'
import { useStore } from './store'

const PracticeSelect = () => {
  const { search, staff } = useStore((state) => ({
    search: state.search,
    staff: state.staff,
  }))
  const { id } = useParams<{ id: string }>()
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

      search({
        staffuserId: parseInt(id),
      })
      toast.success('The practice is successfully attached')
    }
  }

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Search & Add Practice</FormFieldLabel>
      <AsyncSearchPracticeSelect onOptionClicked={onOptionClicked} />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
