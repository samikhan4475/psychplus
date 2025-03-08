import { SelectOptionType, Service } from '@/types'

const getServicesLabel = (
  services: Service[] = [],
  serviceOffereds: SelectOptionType[] = [],
): string => {
  return (
    services
      .reduce((acc: string[], service) => {
        const label = serviceOffereds.find(
          (item) => item?.value === service?.serviceOffered,
        )?.label
        return label ? [...acc, label] : acc
      }, [])
      .join(' | ') ?? 'N/A'
  )
}

export { getServicesLabel }
