import { Flex } from '@radix-ui/themes'
import { FormFieldError, PropsWithRow, TextCell, TextInput } from '@/components'
import { useStore } from '../store'
import { License } from '../types'

const LicenseCell = ({ row }: PropsWithRow<License>) => {
  const editingRow = useStore((store) => store.editingRow)
  const isInEdit =
    row.original.stateCode === editingRow?.stateCode &&
    row.original.licenseType === editingRow?.licenseType
  return isInEdit ? (
    <Flex direction="column" className="flex-1">
      <TextInput
        field={'licenseNumber'}
        placeHolder="Enter Text"
        className={
          'border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]'
        }
      />
      <FormFieldError name="licenseNumber" />
    </Flex>
  ) : (
    <TextCell className="pl-1">{row.original.licenseNumber}</TextCell>
  )
}

export { LicenseCell }
