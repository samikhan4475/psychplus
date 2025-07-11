import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { StaffResource } from '@/types'
import { Services } from '@/ui/location/service/types'
import { getStaffByVisitTypeAction } from '../../actions/get-staff-by-visitType-action'
import { useStore } from '../../store'

const VisitTypeSelectField = () => {
  const form = useFormContext()

  const { setProviders, setProviderLoading } = useStore()
  const visitTypes = useCodesetOptions(CODESETS.ServicesOffered).filter(
    (item) =>
      [Services.Psychiatry, Services.Therapy].includes(item.value as Services),
  )

  const getStaffOptions = async (visitType: string) => {
    setProviderLoading(true)

    const res = await getStaffByVisitTypeAction({
      roleCodes: [visitType === Services.Psychiatry ? '1' : '2'],
      isIncludeTestProviders: false,
    })

    if (res.state === 'error') {
      toast.error(res.error)
      setProviderLoading(false)
      return
    }

    const staffOptions = res.data.map((item: StaffResource) => ({
      label: `${item.legalName?.firstName} ${item.legalName?.lastName}`,
      value: String(item.id),
    }))

    setProviders(staffOptions)
    setProviderLoading(false)
  }

  useEffect(() => {
    const visitType = form.watch('serviceOffered')
    if (visitType) {
      getStaffOptions(visitType)
    }
  }, [form.watch('serviceOffered')])

  return (
    <FormFieldContainer className="w-full flex-col">
      <FormFieldLabel required>Visit Type</FormFieldLabel>
      <SelectInput
        field="serviceOffered"
        buttonClassName={buttonClassName}
        options={visitTypes}
      />
      <FormFieldError name="serviceOffered" />
    </FormFieldContainer>
  )
}

const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-full'

export default VisitTypeSelectField
