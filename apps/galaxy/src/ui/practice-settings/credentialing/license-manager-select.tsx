'use client'

import { useParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { AsyncRowSelect } from '@/components'
import { SelectOptionType } from '@/types'
import {
  addCredentialingManagerAction,
  getManagersOptionsAction,
} from '../actions'
import { useStore } from './store'

const LicenseManagerSelect = () => {
  const { id } = useParams<{ id: string; type: string }>()
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const onRowClick = async (option: SelectOptionType) => {
    const splited = option.value.split(' - ')
    const result = await addCredentialingManagerAction(id, {
      practiceId: id,
      managerStaffId: parseInt(splited[0]),
      isAlertCheck: true,
      status: 'Active',
      managerName: {
        firstName: splited[1],
        lastName: splited[2],
      },
    })
    if (result.state === 'error') {
      toast.error(result.error)
      return
    }
    search(id)
    toast.success('Manager Added Successfully')
  }

  return (
    <>
      <Flex className="ml-6 !text-1">
        <Text>Search & Select</Text>
      </Flex>
      <AsyncRowSelect
        allowMultiple
        name="licenseManager"
        fetchOptions={getManagersOptionsAction}
        onRowClick={onRowClick}
        placeholder="Select"
        className="w-[280px]"
      />
    </>
  )
}

export { LicenseManagerSelect }
