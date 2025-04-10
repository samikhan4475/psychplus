'use client'

import { useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SelectOptionType } from '@/types'
import { attachPracticeAction } from './actions'
import { AsyncSearchPracticeSelect } from './async-search-practice'
import { useStore } from './store'

const PracticeSelect = ({ userId }: { userId: string }) => {
  const { search, staff } = useStore((state) => ({
    search: state.search,
    staff: state.staff,
  }))
  const onOptionClicked = async (option: SelectOptionType) => {
    if (userId) {
      const response = await attachPracticeAction(
        {
          roleIds: staff?.staffUserRoleIds ?? [],
        },
        userId,
        option.value,
      )

      if (response.state === 'error') {
        toast.error(response.error)
        return
      }

      search({
        staffuserId: parseInt(userId),
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
