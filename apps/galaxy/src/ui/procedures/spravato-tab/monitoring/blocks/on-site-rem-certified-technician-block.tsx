import { useEffect, useState } from 'react'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  SelectInput,
} from '@/components'
import { getStaffLicense } from '../../api'

const OnSiteREMCertifiedTechnician = () => {
  const [selectOptions, setSelectOptions] = useState([])

  useEffect(() => {
    getStaffLicense().then((response: any) => {
      if (response.data && response.data.length > 0) {
        const licenseData = response.data.map((data: any) => ({
          label: `${data.legalName?.firstName ?? ''} ${
            data.legalName?.lastName ?? ''
          }`,
          value: `${data.staffId}`,
        }))
        setSelectOptions(licenseData)
      }
    })
  }, [])

  return (
    <FormFieldContainer className="flex-row gap-1 align-middle">
      <BlockLabel required>On Site REM Certified Technician</BlockLabel>
      <SelectInput field="certifiedTechnician" options={selectOptions} />
      <FormFieldError name="certifiedTechnician" />
    </FormFieldContainer>
  )
}

export { OnSiteREMCertifiedTechnician }
