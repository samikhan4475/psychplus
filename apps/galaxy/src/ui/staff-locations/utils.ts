import { SelectOptionType, Service } from '@/types'

const getServicesLabel = (
  services: (Service | string)[] = [],
  serviceOffereds: SelectOptionType[] = [],
): string => {
  if (services.length > 0 && typeof services[0] === 'string') {
    return (services as string[]).join(' | ')
  }

  return (
    (services as Service[])
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
