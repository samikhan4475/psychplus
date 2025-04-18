import { useEffect, useState } from 'react'
import { FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { FilterFieldContainer } from '../../shared'
import { getStaffList } from '../actions'

const CosignerSelect = () => {
  const [options, setOptions] = useState<SelectOptionType[]>([])

  useEffect(() => {
    const fetchStaffList = async () => {
      const response = await getStaffList()
      if (response.state === 'error') return
      setOptions(
        response.data.map((staff) => ({
          value: String(staff.id),
          label: `${staff.legalName.firstName} ${
            staff.legalName.lastName ?? ''
          }, ${staff.legalName.honors ?? ''}`,
        })),
      )
    }
    fetchStaffList()
  }, [])
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Cosigner</FormFieldLabel>
      <SelectInput
        className="flex-1"
        buttonClassName="w-full h-6"
        field="cosignerStaffId"
        options={options}
      />
    </FilterFieldContainer>
  )
}

export { CosignerSelect }
