import { SelectOptionType, StaffResource } from '@/types'
import { getPatientFullName } from '@/utils'

const transformInStaffOptions = (data: StaffResource[]): SelectOptionType[] => {
  return data.map((item) => {
    const label = getPatientFullName(item?.legalName)

    const value = String(item?.id)

    return {
      label,
      value,
    }
  })
}

export { transformInStaffOptions }
