import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  SelectInput,
} from '@/components'
import { getStaffLicense } from '../../api'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'

const OnSiteREMCertifiedTechnician = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()
  const [selectOptions, setSelectOptions] = useState<
    { label: string; value: string }[]
  >([])

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
      <SelectInput
        field="certifiedTechnician"
        options={selectOptions}
        onValueChange={(value) => {
          form.setValue('certifiedTechnician', value)
          form.setValue(
            'certifiedTechnicianName',
            selectOptions.find((item) => item.value === value)?.label,
          )
        }}
      />
      <FormFieldError name="certifiedTechnician" />
    </FormFieldContainer>
  )
}

export { OnSiteREMCertifiedTechnician }
