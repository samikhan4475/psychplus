import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, PropsWithRow, TextCell } from '@/components'
import { SchemaType } from '../schema'
import { useStore } from '../store'
import { License } from '../types'
import { InputCell } from './input-cell'

const LicenseCell = ({ row }: PropsWithRow<License>) => {
  const { editingRow } = useStore()
  const { watch } = useFormContext<SchemaType>()
  const license = watch(`licenseNumber`)

  const isInEdit =
    row.original.stateCode === editingRow?.stateCode &&
    row.original.licenseType === editingRow?.licenseType
  return isInEdit ? (
    <Flex direction="column" className="flex-1">
      <InputCell
        field="licenseNumber"
        defaultValue={license}
        className="w-full flex-1"
      />
      <FormFieldError name="licenseNumber" />
    </Flex>
  ) : (
    <TextCell className="pl-1">{row.original.licenseNumber}</TextCell>
  )
}

export { LicenseCell }
