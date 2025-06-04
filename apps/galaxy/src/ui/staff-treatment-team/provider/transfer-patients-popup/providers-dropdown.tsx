import { useCallback } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { ActionResult } from '@/api'
import { AsyncSelect, FormFieldError } from '@/components'
import { SelectOptionType } from '@/types'
import { getStaffListAction } from '../client-actions/get-staff-list'

const ProvidersDropdown = ({
  providerType,
  staffId,
}: {
  providerType: string
  staffId: string
}) => {
  const fetchOptions: () => Promise<ActionResult<SelectOptionType[]>> =
    useCallback(async () => getStaffListAction(providerType, staffId), [])

  return (
    <Flex direction="column" gap="1">
      <Text size="1" className="font-[600]">
        Select Provider to Transfer
      </Text>
      <AsyncSelect
        field="providerId"
        fetchOptions={fetchOptions}
        buttonClassName="w-full h-7"
      />
      <FormFieldError name="providerId" />
    </Flex>
  )
}
export { ProvidersDropdown }
