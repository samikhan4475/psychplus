'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { getOrganizationStaffOptionsAction } from '@/actions'
import { FormFieldLabel, SelectCell } from '@/components'
import { SelectOptionType } from '@/types'
import { useStore } from './store'

const OrganizationSelect = () => {
  const { search, setSelectedStaffId, selectedStaffId } = useStore((state) => ({
    search: state.search,
    setSelectedStaffId: state.setSelectedStaffId,
    selectedStaffId: state.selectedStaffId,
  }))
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<SelectOptionType[]>([])
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await getOrganizationStaffOptionsAction({
        practicesIds: [id],
      })
      if (response.state === 'success') {
        setOptions(response.data)
      }
      setLoading(false)
    })()
  }, [])

  const onValueChage = (value: string) => {
    setSelectedStaffId(value)
    search(id, value)
  }

  return (
    <Flex className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Staff</FormFieldLabel>
      <SelectCell
        className="border-pp-gray-2 h-6 !w-[200px] w-full border border-solid !outline-none [box-shadow:none]"
        options={options}
        onValueChange={onValueChage}
        loading={loading}
        value={selectedStaffId}
      />
    </Flex>
  )
}

export { OrganizationSelect }
