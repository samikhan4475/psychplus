import { SelectOptionType, StaffResource } from '@/types'

const transformInStaffOptions = (data: StaffResource[]): SelectOptionType[] => {
  return data.map((item) => {
    const label = `${item.legalName.firstName} ${item.legalName.lastName}`

    const value = String(item?.id)

    return {
      label,
      value,
    }
  })
}

export { transformInStaffOptions }
