import { useMemo } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, MultiSelectChipDropdown } from '@/components'
import { getUserFullName } from '@/utils'
import { ProviderSchemaType } from '../schema'
import { useStore } from '../store'

const SelectedPatientsDropdown = () => {
  const { primaryPatients, secondaryPatients } = useStore((state) => ({
    primaryPatients: state.primaryPatients,
    secondaryPatients: state.secondaryPatients,
  }))

  const form = useFormContext<ProviderSchemaType>()
  const isPrimary = form.watch('isPrimary')
  const data = isPrimary ? primaryPatients : secondaryPatients

  const options = useMemo(
    () =>
      data.map((item) => ({
        display: getUserFullName(item.patientName, true),
        value: `${item.patientId}`,
      })),
    [data],
  )

  return (
    <Flex direction="column" gap="1">
      <Text size="1" className="font-[600]">
        Selected Patients
      </Text>
      <MultiSelectChipDropdown
        name="selectedRows"
        options={options}
        className="[&__.rt-TextFieldRoot]:h-8"
      />
      <FormFieldError name="selectedRows" />
    </Flex>
  )
}

export { SelectedPatientsDropdown }
