import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ActionResult } from '@/api'
import { AsyncSelect, BlockLabel, FormFieldError } from '@/components'
import { getAppointmentDetails } from '../api'
import { LabOrderSchemaType } from '../lab-order-schema'

interface Options {
  label: string
  value: string
}

const ProviderDropdown = () => {
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')
  const form = useFormContext<LabOrderSchemaType>()
  const providerDetail = form.watch('providerDetail')

  const fetchOptions: () => Promise<ActionResult<Options[]>> =
    useCallback(async () => {
      if (appointmentId && !providerDetail) {
        const response = await getAppointmentDetails(appointmentId)
        if (response.state === 'success') {
          form.setValue('providerDetail', response?.data?.appointmentDetails)

          return Promise.resolve({
            state: 'success',
            data: response?.data.dropDownValues ?? [],
          })
        }
      }
      return Promise.resolve({ state: 'success', data: [] })
    }, [])

  useEffect(() => {
    if (providerDetail) {
      form.setValue('providerName', `${providerDetail?.id ?? ''}`)
    }
  }, [providerDetail])

  return (
    <Flex direction="column" gap="1">
      <BlockLabel>Provider</BlockLabel>
      <AsyncSelect
        field="providerName"
        fetchOptions={fetchOptions}
        buttonClassName="flex-1 h-7 w-[208px]"
        disabled
      />
      <FormFieldError name="providerName" />
    </Flex>
  )
}

export { ProviderDropdown }
