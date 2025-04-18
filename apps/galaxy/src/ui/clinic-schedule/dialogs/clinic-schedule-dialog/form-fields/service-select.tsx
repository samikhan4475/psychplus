import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SelectOptionType } from '@/types'
import { getLocationServicesAction } from '@/ui/clinic-schedule/clinic-time-tab/actions'
import { useStore } from '@/ui/clinic-schedule/clinic-time-tab/store'
import { SchemaType } from '../schema'

interface ServiceType extends SelectOptionType {
  serviceOffered: string
  maxBookingsPerSlot: number
}
const timeDependentAttributeName = 'IsTimeDependent'
const providerHonoursAttributeName = 'ValidProviderHonors'

const ServiceSelect = () => {
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<ServiceType[]>([])
  const { watch, setValue } = useFormContext<SchemaType>()
  const staff = useStore((store) => store.staff)

  const serviceOffered = watch('serviceOffered')
  const serviceId = watch('serviceId')
  const maxBookingsPerSlot = watch('maxBookingsPerSlot')
  const teleStates = watch('teleStates')
  const location = watch('primaryLocation')
  const visitTypes = watch('visitTypes')
  const cosignerStaffId = watch('primaryStateCosigner')
  const cosignerName = watch('primaryStateCosignerName')

  const specialistTypes = useCodesetCodes(CODESETS.SpecialistType)
  const specialistType = specialistTypes.find(
    (specialist) =>
      specialist.value === staff?.staffSpecialistIds?.[0].toString(),
  )

  const timeDependentServicesForProvider = useCodesetCodes(
    CODESETS.ServicesOffered,
  ).filter(
    (code) =>
      code.attributes?.find(
        (att) =>
          att.name === timeDependentAttributeName && att.value === 'True',
      ) &&
      code.attributes.find(
        (att) =>
          att.name === providerHonoursAttributeName &&
          att.value.split(',').includes(staff?.legalName.honors ?? ''),
      ),
  )

  const handleAddService = (value: string) => {
    const serviceSelected = services.find((service) => service.value === value)
    if (!serviceSelected) return
    setValue('serviceId', serviceSelected.value)
    setValue('serviceOffered', serviceSelected.serviceOffered)
    setValue('maxBookingsPerSlot', serviceSelected.maxBookingsPerSlot)
    teleStates.length && setValue('teleStates', [])
    visitTypes.length && setValue('visitTypes', [])
    cosignerStaffId && setValue('primaryStateCosigner', '')
    cosignerName && setValue('primaryStateCosignerName', '')
  }

  useEffect(() => {
    if (!location) {
      if (serviceId) setValue('serviceId', '')
      if (serviceOffered) setValue('serviceOffered', '')
      if (maxBookingsPerSlot) setValue('maxBookingsPerSlot', 0)
      return
    }
    const fetchServices = async () => {
      setLoading(true)
      const response = await getLocationServicesAction([location])
      if (response.state === 'error') {
        toast.error(response.error)
        return
      }

      const filteredServices = response.data
        .filter((service) =>
          timeDependentServicesForProvider.find(
            (el) => el.value === service.serviceOffered,
          ),
        )
        .map((service) => ({
          value: service.id,
          label:
            timeDependentServicesForProvider.find(
              (code) => code.value === service.serviceOffered,
            )?.display ?? service.serviceOffered,
          serviceOffered: service.serviceOffered,
          maxBookingsPerSlot: service.maxBookingFrequencyInSlot,
        }))
      const serviceFound = filteredServices.find(
        (service) => service.value === serviceId,
      )
      if (
        serviceFound &&
        maxBookingsPerSlot !== serviceFound.maxBookingsPerSlot
      ) {
        setValue('maxBookingsPerSlot', serviceFound.maxBookingsPerSlot)
      }
      setServices(filteredServices)
      setLoading(false)
    }
    fetchServices()
  }, [location, staff, specialistType])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Service
      </FormFieldLabel>
      <SelectInput
        buttonClassName="w-full h-6"
        field="service"
        value={serviceId}
        loading={loading}
        options={services}
        onValueChange={handleAddService}
      />
      <FormFieldError name="service" />
    </FormFieldContainer>
  )
}

export { ServiceSelect }
